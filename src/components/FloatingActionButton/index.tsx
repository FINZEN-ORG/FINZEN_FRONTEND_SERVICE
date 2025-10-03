import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { budgetStyles } from '../../screens/budget/BudgetScreen.Style';
import FloatingMenu from '../FloatingMenu';

interface FloatingActionButtonProps {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
  onCreateCategory: () => void;
  onAddExpense: () => void;
  onAddIncome: () => void;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  isMenuOpen,
  onToggleMenu,
  onCreateCategory,
  onAddExpense,
  onAddIncome,
}) => {
  return (
    <>
      <TouchableOpacity 
        style={budgetStyles.floatingButton}
        onPress={onToggleMenu}
      >
        <Text style={budgetStyles.floatingButtonIcon}>
          {isMenuOpen ? '×' : '+'}
        </Text>
      </TouchableOpacity>

      <FloatingMenu
        isVisible={isMenuOpen}
        onCreateCategory={onCreateCategory}
        onAddExpense={onAddExpense}
        onAddIncome={onAddIncome}
      />
    </>
  );
};

export default FloatingActionButton;