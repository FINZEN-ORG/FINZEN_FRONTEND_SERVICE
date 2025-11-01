import { useState } from 'react';
import { Alert } from 'react-native';
import TransactionService from '../../services/TransactionService';
import { useNavigation } from '@react-navigation/native';
import { convertToISODate } from '../../utils/dateUtils';
import { userFields } from './AddExpenseFormConfig';

export const useAddExpense = () => {
  const navigation = useNavigation();
  // build initial values from form config
  const initialValues = Object.fromEntries(userFields.map(f => [f.name, (f as any).initialValue ?? '']));
  const [values, setValues] = useState<Record<string, any>>(initialValues);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const handleCategorySelect = (categoryId: number, title: string) => {
    setSelectedCategory(categoryId);
    console.log(`Categoría seleccionada: ${title} (ID: ${categoryId})`);
  };

  const handleConfirm = async () => {
    const amount = values.amount;
    const description = values.description;
    const date = values.date;

    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert('Error', 'El monto debe ser mayor a 0');
      return;
    }
    if (!description || !description.trim()) {
      Alert.alert('Error', 'La descripción es requerida');
      return;
    }
    if (selectedCategory === null) {
      Alert.alert('Error', 'Debes seleccionar una categoría');
      return;
    }
    if (!date) {
      Alert.alert('Error', 'La fecha es requerida');
      return;
    }

    try {
      const data = {
        amount: parseFloat(amount),
        description: description.trim(),
        categoryId: selectedCategory,
        date: convertToISODate(date),
      };

      console.log('📤 Enviando gasto al backend:', data);
      const response = await TransactionService.createExpense(data);

      Alert.alert('✅ ¡Éxito!', 'El gasto ha sido registrado correctamente.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error: any) {
      console.error('❌ Error al registrar gasto:', error);
      Alert.alert('Error', error.response?.data?.message || 'No se pudo registrar el gasto.');
    }
  };

  const handleCancel = () => navigation.goBack();

  const formatAmount = (text: string) => {
    const cleanText = text.replace(/[^0-9.]/g, '');
    setValues(prev => ({ ...prev, amount: cleanText }));
  };

  const setField = (name: string, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));
  };

  return {
    // generic form values
    values,
    setField,
    // convenience accessors for backward compatibility
    amount: values.amount,
    description: values.description,
    date: values.date,
    setAmount: formatAmount,
    setDescription: (v: string) => setField('description', v),
    setSelectedCategory,
    setDate: (v: string) => setField('date', v),
    selectedCategory,
    handleCategorySelect,
    handleConfirm,
    handleCancel,
  };
};
