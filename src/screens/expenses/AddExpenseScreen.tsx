import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CategoriesSection, HeaderWithBack, FormRenderer, ButtonRenderer } from '../../components';
import { userFields, userButtons } from './AddExpenseFormConfig';
import { form } from '../../styles/form';
import { globalStyles } from '../../styles';
import { useAddExpense } from './useExpenseForm';
import CategoryService, { CategoryDto } from '../../services/CategoryService';
import { KeyboardAvoidingView, ScrollView } from "react-native";

// Emoji map for display logos (fallback)
const CATEGORY_EMOJIS: { [key: string]: string } = {
  'Food': '🍔', 'Transport': '⛽', 'Entertainment': '🎬', 'Health': '🏥', 'Housing': '🏠',
  'Salary': '💼', 'Other': '📦', 'Comida': '🍔', 'Transporte': '⛽', 'Entretenimiento': '🎬',
  'Salud': '🏥', 'Vivienda': '🏠', 'Salario': '💼', 'Otro': '📦', 'Ropa y Accesorios': '👕',
  'Tecnología': '💻',
};

const AddExpenseScreen: React.FC = () => {
  const navigation = useNavigation();
  const {
    values,
    setField,
    selectedCategory,
    handleCategorySelect,
    handleConfirm,
    handleCancel,
  } = useAddExpense();

  const [categories, setCategories] = useState<Array<{ id: number; logo: string; title: string }>>([]);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const cats: CategoryDto[] = await CategoryService.getAllCategories();
        if (!mounted) return;
        const mapped = cats.map(c => ({ id: c.id, logo: CATEGORY_EMOJIS[c.name] || '📦', title: c.name }));
        setCategories(mapped);
      } catch (err) {
        console.warn('No se pudieron cargar las categorías:', err);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            flexGrow: 1,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={[globalStyles.screenContainer, { flex: 1 }]}>
            
            <HeaderWithBack
              title="Añadir Gasto"
              onBackPress={() => navigation.goBack()}
            />

            <View style={[form.container, { flex: 1 }]}>
              <FormRenderer
                fields={userFields}
                values={values}
                onChange={setField}
                skip={["categoryId", "categories"]}
              />

              <View style={form.section}>
                <Text style={form.label}>Categorías:</Text>
                <CategoriesSection
                  onCategoryPress={handleCategorySelect}
                  selectedCategory={selectedCategory}
                  selectionMode={true}
                  containerStyle={form.categoriesSection}
                  categories={categories}
                />
              </View>
            </View>

            <View style={{ marginBottom: 20 }}>
              <ButtonRenderer
                buttons={userButtons}
                handlers={{ confirm: handleConfirm, cancel: handleCancel }}
              />
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>


  );
};

export default AddExpenseScreen;