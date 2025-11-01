import { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CategoryService from '../../services/CategoryService';

export default function useNewCategory() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [budget, setBudget] = useState('');
  const [importance, setImportance] = useState<'Alta' | 'Media' | 'Baja' | null>(null);

  const handleCreate = async () => {
    if (!name.trim()) {
      Alert.alert('Nombre requerido', 'Por favor ingresa el nombre de la categoría.');
      return;
    }

    try {
      const payload = { name: name.trim() };
      await CategoryService.createCategory(payload);
      Alert.alert('✅ ¡Éxito!', 'La categoría ha sido creada correctamente.', [
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
    name,
    setName,
    description,
    setDescription,
    selectedColor,
    setSelectedColor,
    budget,
    setBudget,
    importance,
    setImportance,
    handleCreate,
    handleCancel,
  };
}
