import React, { useState, useCallback } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppStackParamList } from '../../types/navigation';
import {
    ScreenTitle,
    SectionSubtitle,
    CategoriesSection,
    ExpensesList,
    FloatingActionButton
} from '../../components';
import AIMessage, { MessageType } from '../../components/AIMessage';
import { globalStyles } from '../../styles';
import CategoryService, { CategoryDto } from '../../services/CategoryService';
import TransactionService, { TransactionResponse } from '../../services/TransactionService';

// ✅ Mapeo de categorías a emojis
const CATEGORY_EMOJIS: { [key: string]: string } = {
    'Food': '🍔',
    'Transport': '⛽',
    'Entertainment': '🎬',
    'Health': '🏥',
    'Housing': '🏠',
    'Salary': '💼',
    'Other': '📦',
    // Nombres en español (por si cambian)
    'Comida': '🍔',
    'Transporte': '⛽',
    'Entretenimiento': '🎬',
    'Salud': '🏥',
    'Vivienda': '🏠',
    'Salario': '💼',
    'Otro': '📦',
    'Educación': '📚',
    'Servicios y Facturas': '💡',
    'Ropa y Accesorios': '👕',
    'Compras': '🛒',
    'Inversiones': '📈',
    'Regalos': '🎁',
    'Reembolsos': '💰',
    'Ventas': '🛍️',
    'Alquiler': '🏠',
    'Freelance': '🧾',
    'Otros': '📜',
};

const BudgetScreen: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<AppStackParamList>>();
    const [showFloatingMenu, setShowFloatingMenu] = useState(false);
    const [categories, setCategories] = useState<CategoryDto[]>([]);
    const [expenses, setExpenses] = useState<TransactionResponse[]>([]);
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [])
    );

    const loadData = async () => {
        try {
            setLoading(true);
            const [categoriesData, transactionsData] = await Promise.all([
                CategoryService.getAllCategories(),
                TransactionService.getAllTransactions()
            ]);

            setCategories(categoriesData);

            // Filtrar solo gastos
            const expensesData = transactionsData.filter(t => t.type === 'EXPENSE');
            setExpenses(expensesData);

            console.log('✅ Budget screen data loaded');
        } catch (error) {
            console.error('❌ Error loading budget data:', error);
        } finally {
            setLoading(false);
        }
    };

    // ✅ Función para convertir CategoryDto al formato esperado por CategoriesSection
    const mapCategoriesToDisplay = () => {
        return categories.map(cat => ({
            id: cat.id,
            logo: CATEGORY_EMOJIS[cat.name] || '📦', // Emoji por defecto si no existe
            title: cat.name
        }));
    };

    // ✅ Función para convertir TransactionResponse al formato esperado por ExpensesList
    const mapExpensesToDisplay = () => {
        return expenses.map(expense => {
            // Buscar la categoría correspondiente
            const category = categories.find(c => c.id === expense.categoryId);
            const categoryName = category?.name || 'Other';

            return {
                id: expense.id,
                categoryIcon: CATEGORY_EMOJIS[categoryName] || '📦',
                description: expense.description,
                amount: expense.amount,
                date: new Date(expense.date).toISOString().split('T')[0], // Formato YYYY-MM-DD
                category: categoryName.toLowerCase()
            };
        });
    };

    const handleCategoryPress = (categoryId: number, title: string) => {
        console.log(`Presionaste: ${title} (ID: ${categoryId})`);
    };

    const handleExpensePress = (expenseId: number, description: string) => {
        console.log(`Presionaste gasto: ${description} (ID: ${expenseId})`);
    };

    const toggleFloatingMenu = () => {
        setShowFloatingMenu(!showFloatingMenu);
    };

    const handleAddExpense = () => {
        setShowFloatingMenu(false);
        navigation.navigate('AddExpense');
    };

    const handleAddIncome = () => {
        setShowFloatingMenu(false);
        navigation.navigate('AddIncome');
    };

    const handleCreateCategory = () => {
        setShowFloatingMenu(false);
        navigation.navigate('NewCategory');
    };

    if (loading) {
        return (
            <View style={[globalStyles.screenContainer, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color="#6C5CE7" />
            </View>
        );
    }

    return (
        <View style={globalStyles.screenContainer}>
            <ScreenTitle
                title="Presupuesto"
                subtitle="Un plan sencillo para lograr grandes metas"
            />

            {expenses.length > 0 && (
                <AIMessage
                    type={'info' as MessageType}
                    mensaje={`Has registrado ${expenses.length} gastos este mes`}
                />
            )}

            <SectionSubtitle
                text="Categorías de Gastos"
                marginTop={true}
            />
            <CategoriesSection
                categories={mapCategoriesToDisplay()} // ✅ Convertir al formato esperado
                onCategoryPress={handleCategoryPress}
            />

            <SectionSubtitle
                text="Gastos Recientes"
                marginTop={true}
            />
            <ExpensesList
                expenses={mapExpensesToDisplay()} // ✅ Convertir al formato esperado
                onExpensePress={handleExpensePress}
            />

            <FloatingActionButton
                isMenuOpen={showFloatingMenu}
                onToggleMenu={toggleFloatingMenu}
                onCreateCategory={handleCreateCategory}
                onAddExpense={handleAddExpense}
                onAddIncome={handleAddIncome}
            />
        </View>
    );
};

export default BudgetScreen;