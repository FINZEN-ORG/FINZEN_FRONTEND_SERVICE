import { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CategoryService from '../../services/CategoryService';
import AIService, { BudgetSuggestion } from '../../services/AIService';

export default function useNewCategory() {
  const navigation = useNavigation<any>();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'INCOME' | 'EXPENSE'>('EXPENSE');
  const [selectedEmoji, setSelectedEmoji] = useState('📁');

  // Nuevos estados para la IA
  const [loading, setLoading] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<BudgetSuggestion | null>(null);
  const [createdCategory, setCreatedCategory] = useState<{id: number, name: string} | null>(null);

  const handleCreate = async () => {
    if (!name.trim()) {
      Alert.alert('Nombre requerido', 'Por favor ingresa el nombre de la categoría.');
      return;
    }

    try {
      setLoading(true);

      // 1. Crear Categoría
      const catPayload = {
        name: name.trim(),
        type: type,
        icon: selectedEmoji || '📁'
      };

      const newCategory = await CategoryService.createCategory(catPayload);
      setCreatedCategory(newCategory);

      // 2. Si es un GASTO, pedir sugerencia a la IA
      if (type === 'EXPENSE') {
        const suggestion = await AIService.suggestBudget(newCategory.id, newCategory.name);

        if (suggestion && !suggestion.error) {
          // IA respondió con éxito -> Mostramos el modal en la UI
          setAiSuggestion(suggestion);
        } else {
          // IA falló o no dio sugerencia -> Salir normal
          navigation.goBack();
        }
      } else {
        // Ingresos no tienen presupuesto -> Salir
        navigation.goBack();
      }

    } catch (error: any) {
      console.error(error);
      Alert.alert('Error', 'No se pudo crear la categoría.');
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptSuggestion = () => {
    if (createdCategory && aiSuggestion) {
      // Redirigir a "Nuevo Presupuesto" con datos pre-llenados
      navigation.replace('NewBudget', {
        categoryId: createdCategory.id,
        categoryName: createdCategory.name,
        suggestedAmount: Math.round(aiSuggestion.suggested_amount),
        startDate: aiSuggestion.start_date,
        endDate: aiSuggestion.end_date,
        aiTip: aiSuggestion.tip
      });
    }
  };

  const handleDismissSuggestion = () => {
    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return {
    name, setName,
    description, setDescription,
    selectedType: type,
    setSelectedType: setType,
    selectedEmoji, setSelectedEmoji,
    handleCreate, handleCancel,
    loading,
    aiSuggestion,
    handleAcceptSuggestion,
    handleDismissSuggestion
  };
}