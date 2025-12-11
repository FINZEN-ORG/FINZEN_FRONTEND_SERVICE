import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import TransactionService from '../../services/TransactionService';

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

  // Colores variados para categorías (no solo verdes)
  const categoryColors: { [key: string]: string } = {
    'Comida': '#FF6B6B',
    'Comida y Restaurantes': '#FF6B6B',
    'Transporte': '#4ECDC4',
    'Entretenimiento': '#FFD93D',
    'Compras': '#A8E6CF',
    'Salud': '#95E1D3',
    'Salud y Medicina': '#95E1D3',
    'Educación': '#6C5CE7',
    'Vivienda': '#FFA07A',
    'Servicios': '#00c66d',
    'Servicios y Facturas': '#00c66d',
    'Ropa y Accesorios': '#F38181',
    'payaso': '#FF69B4',
    'Otros': '#95A4AB'
  };

  const loadReports = async () => {
    try {
      setLoading(true);
      const reports = await TransactionService.getReports();
      const transactions = await TransactionService.getAllTransactions();
      
      setTotalIncome(reports.totalIncome);
      setTotalExpense(reports.totalExpense);

      // Agrupar gastos por categoría
      const expensesByCategory: { [key: string]: number } = {};
      transactions
        .filter(t => t.type === 'EXPENSE')
        .forEach(t => {
          // Usar el nombre de la categoría del backend, sin modificarlo
          const categoryName = t.category?.name || 'Sin categoría';
          expensesByCategory[categoryName] = (expensesByCategory[categoryName] || 0) + t.amount;
        });

      console.log('📊 Categorías detectadas:', Object.keys(expensesByCategory));

      // Convertir a array y calcular porcentajes
      const categories: CategoryExpense[] = Object.entries(expensesByCategory)
        .map(([category, amount]) => ({
          category,
          amount,
          percentage: totalExpense > 0 ? (amount / reports.totalExpense) * 100 : 0,
          color: categoryColors[category] || '#95A4AB' // Color gris por defecto
        }))
        .sort((a, b) => b.amount - a.amount); // Mostrar todas las categorías ordenadas

      setCategoryExpenses(categories);
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
  const savingsRate = totalIncome > 0 ? ((balance / totalIncome) * 100).toFixed(1) : 0;

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
