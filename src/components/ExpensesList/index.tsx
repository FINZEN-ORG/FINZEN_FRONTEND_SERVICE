import React from 'react';
import { ScrollView } from 'react-native';
import ExpenseCard from '../ExpenseCard/ExpenseCard';
import { budgetStyles } from '../../screens/budget/BudgetScreen.Style';
import { ExpenseData } from '../../data/expensesData';

interface ExpensesListProps {
  expenses: ExpenseData[];
  onExpensePress: (expenseId: number, description: string) => void;
}

export const ExpensesList: React.FC<ExpensesListProps> = ({ expenses, onExpensePress }) => {
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