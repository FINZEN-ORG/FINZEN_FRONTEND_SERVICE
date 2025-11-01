import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CategoriesSection, HeaderWithBack, FormRenderer, ButtonRenderer } from '../../components';
import { userFields, userButtons } from './AddExpenseFormConfig';
import { form } from '../../styles/form';
import { globalStyles } from '../../styles';
import { useAddExpense } from './useExpenseForm';

const AddExpenseScreen: React.FC = () => {
  const navigation = useNavigation();
  const {
    values,
    setField,
    selectedCategory,
    setSelectedCategory,
    handleCategorySelect,
    handleConfirm,
    handleCancel,
  } = useAddExpense();

  return (
    <View style={globalStyles.screenContainer}>
      <HeaderWithBack title="Añadir Gasto" onBackPress={() => navigation.goBack()} />
      <View style={form.container}>
     
        <FormRenderer fields={userFields} values={values} onChange={setField} skip={["categoryId", "categories"]} />

        <View style={form.section}>
          <Text style={form.label}>Categorías:</Text>
          <CategoriesSection
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

export default AddExpenseScreen;