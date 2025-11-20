import { useState } from 'react';
import { Alert } from 'react-native';
import TransactionService from '../../services/TransactionService';
import { useNavigation } from '@react-navigation/native';
import { convertToISODate } from '../../utils/dateUtils';
import { userFields } from './AddIncomeFormConfig';

export const useIncomeForm = () => {
  const navigation = useNavigation();
  const initialValues = Object.fromEntries(userFields.map(f => [f.name, (f as any).initialValue ?? '']));
  const [values, setValues] = useState<Record<string, any>>(initialValues);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategory(categoryId);
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

  const response = await TransactionService.createIncome(data);

      Alert.alert('✅ ¡Éxito!', 'El ingreso ha sido registrado correctamente.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error: any) {
  // error handled by caller/UI; keep internal logging minimal
      Alert.alert('Error', error.response?.data?.message || 'No se pudo registrar el ingreso.');
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
    values,
    setField,
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

export default useIncomeForm;
