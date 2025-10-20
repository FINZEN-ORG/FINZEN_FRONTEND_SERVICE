import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { budgetStyles } from '../../screens/budget/BudgetScreen.Style';

interface FloatingMenuProps {
  isVisible: boolean;
  onCreateCategory: () => void;
  onAddExpense: () => void;
  onAddIncome: () => void;
}

export const FloatingMenu: React.FC<FloatingMenuProps> = ({
  isVisible,
  onCreateCategory,
  onAddExpense,
  onAddIncome,
}) => {
  if (!isVisible) return null;

  return (
    <View style={budgetStyles.floatingMenu}>
      <TouchableOpacity 
        style={budgetStyles.floatingMenuItemWithBorder}
        onPress={onCreateCategory}
      >
        <Text style={budgetStyles.floatingMenuText}>Crear Categoría</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={budgetStyles.floatingMenuItemWithBorder}
        onPress={onAddExpense}
      >
        <Text style={budgetStyles.floatingMenuText}>Agregar Gasto</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={budgetStyles.floatingMenuItem}
        onPress={onAddIncome}
      >
        <Text style={budgetStyles.floatingMenuText}>Agregar Ingreso</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FloatingMenu;