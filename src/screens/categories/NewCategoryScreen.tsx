import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import { styles } from './NewCategoryScreen.Style';
import { colors } from '../../styles/colors';
import useNewCategory from './useNewCategory';

const NewCategoryScreen: React.FC = () => {
    const {
        name, setName,
        description, setDescription,
        selectedEmoji, setSelectedEmoji,
        selectedType, setSelectedType,
        handleCreate, handleCancel,
        // Nuevos props del hook
        loading,
        aiSuggestion,
        handleAcceptSuggestion,
        handleDismissSuggestion
    } = useNewCategory();

  return (
    <View style={{ flex: 1, backgroundColor: '#EAFFF2' }}>
      <View style={[styles.container, { paddingBottom: 120 }]}>
        <Text style={styles.title}>Nueva Categoría</Text>
      {/* Selector de Tipo (Gasto vs Ingreso) */}
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 24,
          backgroundColor: colors.backgroundLight,
          borderRadius: 12,
          padding: 4,
        }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            padding: 14,
            backgroundColor:
              selectedType === 'EXPENSE' ? 'white' : 'transparent',
            borderRadius: 10,
            alignItems: 'center',
          }}
          onPress={() => setSelectedType('EXPENSE')}
        >
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 16,
              color: selectedType === 'EXPENSE' ? colors.textPrimary : colors.textSecondary,
            }}
          >
            Gasto 💸
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            padding: 14,
            backgroundColor:
              selectedType === 'INCOME' ? 'white' : 'transparent',
            borderRadius: 10,
            alignItems: 'center',
          }}
          onPress={() => setSelectedType('INCOME')}
        >
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 16,
              color: selectedType === 'INCOME' ? colors.textPrimary : colors.textSecondary,
            }}
          >
            Ingreso 💰
          </Text>
        </TouchableOpacity>
      </View>

      {/* INPUT DE EMOJI NATIVO */}
      <Text style={styles.label}>Icono (Toca para cambiar)</Text>
      <View style={{ alignItems: 'center', marginBottom: 24 }}>
        <View
          style={{
            width: 90,
            height: 90,
            borderRadius: 45,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 2,
            borderColor: colors.border,
            elevation: 2,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
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
        <Text style={{ fontSize: 12, color: colors.textSecondary, marginTop: 8 }}>
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
      </View>

      {/* Botones fijos en la parte inferior */}
      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20, paddingBottom: 30, backgroundColor: '#EAFFF2' }}>
          <TouchableOpacity
              style={[styles.primaryBtn, loading && {opacity: 0.7}]}
              onPress={handleCreate}
              disabled={loading}
          >
              {loading ? (
                  <ActivityIndicator color="white" />
              ) : (
                  <Text style={styles.primaryBtnText}>Crear Categoría</Text>
              )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryBtn} onPress={handleCancel} disabled={loading}>
              <Text style={styles.secondaryBtnText}>Cancelar</Text>
          </TouchableOpacity>
      </View>


      {/* MODAL DE SUGERENCIA IA */}
      <Modal visible={!!aiSuggestion} transparent animationType="slide">
          <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.6)', padding: 20 }}>
              <View style={{ backgroundColor: 'white', borderRadius: 20, padding: 20, elevation: 5 }}>
                  <View style={{ alignItems: 'center', marginBottom: 15 }}>
                      <Text style={{ fontSize: 40 }}>✨</Text>
                      <Text style={{ fontSize: 20, fontWeight: 'bold', color: colors.primary, marginTop: 10 }}>
                          Categoría Creada
                      </Text>
                      <Text style={{ textAlign: 'center', color: '#666', marginTop: 5 }}>
                          La IA tiene una sugerencia para ti
                      </Text>
                  </View>
                  <View style={{ backgroundColor: '#FFF8E7', padding: 15, borderRadius: 12, marginBottom: 20, borderWidth: 1, borderColor: '#FFD966' }}>
                      <Text style={{ color: '#92400E', fontSize: 14, lineHeight: 20 }}>
                          {aiSuggestion?.description}
                      </Text>
                      <View style={{ marginTop: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Text style={{ fontWeight: 'bold', color: '#D97706' }}>Presupuesto sugerido:</Text>
                          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#D97706' }}>
                              ${aiSuggestion?.suggested_amount.toLocaleString()}
                          </Text>
                      </View>
                  </View>
                  <View style={{ flexDirection: 'row', gap: 10 }}>
                      <TouchableOpacity
                          onPress={handleDismissSuggestion}
                          style={{ flex: 1, padding: 15, alignItems: 'center' }}
                      >
                          <Text style={{ color: '#666', fontWeight: 'bold' }}>Ahora no</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                          onPress={handleAcceptSuggestion}
                          style={{ flex: 1, backgroundColor: colors.primary, padding: 15, borderRadius: 12, alignItems: 'center' }}
                      >
                          <Text style={{ color: 'white', fontWeight: 'bold' }}>Crear Presupuesto</Text>
                      </TouchableOpacity>
                  </View>
              </View>
          </View>
      </Modal>
    </View>
  );
};

export default NewCategoryScreen;