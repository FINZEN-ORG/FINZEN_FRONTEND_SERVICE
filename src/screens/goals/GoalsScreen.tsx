import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, Modal, TextInput, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import GoalService, { GoalDto } from '../../services/GoalService';
import { globalStyles } from '../../styles';
import { ScreenTitle } from '../../components';
import { colors } from '../../styles/colors';

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
      console.error("Error loading goals:", error);
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
        Alert.alert("¡Éxito!", "Abono realizado correctamente.");
      } else {
        await GoalService.withdraw(selectedGoal.id!, parseFloat(amount));
        Alert.alert("¡Éxito!", "Retiro realizado correctamente.");
      }
      setModalVisible(false);
      setAmount('');
      loadGoals(); // Recargar lista
    } catch (error: any) {
      Alert.alert("Error", error.message || "No se pudo procesar la transacción.");
    }
  };

  const openModal = (goal: GoalDto, action: 'deposit' | 'withdraw') => {
    setSelectedGoal(goal);
    setMode(action);
    setModalVisible(true);
  };

  if (loading) {
    return (
        <View style={[globalStyles.screenContainer, {justifyContent:'center'}]}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
    );
  }

  return (
      <View style={globalStyles.screenContainer}>
        <ScreenTitle title="Mis Metas" subtitle="Ahorra para tus sueños" />

        {goals.length === 0 && (
            <View style={{padding: 20, alignItems:'center'}}>
              <Text style={{color:'#666'}}>No tienes metas activas. ¡Crea una!</Text>
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
                  <View style={{
                    backgroundColor: 'white', padding: 16, borderRadius: 12,
                    marginBottom: 12, elevation: 2, borderWidth: 1, borderColor: '#EEE'
                  }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.textPrimary }}>{item.name}</Text>
                      <Text style={{ color: item.status === 'COMPLETED' ? colors.success : colors.textSecondary, fontWeight:'bold' }}>
                        {item.status}
                      </Text>
                    </View>

                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: colors.secondary, marginVertical: 8 }}>
                      ${saved.toLocaleString()} <Text style={{ fontSize: 14, color: '#999' }}>/ ${item.targetAmount.toLocaleString()}</Text>
                    </Text>

                    {/* Barra de Progreso */}
                    <View style={{ height: 10, backgroundColor: '#EEE', borderRadius: 5, overflow: 'hidden' }}>
                      <View style={{ width: `${progress * 100}%`, height: '100%', backgroundColor: colors.success }} />
                    </View>
                    <Text style={{textAlign:'right', fontSize:12, marginTop:4, color: colors.success}}>
                      {(progress * 100).toFixed(0)}% completado
                    </Text>

                    {/* Botones de Acción */}
                    <View style={{ flexDirection: 'row', marginTop: 15, gap: 10 }}>
                      <TouchableOpacity
                          onPress={() => openModal(item, 'deposit')}
                          style={{ flex: 1, backgroundColor: '#E6F9EE', padding: 10, borderRadius: 8, alignItems: 'center' }}>
                        <Text style={{ color: colors.success, fontWeight: 'bold' }}>+ Abonar</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                          onPress={() => openModal(item, 'withdraw')}
                          style={{ flex: 1, backgroundColor: '#FFF0F0', padding: 10, borderRadius: 8, alignItems: 'center' }}>
                        <Text style={{ color: colors.expense, fontWeight: 'bold' }}>- Retirar</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
              );
            }}
        />

        {/* Modal Transacción */}
        <Modal visible={modalVisible} transparent animationType="fade">
          <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)', padding: 20 }}>
            <View style={{ backgroundColor: 'white', padding: 24, borderRadius: 16 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10, textAlign:'center' }}>
                {mode === 'deposit' ? 'Abonar a' : 'Retirar de'} {selectedGoal?.name}
              </Text>

              <TextInput
                  value={amount}
                  onChangeText={setAmount}
                  placeholder="Monto (ej: 50000)"
                  keyboardType="numeric"
                  autoFocus
                  style={{
                    borderWidth: 1, borderColor: colors.border, borderRadius: 8,
                    padding: 12, marginBottom: 20, fontSize: 20, textAlign:'center',
                    backgroundColor: colors.backgroundSecondary
                  }}
              />

              <View style={{ flexDirection: 'row', gap: 10 }}>
                <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={{ flex: 1, padding: 14, borderRadius: 10, backgroundColor: '#EEE', alignItems: 'center' }}>
                  <Text style={{ color: '#666', fontWeight: 'bold' }}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleTransaction}
                    style={{ flex: 1, padding: 14, borderRadius: 10, backgroundColor: colors.primary, alignItems: 'center' }}>
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