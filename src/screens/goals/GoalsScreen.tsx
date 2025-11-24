import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, Modal, TextInput, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import GoalService, { GoalDto, GoalCategory } from '../../services/GoalService';
import { globalStyles } from '../../styles';
import { ScreenTitle, FloatingActionButton } from '../../components';

const GoalsScreen: React.FC = () => {
  const [goals, setGoals] = useState<GoalDto[]>([]);
  const [loading, setLoading] = useState(true);

  // Estado para modal de Depósito/Retiro
  const [selectedGoal, setSelectedGoal] = useState<GoalDto | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [amount, setAmount] = useState('');
  const [mode, setMode] = useState<'deposit' | 'withdraw'>('deposit');

  const loadGoals = async () => {
    try {
      setLoading(true);
      const data = await GoalService.getAllGoals();
      setGoals(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(useCallback(() => { loadGoals(); }, []));

  const handleTransaction = async () => {
    if (!amount || parseFloat(amount) <= 0 || !selectedGoal) return;
    try {
      if (mode === 'deposit') {
        await GoalService.deposit(selectedGoal.id!, parseFloat(amount));
        Alert.alert("¡Éxito!", "Dinero abonado a la meta.");
      } else {
        await GoalService.withdraw(selectedGoal.id!, parseFloat(amount));
        Alert.alert("¡Éxito!", "Dinero retirado de la meta.");
      }
      setModalVisible(false);
      setAmount('');
      loadGoals(); // Recargar lista
    } catch (error: any) {
      Alert.alert("Error", error.message || "No se pudo procesar.");
    }
  };

  const openModal = (goal: GoalDto, action: 'deposit' | 'withdraw') => {
    setSelectedGoal(goal);
    setMode(action);
    setModalVisible(true);
  };

  const renderGoalItem = ({ item }: { item: GoalDto }) => {
    const progress = item.savedAmount && item.targetAmount
        ? (item.savedAmount / item.targetAmount)
        : 0;

    return (
        <View style={{ backgroundColor: 'white', padding: 16, borderRadius: 12, marginBottom: 12, elevation: 2 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
            <Text style={{ color: '#666' }}>{item.status}</Text>
          </View>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#6C5CE7', marginVertical: 8 }}>
            ${item.savedAmount?.toFixed(2)} <Text style={{ fontSize: 14, color: '#999' }}>/ ${item.targetAmount}</Text>
          </Text>

          {/* Barra */}
          <View style={{ height: 8, backgroundColor: '#EEE', borderRadius: 4, overflow: 'hidden' }}>
            <View style={{ width: `${Math.min(progress * 100, 100)}%`, height: '100%', backgroundColor: '#00D084' }} />
          </View>

          {/* Botones */}
          <View style={{ flexDirection: 'row', marginTop: 12, gap: 10 }}>
            <TouchableOpacity
                onPress={() => openModal(item, 'deposit')}
                style={{ flex: 1, backgroundColor: '#E6F9EE', padding: 10, borderRadius: 8, alignItems: 'center' }}>
              <Text style={{ color: '#00D084', fontWeight: 'bold' }}>+ Abonar</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => openModal(item, 'withdraw')}
                style={{ flex: 1, backgroundColor: '#FFECEC', padding: 10, borderRadius: 8, alignItems: 'center' }}>
              <Text style={{ color: '#FF6B6B', fontWeight: 'bold' }}>- Retirar</Text>
            </TouchableOpacity>
          </View>
        </View>
    );
  };

  return (
      <View style={globalStyles.screenContainer}>
        <ScreenTitle title="Mis Metas" subtitle="Ahorra para tus sueños" />
        <FlatList
            data={goals}
            renderItem={renderGoalItem}
            keyExtractor={item => item.id?.toString() || ''}
            contentContainerStyle={{ paddingBottom: 80 }}
        />

        {/* Modal Simple para Depósito/Retiro */}
        <Modal visible={modalVisible} transparent animationType="slide">
          <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)', padding: 20 }}>
            <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 12 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
                {mode === 'deposit' ? 'Abonar a' : 'Retirar de'} {selectedGoal?.name}
              </Text>
              <TextInput
                  value={amount}
                  onChangeText={setAmount}
                  placeholder="Monto ($)"
                  keyboardType="numeric"
                  style={{ borderWidth: 1, borderColor: '#DDD', borderRadius: 8, padding: 10, marginBottom: 20, fontSize: 18 }}
              />
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 10 }}>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text style={{ padding: 10, color: '#666' }}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleTransaction} style={{ backgroundColor: '#6C5CE7', padding: 10, borderRadius: 8 }}>
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>Confirmar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
  );
};

export default GoalsScreen;