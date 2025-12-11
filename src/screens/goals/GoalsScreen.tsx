import React, { useState, useCallback } from 'react';
import { Modal, TextInput, View, Text, TouchableOpacity, FlatList, Alert, ActivityIndicator } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import GoalService, { GoalDto } from '../../services/GoalService';
import { globalStyles } from '../../styles';
import { ScreenTitle } from '../../components';
import { colors } from '../../styles/colors';
import { DatePicker } from '../../components';

// Lista de categorías para el selector
const GOAL_CATEGORIES = [
    { label: 'Viaje ✈️', value: 'TRAVEL' },
    { label: 'Emergencia 🆘', value: 'EMERGENCY_FUND' },
    { label: 'Educación 🎓', value: 'EDUCATION' },
    { label: 'Tecnología 💻', value: 'TECHNOLOGY' },
    { label: 'Vehículo 🚗', value: 'VEHICLE' },
    { label: 'Hogar 🏠', value: 'HOME' },
    { label: 'Inversión 📈', value: 'INVESTMENT' },
    { label: 'Otro 📦', value: 'OTHER' },
];

const GoalsScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    const [goals, setGoals] = useState<GoalDto[]>([]);
    const [loading, setLoading] = useState(true);

    // Estado CREACIÓN
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [newGoalName, setNewGoalName] = useState('');
    const [newGoalTarget, setNewGoalTarget] = useState('');
    const [newGoalDate, setNewGoalDate] = useState('');
    const [newGoalCategory, setNewGoalCategory] = useState<string>('OTHER');

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

    const handleCreateGoal = async () => {
        if (!newGoalName || !newGoalTarget || !newGoalDate) {
            Alert.alert("Atención", "Por favor completa todos los campos.");
            return;
        }

        try {
            await GoalService.createGoal({
                name: newGoalName,
                targetAmount: parseFloat(newGoalTarget),
                category: newGoalCategory as any,
                dueDate: newGoalDate,
                description: 'Meta creada desde app',
                status: 'ACTIVE'
            });

            setCreateModalVisible(false);
            // Reset fields
            setNewGoalName(''); setNewGoalTarget(''); setNewGoalDate(''); setNewGoalCategory('OTHER');

            loadGoals();
            Alert.alert('¡Éxito!', 'Meta creada.');
        } catch (error: any) {
            const msg = error.response?.data?.message || 'No se pudo crear la meta.';
            Alert.alert('Error', msg);
        }
    };

    if (loading) {
        return (
            <View style={[globalStyles.screenContainer, {justifyContent:'center', alignItems:'center'}]}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    return (
        <View style={globalStyles.screenContainer}>
            <ScreenTitle title="Mis Metas" subtitle="Ahorra para tus sueños" />

            {/* Botón Flotante Superior o Header Button */}
            <TouchableOpacity
                style={{
                    backgroundColor: colors.primary, padding: 15, borderRadius: 12,
                    alignItems: 'center', marginHorizontal: 5, marginBottom: 20,
                    shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3, elevation: 3
                }}
                onPress={() => setCreateModalVisible(true)}
            >
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>+ Nueva Meta</Text>
            </TouchableOpacity>

            {goals.length === 0 && (
                <View style={{ padding: 40, alignItems: 'center', opacity: 0.6 }}>
                    <Text style={{ fontSize: 40, marginBottom: 10 }}>🎯</Text>
                    <Text style={{ color: colors.textSecondary, textAlign: 'center' }}>No tienes metas activas.</Text>
                    <Text style={{ color: colors.textSecondary, fontSize: 12 }}>¡Crea una para empezar a ahorrar!</Text>
                </View>
            )}

            <FlatList
                data={goals}
                keyExtractor={item => item.id?.toString() || Math.random().toString()}
                contentContainerStyle={{ paddingBottom: 80, paddingHorizontal: 5 }}
                renderItem={({ item }) => {
                    const saved = item.savedAmount || 0;
                    const target = item.targetAmount || 1;
                    const progress = Math.min(saved / target, 1);

                    return (
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => navigation.navigate('GoalDetail', { goalId: item.id })}
                        >
                            <View style={{ backgroundColor: 'white', padding: 16, borderRadius: 16, marginBottom: 16, elevation: 3, shadowColor: '#000', shadowOffset: {width:0, height:2}, shadowOpacity:0.1, shadowRadius:4 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.textPrimary }}>{item.name}</Text>
                                    <Text style={{ fontSize: 12, color: '#999' }}>{item.dueDate}</Text>
                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginVertical: 10 }}>
                                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: colors.primary }}>
                                        ${saved.toLocaleString()}
                                    </Text>
                                    <Text style={{ fontSize: 14, color: '#999', marginBottom: 4 }}>
                                        / ${item.targetAmount.toLocaleString()}
                                    </Text>
                                </View>

                                <View style={{ height: 8, backgroundColor: '#F0F0F0', borderRadius: 4, overflow: 'hidden' }}>
                                    <View style={{ width: `${progress * 100}%`, height: '100%', backgroundColor: colors.primary }} />
                                </View>

                                <Text style={{textAlign:'right', fontSize:12, marginTop:6, color: colors.primary, fontWeight: '600'}}>
                                    {(progress * 100).toFixed(0)}%
                                </Text>
                            </View>
                        </TouchableOpacity>
                    );
                }}
            />

            {/* MODAL DE CREACIÓN */}
            <Modal visible={createModalVisible} transparent animationType="slide">
                <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)', padding: 20 }}>
                    <View style={{ backgroundColor: 'white', padding: 24, borderRadius: 16 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20, color: colors.textPrimary }}>Nueva Meta</Text>

                        <Text style={{ marginBottom: 5, fontWeight:'600', color: colors.textSecondary }}>Nombre</Text>
                        <TextInput
                            value={newGoalName} onChangeText={setNewGoalName} placeholder="Ej: Viaje a Europa"
                            style={{ borderWidth: 1, borderColor: colors.border, borderRadius: 8, padding: 12, marginBottom: 15, backgroundColor: colors.backgroundSecondary }}
                        />

                        <Text style={{ marginBottom: 5, fontWeight:'600', color: colors.textSecondary }}>Monto Objetivo ($)</Text>
                        <TextInput
                            value={newGoalTarget} onChangeText={setNewGoalTarget} placeholder="0.00" keyboardType="numeric"
                            style={{ borderWidth: 1, borderColor: colors.border, borderRadius: 8, padding: 12, marginBottom: 15, backgroundColor: colors.backgroundSecondary }}
                        />

                        <Text style={{ marginBottom: 5, fontWeight:'600', color: colors.textSecondary }}>Fecha Límite</Text>
                        <View style={{ marginBottom: 15 }}>
                            <DatePicker
                                value={newGoalDate}
                                onDateChange={setNewGoalDate}
                                placeholder="Seleccionar fecha"
                                format="YYYY-MM-DD"
                            />
                        </View>

                        <Text style={{ marginBottom: 8, fontWeight:'600', color: colors.textSecondary }}>Categoría</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 25 }}>
                            {GOAL_CATEGORIES.map((cat) => (
                                <TouchableOpacity
                                    key={cat.value}
                                    onPress={() => setNewGoalCategory(cat.value)}
                                    style={{
                                        paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20,
                                        backgroundColor: newGoalCategory === cat.value ? colors.primary : '#F0F0F0',
                                        borderWidth: 1, borderColor: newGoalCategory === cat.value ? colors.primary : '#E0E0E0'
                                    }}
                                >
                                    <Text style={{ fontSize: 12, color: newGoalCategory === cat.value ? 'white' : '#666', fontWeight: newGoalCategory === cat.value ? 'bold' : 'normal' }}>
                                        {cat.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 10 }}>
                            <TouchableOpacity onPress={() => setCreateModalVisible(false)} style={{ padding: 12 }}>
                                <Text style={{ color: '#666', fontWeight: '600' }}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleCreateGoal} style={{ backgroundColor: colors.primary, paddingVertical: 12, paddingHorizontal: 20, borderRadius: 10 }}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>Crear Meta</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default GoalsScreen;