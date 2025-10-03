import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { expenseCardStyles } from './ExpenseCard.styles';

interface ExpenseCardProps {
  categoryIcon: string; // Emoji o icono de la categoría
  description: string;
  amount: number;
  date: string;
  onPress?: () => void;
}

const ExpenseCard: React.FC<ExpenseCardProps> = ({ 
  categoryIcon, 
  description, 
  amount, 
  date, 
  onPress 
}) => {
  const formatAmount = (value: number) => {
    return `-$${value.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    const dateObj = new Date(dateString);
    return dateObj.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <TouchableOpacity 
      style={expenseCardStyles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={expenseCardStyles.iconContainer}>
        <Text style={expenseCardStyles.iconText}>{categoryIcon}</Text>
      </View>
      <View style={expenseCardStyles.contentContainer}>
        <Text style={expenseCardStyles.description}>{description}</Text>
        <Text style={expenseCardStyles.date}>{formatDate(date)}</Text>
      </View>
      <View style={expenseCardStyles.amountContainer}>
        <Text style={expenseCardStyles.amount}>{formatAmount(amount)}</Text>
      </View>
    </TouchableOpacity>
  );
};

export { ExpenseCard };
export type { ExpenseCardProps };
export default ExpenseCard;