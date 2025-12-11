import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { styles } from './NewCategoryScreen.Style';
import useNewCategory from './useNewCategory';

const NewCategoryScreen: React.FC = () => {
  const {
    name,
    setName,
    description,
    setDescription,
    selectedEmoji,
    setSelectedEmoji,
    selectedType,
    setSelectedType,
    handleCreate,
    handleCancel,
  } = useNewCategory();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Nueva Categoría</Text>
      {/* Selector de Tipo (Gasto vs Ingreso) */}
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 20,
          backgroundColor: '#EEE',
          borderRadius: 10,
          padding: 4,
        }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            padding: 10,
            backgroundColor:
              selectedType === 'EXPENSE' ? 'white' : 'transparent',
            borderRadius: 8,
            alignItems: 'center',
          }}
          onPress={() => setSelectedType('EXPENSE')}
        >
          <Text
            style={{
              fontWeight: 'bold',
              color: selectedType === 'EXPENSE' ? 'black' : '#666',
            }}
          >
            Gasto 💸
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            padding: 10,
            backgroundColor:
              selectedType === 'INCOME' ? 'white' : 'transparent',
            borderRadius: 8,
            alignItems: 'center',
          }}
          onPress={() => setSelectedType('INCOME')}
        >
          <Text
            style={{
              fontWeight: 'bold',
              color: selectedType === 'INCOME' ? 'black' : '#666',
            }}
          >
            Ingreso 💰
          </Text>
        </TouchableOpacity>
      </View>

      {/* INPUT DE EMOJI NATIVO */}
      <Text style={styles.label}>Icono (Toca para cambiar)</Text>
      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: '#F0F0F0',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#DDD',
          }}
        >
          <TextInput
            style={{
              fontSize: 40,
              textAlign: 'center',
              padding: 0,
              width: '100%',
              height: '100%',
              fontFamily: 'System', // Importante para Android
              color: '#000000',
            }}
            value={selectedEmoji}
            onChangeText={text => {
              if (text.length > 0) {
                // CORRECCIÓN MAGISTRAL:
                // Usamos el spread operator [...] para dividir correctamente emojis complejos
                // text.slice(-1) rompe los emojis de 4 bytes. [...text] no.
                const chars = [...text];
                const lastChar = chars[chars.length - 1];
                setSelectedEmoji(lastChar);
              } else {
                setSelectedEmoji('');
              }
            }}
            placeholder="😀"
          />
        </View>
        <Text style={{ fontSize: 12, color: '#888', marginTop: 5 }}>
          Usa tu teclado de emojis
        </Text>
      </View>

      <Text style={styles.label}>Nombre</Text>
      <TextInput
        style={styles.input}
        placeholder={
          selectedType === 'EXPENSE' ? 'Ej: Cervezas' : 'Ej: Freelance'
        }
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

      <TouchableOpacity style={styles.primaryBtn} onPress={handleCreate}>
        <Text style={styles.primaryBtnText}>Crear Categoría</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryBtn}
        onPress={() => handleCancel()}
      >
        <Text style={styles.secondaryBtnText}>Cancelar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default NewCategoryScreen;