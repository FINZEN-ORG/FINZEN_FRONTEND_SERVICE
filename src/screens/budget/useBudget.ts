import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import BudgetService, { BudgetDto } from '../../services/BudgetService';
import CategoryService, { CategoryDto } from '../../services/CategoryService';
import TransactionService from '../../services/TransactionService';

export default function useBudget() {
    const [budgets, setBudgets] = useState<BudgetDto[]>([]);
    const [categories, setCategories] = useState<CategoryDto[]>([]);
    const [recentExpenses, setRecentExpenses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        try {
            setLoading(true);

            // Cargar Categorías, Presupuestos y Gastos en paralelo
            const [catsData, budgetsData, transactionsData] = await Promise.all([
                CategoryService.getAllCategories(),
                BudgetService.getAllBudgets(), // Esto ya trae 'spent' calculado del backend
                TransactionService.getAllTransactions()
            ]);

            setCategories(catsData);
            setBudgets(budgetsData);

            // Filtramos solo gastos recientes para mostrar en la lista inferior
            const expenses = transactionsData
                .filter(t => t.type === 'EXPENSE')
                .slice(0, 5); // Solo los últimos 5
            setRecentExpenses(expenses);

        } catch (error) {
            console.error("Error loading budget screen:", error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [])
    );

    // Mapeamos los budgets para que la UI los pueda pintar fácil
    const mapBudgetsToDisplay = () => {
        return budgets.map(b => {
            const category = categories.find(c => c.id === b.categoryId);
            const catName = category?.name || 'Desconocido';
            const catIcon = category?.icon || '📦'; // Usamos el icono real

            return {
                id: b.id,
                title: catName,
                icon: catIcon,
                limit: b.amount,
                spent: b.spent || 0,
                percentage: b.amount > 0 ? ((b.spent || 0) / b.amount) : 0,
                color: '#6C5CE7'
            };
        });
    };

    const mapExpensesToDisplay = () => {
        return recentExpenses.map(expense => {
            const category = categories.find(c => c.id === expense.categoryId);
            return {
                id: expense.id,
                categoryIcon: category?.icon || '💸', // Usamos el icono real
                description: expense.description,
                amount: expense.amount,
                date: new Date(expense.date).toISOString().split('T')[0],
                category: category?.name || 'Gasto'
            };
        });
    };

    return {
        loading,
        budgets: mapBudgetsToDisplay(),
        expenses: mapExpensesToDisplay(),
        reload: loadData,
    };
}