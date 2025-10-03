import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CategoriesSection, DatePicker, HeaderWithBack } from '../../components';
import { addExpenseStyles } from '../expenses/AddExpenseScreen.Style';
import { globalStyles } from '../../styles';
import { incomeCategories } from '../../data/incomeCategories';

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

  const handleConfirm = () => {
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

    console.log('💰 Ingreso registrado localmente:', {
      amount: parseFloat(amount),
      description: description.trim(),
      categoryId: selectedCategory,
      date: date,
    });

    Alert.alert(
      '✅ ¡Éxito!',
      'El ingreso ha sido registrado correctamente.',
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const formatAmount = (text: string) => {
    const cleanText = text.replace(/[^0-9.]/g, '');
    setAmount(cleanText);
  };

  return (
    <SafeAreaView style={globalStyles.screenContainer}>
      <HeaderWithBack 
        title="Añadir Ingreso"
        onBackPress={() => navigation.goBack()}
      />

      <View style={addExpenseStyles.container}>
        <View style={addExpenseStyles.section}>
          <Text style={addExpenseStyles.label}>Monto del ingreso</Text>
          <TextInput
            style={addExpenseStyles.amountInput}
            value={amount}
            onChangeText={formatAmount}
            placeholder="$ 0.00"
            placeholderTextColor="#999"
            keyboardType="numeric"
          />
        </View>

        <View style={addExpenseStyles.section}>
          <Text style={addExpenseStyles.label}>Descripción:</Text>
          <TextInput
            style={addExpenseStyles.descriptionInput}
            value={description}
            onChangeText={setDescription}
            placeholder="Ej: Pago extra"
            placeholderTextColor="#999"
          />
        </View>

        <View style={addExpenseStyles.section}>
          <Text style={addExpenseStyles.label}>Categorías:</Text>
          <CategoriesSection
            categories={incomeCategories} // Pass dynamic categories
            onCategoryPress={handleCategorySelect}
            selectedCategory={selectedCategory}
            selectionMode={true}
            containerStyle={addExpenseStyles.categoriesSection}
          />
        </View>

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

      <View style={addExpenseStyles.buttonsContainer}>
        <TouchableOpacity 
          style={addExpenseStyles.confirmButton}
          onPress={handleConfirm}
        >
          <Text style={addExpenseStyles.confirmButtonText}>Confirmar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={addExpenseStyles.cancelButton}
          onPress={handleCancel}
        >
          <Text style={addExpenseStyles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddIncomeScreen;