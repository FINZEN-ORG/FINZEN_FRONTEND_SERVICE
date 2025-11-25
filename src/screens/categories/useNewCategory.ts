import { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CategoryService from '../../services/CategoryService';
import BudgetService from '../../services/BudgetService';

export default function useNewCategory() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('📁');

  const handleCreate = async () => {
    if (!name.trim()) {
      Alert.alert('Nombre requerido', 'Por favor ingresa el nombre de la categoría.');
      return;
    }

    try {
      // 1. Crear Categoría en Transactions
      const catPayload = {
        name: name.trim(),
        type: selectedType,
        icon: selectedEmoji || '📁'
      };
      const createdCategory = await CategoryService.createCategory(catPayload);

      // 2. Si el usuario definió un presupuesto, crearlo en Goals vinculado a la categoría
      if (budget && parseFloat(budget) > 0) {
        await BudgetService.createOrUpdateBudget({
          categoryId: createdCategory.id,
          amount: parseFloat(budget)
        });
      }

      Alert.alert('✅ ¡Éxito!', 'Categoría creada correctamente.', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'No se pudo crear la categoría.');
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return {
    name, setName,
    description, setDescription,
    selectedType, setSelectedType,
    selectedEmoji, setSelectedEmoji,
    budget, setBudget,
    handleCreate, handleCancel
  };
}