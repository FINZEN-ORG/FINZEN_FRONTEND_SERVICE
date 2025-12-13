import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import TransactionService from '../../services/TransactionService';
import CategoryService from '../../services/CategoryService';

interface CategoryExpense {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

export default function useReports() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [categoryExpenses, setCategoryExpenses] = useState<CategoryExpense[]>([]);

  const GRAPH_PALETTE = [
    '#FF6B6B', // Rojo suave
    '#4ECDC4', // Turquesa
    '#FFD93D', // Amarillo
    '#6C5CE7', // Morado
    '#A8E6CF', // Verde menta
    '#FF8A65', // Naranja
    '#A29BFE', // Lavanda
    '#FD79A8', // Rosa
    '#00CEC9', // Azul verdoso
    '#FAB1A0', // Durazno
    '#74B9FF', // Azul cielo
    '#DFE6E9'  // Gris claro
  ];

  const loadReports = async () => {
    try {
      setLoading(true);

      // 1. Cargar datos en paralelo
      const [reportsData, transactionsData, categoriesData] = await Promise.all([
        TransactionService.getReports(),
        TransactionService.getAllTransactions(),
        CategoryService.getAllCategories()
      ]);

      setTotalIncome(reportsData.totalIncome);
      setTotalExpense(reportsData.totalExpense);

      // 2. Mapa de Categorías (ID -> Nombre)
      const categoryMap = new Map<number, string>();
      categoriesData.forEach(cat => {
        categoryMap.set(cat.id, cat.name);
      });

      // 3. Agrupar gastos
      const expensesByCategory: { [key: string]: number } = {};

      transactionsData
          .filter(t => t.type === 'EXPENSE')
          .forEach(t => {
            // Si no encuentra el nombre, usa 'Otros'
            const catName = categoryMap.get(t.categoryId) || 'Otros';
            expensesByCategory[catName] = (expensesByCategory[catName] || 0) + t.amount;
          });

      // 4. Convertir a lista y asignar colores dinámicamente
      const categoriesList: CategoryExpense[] = Object.entries(expensesByCategory)
          .map(([category, amount]) => ({
            category,
            amount,
            percentage: 0, // Lo calculamos abajo después de ordenar o sumar
            color: ''      // Lo asignamos abajo
          }))
          .sort((a, b) => b.amount - a.amount); // Ordenar: Mayor gasto primero

      // Recalcular porcentajes reales y ASIGNAR COLOR POR ÍNDICE
      const finalCategories = categoriesList.map((item, index) => ({
        ...item,
        // Si totalExpense es 0, evita división por cero
        percentage: reportsData.totalExpense > 0
            ? (item.amount / reportsData.totalExpense) * 100
            : 0,
        // Aquí está la magia: Usa el operador módulo (%) para rotar los colores
        // Si hay 15 categorías y 12 colores, la categoría 13 usa el color 1 de nuevo.
        color: GRAPH_PALETTE[index % GRAPH_PALETTE.length]
      }));

      setCategoryExpenses(finalCategories);

    } catch (error) {
      console.error('Error loading reports:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
      useCallback(() => {
        loadReports();
      }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    loadReports();
  };

  const balance = totalIncome - totalExpense;
  // Manejo seguro de string para savingsRate
  const savingsRate = totalIncome > 0
      ? ((balance / totalIncome) * 100).toFixed(1)
      : '0.0';

  return {
    loading,
    refreshing,
    totalIncome,
    totalExpense,
    categoryExpenses,
    onRefresh,
    balance,
    savingsRate,
  };
}