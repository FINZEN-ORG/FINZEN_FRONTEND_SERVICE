import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CategoriesSection, HeaderWithBack, FormRenderer, ButtonRenderer } from '../../components';
import { globalStyles } from '../../styles';
import { form } from '../../styles/form';
import CategoryService, { CategoryDto } from '../../services/CategoryService';
import { userFields, userButtons } from './AddIncomeFormConfig';
import useIncomeForm from './useIncomeForm';

const AddIncomeScreen: React.FC = () => {
  const navigation = useNavigation();

  const {
    values,
    setField,
    selectedCategory,
    handleCategorySelect,
    handleConfirm,
    handleCancel,
  } = useIncomeForm();

  const [categories, setCategories] = useState<Array<{ id: number; logo: string; title: string }>>([]);

  const CATEGORY_EMOJIS: { [key: string]: string } = {
    'Salary': '💼', 'Salario': '💼', 'Other': '📦', 'Otro': '📦',
    'Food': '🍔', 'Comida': '🍔', 'Transport': '⛽', 'Transporte': '⛽',
    'Entertainment': '🎬', 'Entretenimiento': '🎬', 'Health': '🏥', 'Salud': '🏥',
  };

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const cats: CategoryDto[] = await CategoryService.getAllCategories();
        if (!mounted) return;
        const mapped = cats.map(c => ({ id: c.id, logo: CATEGORY_EMOJIS[c.name] || '📦', title: c.name }));
        setCategories(mapped);
      } catch (err) {
        console.warn('No se pudieron cargar las categorías de ingreso:', err);
      }
    };
    load();
    return () => { mounted = false; };
  });
  
  return (
      <View style={globalStyles.screenContainer}>
        <HeaderWithBack title="Añadir Ingreso" onBackPress={() => navigation.goBack()} />
        <View style={form.container}>
          <FormRenderer fields={userFields} values={values} onChange={setField} skip={["categoryId", "categories"]} />
          <View style={form.section}>
            <Text style={form.label}>Categorías:</Text>
            <CategoriesSection
              categories={categories}
              onCategoryPress={handleCategorySelect}
              selectedCategory={selectedCategory}
              selectionMode={true}
              containerStyle={form.categoriesSection}
            />
          </View>
        </View>
        <ButtonRenderer
          buttons={userButtons}
          handlers={{ confirm: handleConfirm, cancel: handleCancel }}
        />
      </View>
  );
};

export default AddIncomeScreen;