import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from 'react-native';
import { styles } from './NewCategoryScreen.Style';
import useNewCategory from './useNewCategory';

const COLORS = [
  '#F7C777', '#F3A76B', '#FFD3A5', '#9FE6C9', '#7FD3D3', '#CDEAF0'
];

const NewCategoryScreen: React.FC = () => {
  const {
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
  } = useNewCategory();

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

      <TouchableOpacity style={styles.secondaryBtn} onPress={() => handleCancel()}>
        <Text style={styles.secondaryBtnText}>Cancelar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default NewCategoryScreen;
