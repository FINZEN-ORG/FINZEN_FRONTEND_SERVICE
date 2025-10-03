import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './CategoryCard.styles';

export interface CategoryCardProps {
  logo: string; // Emoji o texto del logo
  title: string;
  onPress?: () => void;
  isSelected?: boolean; // Para mostrar estado seleccionado
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  logo,
  title,
  onPress,
  isSelected = false,
}) => {
  return (
    <TouchableOpacity 
      style={[
        styles.container,
        isSelected && styles.containerSelected
      ]} 
      onPress={onPress}
    >
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>{logo}</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={[
          styles.title,
          isSelected && styles.titleSelected
        ]} numberOfLines={2}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryCard;