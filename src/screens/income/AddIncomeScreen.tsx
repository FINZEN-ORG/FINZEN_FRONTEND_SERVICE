import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CategoriesSection, DatePicker, HeaderWithBack } from '../../components';
import { globalStyles } from '../../styles';
import { incomeCategories } from '../../data/incomeCategories';
import TransactionService from '../../services/TransactionService';
import { form } from '../../styles/form';

const AddIncomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [date, setDate] = useState('');

  const handleCategorySelect = (categoryId: number, title: string) => {
    setSelectedCategory(categoryId);
    console.log(`Categoría seleccionada: ${title} (ID: ${categoryId})`);
  };

  // ✅ NUEVA FUNCIÓN: Convertir fecha a formato ISO
  const convertToISODate = (dateString: string): string => {
    try {
      // Si la fecha viene en formato "MM/DD/YYYY"
      const parts = dateString.split('/');
      if (parts.length === 3) {
        const month = parts[0].padStart(2, '0');
        const day = parts[1].padStart(2, '0');
        const year = parts[2];
        // Crear fecha en formato ISO: "YYYY-MM-DDTHH:mm:ss"
        return `${year}-${month}-${day}T12:00:00`;
      }
      // Si ya viene en otro formato, intentar parsearlo
      const parsedDate = new Date(dateString);
      return parsedDate.toISOString();
    } catch (error) {
      console.error('Error parsing date:', error);
      // Usar fecha actual como fallback
      return new Date().toISOString();
    }
  };

  const handleConfirm = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert('Error', 'El monto debe ser mayor a 0');
      return;
    }
    if (!description.trim()) {
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
        date: convertToISODate(date), // ✅ CONVERTIR A ISO
      };

      console.log('📤 Enviando ingreso al backend:', data); // ✅ LOG AGREGADO

      const response = await TransactionService.createIncome(data);
      console.log('✅ Ingreso registrado en backend:', response);
      Alert.alert('✅ ¡Éxito!', 'El ingreso ha sido registrado correctamente.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error: any) {
      console.error('❌ Error al registrar ingreso:', error);
      console.error('❌ Error response:', error.response?.data); // ✅ VER DETALLES DEL ERROR
      Alert.alert('Error', error.response?.data?.message || 'No se pudo registrar el ingreso. Intenta nuevamente.');
    }
  };

  const handleCancel = () => navigation.goBack();

  const formatAmount = (text: string) => {
    const cleanText = text.replace(/[^0-9.]/g, '');
    setAmount(cleanText);
  };

  return (
      <View style={globalStyles.screenContainer}>
        <HeaderWithBack title="Añadir Ingreso" onBackPress={() => navigation.goBack()} />
        <View style={form.container}>
          <View style={form.section}>
            <Text style={form.label}>Monto del ingreso</Text>
            <TextInput
                style={form.input}
                value={amount}
                onChangeText={formatAmount}
                placeholder="$ 0.00"
                placeholderTextColor="#999"
                keyboardType="numeric"
            />
          </View>

          <View style={form.section}>
            <Text style={form.label}>Descripción:</Text>
            <TextInput
                style={form.input}
                value={description}
                onChangeText={setDescription}
                placeholder="Ej: Pago extra"
                placeholderTextColor="#999"
            />
          </View>

          <View style={form.section}>
            <Text style={form.label}>Categorías:</Text>
            <CategoriesSection
                categories={incomeCategories}
                onCategoryPress={handleCategorySelect}
                selectedCategory={selectedCategory}
                selectionMode={true}
                containerStyle={form.categoriesSection}
            />
          </View>

          <View style={form.section}>
            <Text style={form.label}>Fecha</Text>
            <DatePicker
                value={date}
                onDateChange={setDate}
                placeholder="Seleccionar fecha"
                format="MM/DD/YYYY"
            />
          </View>
        </View>

        <View style={form.buttonsContainer}>
          <TouchableOpacity style={form.confirmButton} onPress={handleConfirm}>
            <Text style={form.confirmButtonText}>Confirmar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={form.cancelButton} onPress={handleCancel}>
            <Text style={form.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
  );
};

export default AddIncomeScreen;