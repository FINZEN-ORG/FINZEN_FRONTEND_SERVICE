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
import { addExpenseStyles } from './AddExpenseScreen.Style';
import { globalStyles } from '../../styles';
import TransactionService from '../../services/TransactionService';

const AddExpenseScreen: React.FC = () => {
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

      console.log('📤 Enviando gasto al backend:', data); // ✅ LOG AGREGADO

      const response = await TransactionService.createExpense(data);
      console.log('✅ Gasto registrado en backend:', response);
      Alert.alert('✅ ¡Éxito!', 'El gasto ha sido registrado correctamente.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error: any) {
      console.error('❌ Error al registrar gasto:', error);
      console.error('❌ Error response:', error.response?.data); // ✅ VER DETALLES DEL ERROR
      Alert.alert('Error', error.response?.data?.message || 'No se pudo registrar el gasto. Intenta nuevamente.');
    }
  };

  const handleCancel = () => navigation.goBack();

  const formatAmount = (text: string) => {
    const cleanText = text.replace(/[^0-9.]/g, '');
    setAmount(cleanText);
  };

  return (
      <View style={globalStyles.screenContainer}>
        <HeaderWithBack title="Añadir Gasto" onBackPress={() => navigation.goBack()} />
        <View style={addExpenseStyles.container}>
          {/* Monto */}
          <View style={addExpenseStyles.section}>
            <Text style={addExpenseStyles.label}>Monto del gasto</Text>
            <TextInput
                style={addExpenseStyles.amountInput}
                value={amount}
                onChangeText={formatAmount}
                placeholder="$ 0.00"
                placeholderTextColor="#999"
                keyboardType="numeric"
            />
          </View>

          {/* Descripción */}
          <View style={addExpenseStyles.section}>
            <Text style={addExpenseStyles.label}>Descripción:</Text>
            <TextInput
                style={addExpenseStyles.descriptionInput}
                value={description}
                onChangeText={setDescription}
                placeholder="Ej: Café con amigos"
                placeholderTextColor="#999"
            />
          </View>

          {/* Categorías */}
          <View style={addExpenseStyles.section}>
            <Text style={addExpenseStyles.label}>Categorías:</Text>
            <CategoriesSection
                onCategoryPress={handleCategorySelect}
                selectedCategory={selectedCategory}
                selectionMode={true}
                containerStyle={addExpenseStyles.categoriesSection}
            />
          </View>

          {/* Fecha */}
          <View style={addExpenseStyles.section}>
            <Text style={addExpenseStyles.label}>Fecha</Text>
            <DatePicker
                value={date}
                onDateChange={setDate}
                placeholder="Seleccionar fecha"
                format="MM/DD/YYYY"
            />
          </View>
        </View>

        {/* Botones */}
        <View style={addExpenseStyles.buttonsContainer}>
          <TouchableOpacity style={addExpenseStyles.confirmButton} onPress={handleConfirm}>
            <Text style={addExpenseStyles.confirmButtonText}>Confirmar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={addExpenseStyles.cancelButton} onPress={handleCancel}>
            <Text style={addExpenseStyles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
  );
};

export default AddExpenseScreen;