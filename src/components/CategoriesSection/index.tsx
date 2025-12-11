import React from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import { CategoryCard } from '../CategoryCard/CategoryCard';
import { budgetStyles } from '../../screens/budget/BudgetScreen.Style';

const { width } = Dimensions.get('window');

// Interfaz genérica para cualquier categoría que venga del backend o local
export interface DisplayCategory {
  id: number;
  logo: string; // Emoji
  title: string;
}

interface CategoriesSectionProps {
  categories: DisplayCategory[]; // Ahora es obligatorio pasar la data
  onCategoryPress: (categoryId: number, title: string) => void;
  selectedCategory?: number | null;
  selectionMode?: boolean;
  containerStyle?: any;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
                                                                      categories = [], // Default array vacío
                                                                      onCategoryPress,
                                                                      selectedCategory = null,
                                                                      selectionMode = false,
                                                                      containerStyle,
                                                                    }) => {
  // Agrupar en bloques de 4 para el diseño de "grid horizontal"
  const groupCategoriesInBlocks = (data: DisplayCategory[]) => {
    const blocks = [];
    for (let i = 0; i < data.length; i += 4) {
      blocks.push(data.slice(i, i + 4));
    }
    return blocks;
  };

  const categoryBlocks = groupCategoriesInBlocks(categories);

  const renderCategoryBlock = ({ item: block }: { item: DisplayCategory[] }) => (
      <View style={budgetStyles.blockContainer}>
        {block.map((category) => (
            <View key={category.id} style={budgetStyles.categoryWrapper}>
              <CategoryCard
                  logo={category.logo || '📦'} // Fallback emoji
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

  if (categories.length === 0) {
    return null; // O renderizar un skeleton loader / mensaje de vacío
  }

  return (
      <View style={sectionStyle}>
        <FlatList
            data={categoryBlocks}
            renderItem={renderCategoryBlock}
            keyExtractor={(_, index) => `block-${index}`}
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