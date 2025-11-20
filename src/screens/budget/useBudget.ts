import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import CategoryService, { CategoryDto } from '../../services/CategoryService';
import TransactionService, { TransactionResponse } from '../../services/TransactionService';

const CATEGORY_EMOJIS: { [key: string]: string } = {
    'Food': '🍔', 'Transport': '⛽', 'Entertainment': '🎬', 'Health': '🏥', 'Housing': '🏠',
    'Salary': '💼', 'Other': '📦', 'Comida': '🍔', 'Transporte': '⛽', 'Entretenimiento': '🎬',
    'Salud': '🏥', 'Vivienda': '🏠', 'Salario': '💼', 'Otro': '📦', 'Ropa y Accesorios': '👕',
    'Tecnología': '💻', 'Educación': '📚', 'Servicios y Facturas': '💡', 'Compras': '🛒',
    'Inversiones': '📈', 'Regalos': '🎁', 'Reembolsos': '💰', 'Ventas': '🛍️', 'Alquiler': '🏠',
    'Freelance': '🧾', 'Otros': '📜'
};

export default function useBudget() {
    const [categories, setCategories] = useState<CategoryDto[]>([]);
    const [expenses, setExpenses] = useState<TransactionResponse[]>([]);
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        try {
            setLoading(true);
            const [categoriesData, transactionsData] = await Promise.all([
                CategoryService.getAllCategories(),
                TransactionService.getAllTransactions()
            ]);

            setCategories(categoriesData);

            const expensesData = transactionsData.filter(t => t.type === 'EXPENSE');
            setExpenses(expensesData);
        } catch (error) {
            // keep silent; UI will handle empty state
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [])
    );

    const mapCategoriesToDisplay = () => {
        return categories.map(cat => ({
            id: cat.id,
            logo: CATEGORY_EMOJIS[cat.name] || '📦',
            title: cat.name
        }));
    };

    const mapExpensesToDisplay = () => {
        return expenses.map(expense => {
            const category = categories.find(c => c.id === expense.categoryId);
            const categoryName = category?.name || 'Other';

            return {
                id: expense.id,
                categoryIcon: CATEGORY_EMOJIS[categoryName] || '📦',
                description: expense.description,
                amount: expense.amount,
                date: new Date(expense.date).toISOString().split('T')[0],
                category: categoryName.toLowerCase()
            };
        });
    };

    return {
        loading,
        categories,
        expenses,
        mapCategoriesToDisplay,
        mapExpensesToDisplay,
        reload: loadData,
    };
}
