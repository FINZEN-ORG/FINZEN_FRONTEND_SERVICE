import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import ExpenseCard from '../ExpenseCard/ExpenseCard';
import { budgetStyles } from '../../screens/budget/BudgetScreen.Style';

// Definimos la interfaz aquí mismo o la importamos de tipos compartidos
export interface ExpenseItem {
  id: number;
  categoryIcon: string;
  description: string;
  amount: number;
  date: string;
  category: string;
}

interface ExpensesListProps {
  expenses: ExpenseItem[];
  onExpensePress: (expenseId: number, description: string) => void;
}

export const ExpensesList: React.FC<ExpensesListProps> = ({ expenses, onExpensePress }) => {

  if (!expenses || expenses.length === 0) {
    return (
        <View style={{ padding: 20, alignItems: 'center' }}>
          <Text style={{ color: '#999' }}>No hay movimientos recientes.</Text>
        </View>
    );
  }

  return (
      <ScrollView style={budgetStyles.recentExpensesContainer}>
        {expenses.map((expense) => (
            <ExpenseCard
                key={expense.id}
                categoryIcon={expense.categoryIcon}
                description={expense.description}
                amount={expense.amount}
                date={expense.date}
                onPress={() => onExpensePress(expense.id, expense.description)}
            />
        ))}
      </ScrollView>
  );
};

export default ExpensesList;