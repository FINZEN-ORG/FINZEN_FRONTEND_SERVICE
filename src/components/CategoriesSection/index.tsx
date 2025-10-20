import React from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import { CategoryCard } from '../CategoryCard/CategoryCard';
import { budgetStyles } from '../../screens/budget/BudgetScreen.Style';
import { categories } from '../../data/categories';

const { width } = Dimensions.get('window');

interface CategoriesSectionProps {
  onCategoryPress: (categoryId: number, title: string) => void;
  selectedCategory?: number | null; // Para modo selección
  selectionMode?: boolean; // Opcional: para diferentes estilos según el contexto
  containerStyle?: any; // Para permitir estilos personalizados
  categories?: typeof categories; // Nueva propiedad para pasar categorías dinámicas
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({ 
  onCategoryPress, 
  selectedCategory = null,
  selectionMode = false,
  containerStyle,
  categories: dynamicCategories // Usar categorías dinámicas si se proporcionan
}) => {
  const groupCategoriesInBlocks = (data: typeof categories) => {
    const blocks = [];
    for (let i = 0; i < data.length; i += 4) {
      blocks.push(data.slice(i, i + 4));
    }
    return blocks;
  };

  const categoryData = dynamicCategories || categories; // Usar categorías dinámicas o predeterminadas
  const categoryBlocks = groupCategoriesInBlocks(categoryData);

  const renderCategoryBlock = ({ item: block }: { item: typeof categories }) => (
    <View style={budgetStyles.blockContainer}>
      {block.map((category) => (
        <View key={category.id} style={budgetStyles.categoryWrapper}>
          <CategoryCard
            logo={category.logo}
            title={category.title}
            onPress={() => onCategoryPress(category.id, category.title)}
            isSelected={selectionMode && selectedCategory === category.id}
          />
        </View>
      ))}
    </View>
  );

  // Usar estilos personalizados si se proporcionan, sino usar los por defecto
  const sectionStyle = containerStyle || budgetStyles.categoriesSection;
  const snapInterval = selectionMode ? width - 40 : budgetStyles.blockContainer.width + 20;

  return (
    <View style={sectionStyle}>
      <FlatList
        data={categoryBlocks}
        renderItem={renderCategoryBlock}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        snapToInterval={snapInterval}
        decelerationRate="fast"
        contentContainerStyle={budgetStyles.flatListContainer}
      />
    </View>
  );
};

export default CategoriesSection;