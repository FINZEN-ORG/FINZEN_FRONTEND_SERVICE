import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppStackParamList } from '../../types/navigation';
import { styles } from './NewCategoryScreen.Style';
import CategoryService from '../../services/CategoryService';

type NavProp = StackNavigationProp<AppStackParamList, 'NewCategory'>;

const COLORS = [
  '#F7C777', '#F3A76B', '#FFD3A5', '#9FE6C9', '#7FD3D3', '#CDEAF0'
];

const NewCategoryScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
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
        const payload = {
            name: name.trim()
        };

        console.log('📤 Crear categoría:', payload);

        // ✅ Llamar al servicio del backend
        const response = await CategoryService.createCategory(payload);

        console.log('✅ Categoría creada:', response);

        Alert.alert('✅ ¡Éxito!', 'La categoría ha sido creada correctamente.', [
            { text: 'OK', onPress: () => navigation.goBack() }
        ]);
    } catch (error: any) {
        console.error('❌ Error al crear categoría:', error);
        Alert.alert('Error', error.response?.data?.message || 'No se pudo crear la categoría.');
    }
};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Nueva Categoría</Text>

      <Text style={styles.label}>Nombre</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: familia"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Descripción (Opcional)</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: Registro de gastos familiares"
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.label}>Selecciona un color</Text>
      <View style={styles.colorsRow}>
        {COLORS.map(c => (
          <Pressable
            key={c}
            onPress={() => setSelectedColor(c)}
            style={[
              styles.colorCircle,
              { backgroundColor: c },
              selectedColor === c && styles.colorSelected
            ]}
          />
        ))}
      </View>

      <Text style={styles.label}>Establecer un presupuesto inicial (Opcional)</Text>
      <TextInput
        style={styles.input}
        placeholder="$0.00"
        value={budget}
        onChangeText={setBudget}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Establece la importancia</Text>
      <View style={styles.importanceRow}>
        {(['Alta', 'Media', 'Baja'] as const).map(level => (
          <TouchableOpacity
            key={level}
            onPress={() => setImportance(level)}
            style={[
              styles.importanceBtn,
              importance === level && styles.importanceBtnActive
            ]}
          >
            <Text
              style={[
                styles.importanceTxt,
                importance === level && styles.importanceTxtActive
              ]}
            >
              {level}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.aiBox}>
        <Text style={styles.aiTitle}>Sugerencias de la IA</Text>
        <Text style={styles.aiText}>
          Según tus ingresos, te recomendamos este presupuesto para mantener tus finanzas equilibradas:
        </Text>
        <Text style={styles.aiAmount}>$200.000</Text>
      </View>

      <TouchableOpacity style={styles.primaryBtn} onPress={handleCreate}>
        <Text style={styles.primaryBtnText}>Crear Categoría</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.secondaryBtnText}>Cancelar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default NewCategoryScreen;
