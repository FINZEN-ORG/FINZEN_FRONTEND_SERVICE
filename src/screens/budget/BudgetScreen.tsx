import React, { useState, useCallback } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppStackParamList } from '../../types/navigation';
import {
    ScreenTitle,
    AIMessage,
    MessageType,
    SectionSubtitle,
    CategoriesSection,
    ExpensesList,
    FloatingActionButton
} from '../../components';
import { globalStyles } from '../../styles';
import CategoryService, { CategoryDto } from '../../services/CategoryService';
import TransactionService, { TransactionResponse } from '../../services/TransactionService';

const BudgetScreen: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<AppStackParamList>>();
    const [showFloatingMenu, setShowFloatingMenu] = useState(false);
    const [categories, setCategories] = useState<CategoryDto[]>([]);
    const [expenses, setExpenses] = useState<TransactionResponse[]>([]);
    const [loading, setLoading] = useState(true);

    // Recargar datos cada vez que la pantalla recibe foco
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
                    type="info" as MessageType
                    mensaje={`Has registrado ${expenses.length} gastos este mes`}
                />
            )}

            <SectionSubtitle
                text="Categorías de Gastos"
                marginTop={true}
            />
            <CategoriesSection
                categories={categories}
                onCategoryPress={handleCategoryPress}
            />

            <SectionSubtitle
                text="Gastos Recientes"
                marginTop={true}
            />
            <ExpensesList
                expenses={expenses}
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