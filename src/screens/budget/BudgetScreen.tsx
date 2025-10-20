import React, { useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
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
import { getRecentExpenses } from '../../data/expensesData';

const aiMessage = {
  type: 'emergency' as MessageType,
  mensaje: 'Has superado tu presupuesto de ocio este mes'
};

const BudgetScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<AppStackParamList>>();
  const [showFloatingMenu, setShowFloatingMenu] = useState(false);

  // Datos
  const recentExpenses = getRecentExpenses();

  // Handlers
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

  return (
    <View style={globalStyles.screenContainer}>
      <ScreenTitle 
        title="Presupuesto" 
        subtitle="Un plan sencillo para lograr grandes metas" 
      />

      <AIMessage 
        type={aiMessage.type}
        mensaje={aiMessage.mensaje}
      />

      <SectionSubtitle 
        text="Categorías de Gastos"
        marginTop={true}
      />

      <CategoriesSection onCategoryPress={handleCategoryPress} />

      <SectionSubtitle 
        text="Gastos"
        marginTop={true}
      />

      <ExpensesList 
        expenses={recentExpenses}
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