import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
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

  // Estado local para mapear al formato visual
  const [categories, setCategories] = useState<Array<{ id: number; logo: string; title: string }>>([]);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        // Pedimos solo categorías de INGRESO
        const cats = await CategoryService.getCategoriesByType('INCOME');
        if (!mounted) return;

        // Mapeamos usando el icono que viene del backend (o un default si es null)
        const mapped = cats.map(c => ({
          id: c.id,
          logo: c.icon || '💰', // Usamos c.icon del backend
          title: c.name
        }));
        setCategories(mapped);
      } catch (err) {
        console.warn('Error cargando categorías:', err);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

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