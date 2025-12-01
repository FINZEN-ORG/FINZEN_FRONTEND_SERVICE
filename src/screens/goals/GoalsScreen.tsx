import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import GoalService, { GoalCategory, GoalDto } from '../../services/GoalService';
import { globalStyles } from '../../styles';
import { ScreenTitle } from '../../components';
import { colors } from '../../styles/colors';
import { DatePicker } from '../../components';

const GoalsScreen: React.FC = () => {
  const [goals, setGoals] = useState<GoalDto[]>([]);
  const [loading, setLoading] = useState(true);
  // Estado para modal de Depósito/Retiro
  const [selectedGoal, setSelectedGoal] = useState<GoalDto | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [amount, setAmount] = useState('');
  const [mode, setMode] = useState<'deposit' | 'withdraw'>('deposit');
  // NUEVO ESTADO PARA CREAR META
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [newGoalName, setNewGoalName] = useState('');
  const [newGoalTarget, setNewGoalTarget] = useState('');
  const [newGoalDate, setNewGoalDate] = useState('');

  const loadGoals = async () => {
    try {
      setLoading(true);
      const data = await GoalService.getAllGoals();
      setGoals(data);
    } catch (error) {
      console.error('Error loading goals:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadGoals();
    }, []),
  );

  const handleCreateGoal = async () => {
    if (!newGoalName || !newGoalTarget || !newGoalDate) {
        Alert.alert("Atención", "Por favor completa todos los campos, incluyendo la fecha.");
        return;
    }
    try {
      await GoalService.createGoal({
        name: newGoalName,
        targetAmount: parseFloat(newGoalTarget),
        category: GoalCategory.OTHER,
        status: 'ACTIVE',
        description: 'Meta creada desde app',
        dueDate: newGoalDate
      });
      setCreateModalVisible(false);
      setNewGoalName('');
      setNewGoalTarget('');
      setNewGoalDate(''); // Limpiar fech
      loadGoals();
      Alert.alert('¡Éxito!', 'Meta creada.');
    } catch (error) {
      Alert.alert('Error', 'No se pudo crear la meta.');
    }
  };

  const handleTransaction = async () => {
    if (!amount || parseFloat(amount) <= 0 || !selectedGoal) return;
    try {
      if (mode === 'deposit') {
        await GoalService.deposit(selectedGoal.id!, parseFloat(amount));
        Alert.alert('¡Éxito!', 'Abono realizado correctamente.');
      } else {
        await GoalService.withdraw(selectedGoal.id!, parseFloat(amount));
        Alert.alert('¡Éxito!', 'Retiro realizado correctamente.');
      }
      setModalVisible(false);
      setAmount('');
      loadGoals(); // Recargar lista
    } catch (error: any) {
      Alert.alert(
        'Error',
        error.message || 'No se pudo procesar la transacción.',
      );
    }
  };

  const openModal = (goal: GoalDto, action: 'deposit' | 'withdraw') => {
    setSelectedGoal(goal);
    setMode(action);
    setModalVisible(true);
  };

  if (loading) {
    return (
      <View style={[globalStyles.screenContainer, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={globalStyles.screenContainer}>
      <ScreenTitle title="Mis Metas" subtitle="Ahorra para tus sueños" />

      {/* BOTÓN DE CREAR META (VISIBLE SIEMPRE O EN EMPTY STATE) */}
      <TouchableOpacity
        style={{
          backgroundColor: colors.primary,
          padding: 12,
          borderRadius: 8,
          alignItems: 'center',
          margin: 16,
        }}
        onPress={() => setCreateModalVisible(true)}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>+ Nueva Meta</Text>
      </TouchableOpacity>

      {goals.length === 0 && (
        <View style={{ padding: 20, alignItems: 'center' }}>
          <Text style={{ color: '#666' }}>
            No tienes metas activas. ¡Crea una!
          </Text>
          {/* Aquí podrías poner un botón para crear meta si tuviéramos esa pantalla lista */}
        </View>
      )}

      <FlatList
        data={goals}
        keyExtractor={item => item.id?.toString() || Math.random().toString()}
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={({ item }) => {
          const saved = item.savedAmount || 0;
          const target = item.targetAmount || 1; // Evitar división por cero
          const progress = Math.min(saved / target, 1);

          return (
            <View
              style={{
                backgroundColor: 'white',
                padding: 16,
                borderRadius: 12,
                marginBottom: 12,
                elevation: 2,
                borderWidth: 1,
                borderColor: '#EEE',
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: colors.textPrimary,
                  }}
                >
                  {item.name}
                </Text>
                <Text style={{ fontSize: 12, color: '#999' }}>
                  {item.dueDate}
                </Text>
                <Text
                  style={{
                    color:
                      item.status === 'COMPLETED'
                        ? colors.success
                        : colors.textSecondary,
                    fontWeight: 'bold',
                  }}
                >
                  {item.status}
                </Text>
              </View>

              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 'bold',
                  color: colors.secondary,
                  marginVertical: 8,
                }}
              >
                ${saved.toLocaleString()}{' '}
                <Text style={{ fontSize: 14, color: '#999' }}>
                  / ${item.targetAmount.toLocaleString()}
                </Text>
              </Text>

              {/* Barra de Progreso */}
              <View
                style={{
                  height: 10,
                  backgroundColor: '#EEE',
                  borderRadius: 5,
                  overflow: 'hidden',
                }}
              >
                <View
                  style={{
                    width: `${progress * 100}%`,
                    height: '100%',
                    backgroundColor: colors.success,
                  }}
                />
              </View>
              <Text
                style={{
                  textAlign: 'right',
                  fontSize: 12,
                  marginTop: 4,
                  color: colors.success,
                }}
              >
                {(progress * 100).toFixed(0)}% completado
              </Text>

              {/* Botones de Acción */}
              <View style={{ flexDirection: 'row', marginTop: 15, gap: 10 }}>
                <TouchableOpacity
                  onPress={() => openModal(item, 'deposit')}
                  style={{
                    flex: 1,
                    backgroundColor: '#E6F9EE',
                    padding: 10,
                    borderRadius: 8,
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ color: colors.success, fontWeight: 'bold' }}>
                    + Abonar
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => openModal(item, 'withdraw')}
                  style={{
                    flex: 1,
                    backgroundColor: '#FFF0F0',
                    padding: 10,
                    borderRadius: 8,
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ color: colors.expense, fontWeight: 'bold' }}>
                    - Retirar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />

      {/* MODAL DE CREACIÓN ACTUALIZADO */}
      <Modal visible={createModalVisible} transparent animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
            padding: 20,
          }}
        >
          <View
            style={{ backgroundColor: 'white', padding: 20, borderRadius: 12 }}
          >
            <Text
              style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 15 }}
            >
              Nueva Meta
            </Text>

            <Text style={{ marginBottom: 5 }}>Nombre</Text>
            <TextInput
              value={newGoalName}
              onChangeText={setNewGoalName}
              placeholder="Ej: Viaje a Europa"
              style={{
                borderWidth: 1,
                borderColor: '#DDD',
                borderRadius: 8,
                padding: 10,
                marginBottom: 15,
              }}
            />

            <Text style={{ marginBottom: 5 }}>Meta ($)</Text>
            <TextInput
              value={newGoalTarget}
              onChangeText={setNewGoalTarget}
              placeholder="0.00"
              keyboardType="numeric"
              style={{
                borderWidth: 1,
                borderColor: '#DDD',
                borderRadius: 8,
                padding: 10,
                marginBottom: 15,
              }}
            />

            {/* 5. AGREGAR DATEPICKER */}
            <Text style={{ marginBottom: 5 }}>Fecha Límite</Text>
            <View style={{ marginBottom: 20 }}>
              <DatePicker
                value={newGoalDate}
                onDateChange={setNewGoalDate}
                placeholder="Seleccionar fecha objetivo"
                format="YYYY-MM-DD" // IMPORTANTE: Formato ISO para el backend Java
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                gap: 10,
              }}
            >
              <TouchableOpacity onPress={() => setCreateModalVisible(false)}>
                <Text style={{ padding: 10, color: '#666' }}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleCreateGoal}
                style={{
                  backgroundColor: colors.primary,
                  padding: 10,
                  borderRadius: 8,
                }}
              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>
                  Crear
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal Transacción */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
            padding: 20,
          }}
        >
          <View
            style={{ backgroundColor: 'white', padding: 24, borderRadius: 16 }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                marginBottom: 10,
                textAlign: 'center',
              }}
            >
              {mode === 'deposit' ? 'Abonar a' : 'Retirar de'}{' '}
              {selectedGoal?.name}
            </Text>

            <TextInput
              value={amount}
              onChangeText={setAmount}
              placeholder="Monto (ej: 50000)"
              keyboardType="numeric"
              autoFocus
              style={{
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: 8,
                padding: 12,
                marginBottom: 20,
                fontSize: 20,
                textAlign: 'center',
                backgroundColor: colors.backgroundSecondary,
              }}
            />

            <View style={{ flexDirection: 'row', gap: 10 }}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={{
                  flex: 1,
                  padding: 14,
                  borderRadius: 10,
                  backgroundColor: '#EEE',
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: '#666', fontWeight: 'bold' }}>
                  Cancelar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleTransaction}
                style={{
                  flex: 1,
                  padding: 14,
                  borderRadius: 10,
                  backgroundColor: colors.primary,
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>
                  Confirmar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default GoalsScreen;