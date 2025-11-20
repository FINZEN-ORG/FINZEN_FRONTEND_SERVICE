import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
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
import useBudget from './useBudget';

// emoji map moved into useBudget

const BudgetScreen: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<AppStackParamList>>();
    const [showFloatingMenu, setShowFloatingMenu] = useState(false);

    // Data + logic extracted to useBudget
    const { loading, mapCategoriesToDisplay, mapExpensesToDisplay, expenses } = useBudget();

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