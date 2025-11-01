import React from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import { CategoryCard } from '../CategoryCard/CategoryCard';
import { budgetStyles } from '../../screens/budget/BudgetScreen.Style';
import { categories } from '../../data/categories';

const { width } = Dimensions.get('window');

interface CategoriesSectionProps {
  onCategoryPress: (categoryId: number, title: string) => void;
  selectedCategory?: number | null; 
  selectionMode?: boolean; 
  containerStyle?: any; 
  categories?: typeof categories; 
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({ 
  onCategoryPress, 
  selectedCategory = null,
  selectionMode = false,
  containerStyle,
  categories: dynamicCategories 
}) => {
  const groupCategoriesInBlocks = (data: typeof categories) => {
    const blocks = [];
    for (let i = 0; i < data.length; i += 4) {
      blocks.push(data.slice(i, i + 4));
    }
    return blocks;
  };

  const categoryData = dynamicCategories || categories; 
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