import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, Alert, ScrollView, Modal, TextInput } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { HeaderWithBack, DatePicker, AISuggestionCard } from '../../components';
import { globalStyles, colors } from '../../styles';
import GoalService, { GoalDto, GoalTransactionDto } from '../../services/GoalService';
import AIService, { AIRecommendation } from '../../services/AIService';

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

const GoalDetailScreen: React.FC = () => {
    const route = useRoute<any>();
    const navigation = useNavigation();
    const { goalId } = route.params;

    const [goal, setGoal] = useState<GoalDto | null>(null);
    const [history, setHistory] = useState<GoalTransactionDto[]>([]);
    const [loading, setLoading] = useState(true);

    // Modales
    const [transactionModalVisible, setTransactionModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [amount, setAmount] = useState('');
    const [mode, setMode] = useState<'deposit' | 'withdraw'>('deposit');

    // Estado Edición
    const [editName, setEditName] = useState('');
    const [editTarget, setEditTarget] = useState('');
    const [editDate, setEditDate] = useState('');
    const [editCategory, setEditCategory] = useState<string>('OTHER');

    // Estado para sugerencias de IA
    const [aiRecommendation, setAiRecommendation] = useState<AIRecommendation | null>(null);
    const [aiLoading, setAiLoading] = useState(false);

    const loadGoalDetail = async () => {
        try {
            setLoading(true);
            const goals = await GoalService.getAllGoals();
            const found = goals.find(g => g.id === goalId);
            setGoal(found || null);

            // Cargar historial
            if (found) {
                const txs = await GoalService.getHistory(goalId);
                setHistory(txs);

                // Pre-cargar datos para edición
                setEditName(found.name);
                setEditTarget(found.targetAmount.toString());
                setEditDate(found.dueDate || '');
                setEditCategory(found.category.toString());
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "No se pudo cargar la información.");
            navigation.goBack();
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadGoalDetail();
    }, [goalId]);

    // Cargar sugerencias de IA cuando se carga la meta
    useEffect(() => {
        const loadAISuggestions = async () => {
            if (!goal) return;
            
            setAiLoading(true);
            try {
                const recommendation = await AIService.analyzeGoalViability({
                    name: goal.name,
                    targetAmount: goal.targetAmount,
                    category: goal.category.toString(),
                    dueDate: goal.dueDate,
                    description: goal.description
                });
                setAiRecommendation(recommendation);
            } catch (error) {
                console.error('Error loading AI suggestions:', error);
                // En caso de error, ocultar la tarjeta de IA
                setAiRecommendation(null);
            } finally {
                setAiLoading(false);
            }
        };

        loadAISuggestions();
    }, [goal?.id]);

    const handleUpdate = async () => {
        if (!editName || !editTarget) {
            Alert.alert("Error", "Nombre y meta son obligatorios.");
            return;
        }
        try {
            await GoalService.updateGoal(goalId, {
                ...goal!,
                name: editName,
                targetAmount: parseFloat(editTarget),
                dueDate: editDate,
                category: editCategory as any,
            });
            setEditModalVisible(false);
            Alert.alert("Actualizado", "Meta modificada correctamente.");
            loadGoalDetail();
        } catch (error: any) {
            Alert.alert("Error", error.response?.data?.message || "No se pudo actualizar.");
        }
    };

    const handleDelete = () => {
        Alert.alert(
            "Eliminar Meta",
            "¿Estás seguro? Se perderá todo el historial.",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar", style: "destructive",
                    onPress: async () => {
                        try {
                            await GoalService.deleteGoal(goalId);
                            Alert.alert("Eliminado", "Meta eliminada.");
                            navigation.goBack();
                        } catch (e) { Alert.alert("Error", "No se pudo eliminar."); }
                    }
                }
            ]
        );
    };

    const handleTransaction = async () => {
        if (!amount || parseFloat(amount) <= 0) return;
        try {
            if (mode === 'deposit') await GoalService.deposit(goalId, parseFloat(amount));
            else await GoalService.withdraw(goalId, parseFloat(amount));

            setTransactionModalVisible(false);
            setAmount('');
            Alert.alert("¡Éxito!", mode === 'deposit' ? "Abono realizado." : "Retiro realizado.");
            loadGoalDetail();
        } catch (error: any) {
            Alert.alert("Error", error.response?.data?.message || "Error en transacción.");
        }
    };

    if (loading || !goal) return <ActivityIndicator size="large" color={colors.primary} style={{marginTop: 50}} />;

    const saved = goal.savedAmount || 0;
    const target = goal.targetAmount || 1;
    const progress = Math.min(saved / target, 1);

    return (
        <View style={globalStyles.screenContainer}>
            <HeaderWithBack title="Detalle de Meta" onBackPress={() => navigation.goBack()} />

            <ScrollView contentContainerStyle={{ padding: 20 }}>
                {/* TARJETA RESUMEN */}
                <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 16, elevation: 4, marginBottom: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontSize: 22, fontWeight: 'bold', color: colors.textPrimary, flex: 1 }}>{goal.name}</Text>
                        <View style={{ backgroundColor: goal.status === 'COMPLETED' ? colors.backgroundLight : '#F0F0F0', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 }}>
                            <Text style={{ color: goal.status === 'COMPLETED' ? colors.success : '#666', fontSize: 12, fontWeight: 'bold' }}>{goal.status}</Text>
                        </View>
                    </View>
                    <Text style={{ color: colors.textSecondary, marginBottom: 15, fontSize: 12 }}>{goal.description || 'Sin descripción'} • {goal.dueDate || 'Sin fecha'}</Text>

                    <Text style={{ fontSize: 32, fontWeight: 'bold', color: colors.primary, textAlign: 'center', marginVertical: 10 }}>
                        ${saved.toLocaleString()}
                    </Text>
                    <Text style={{ textAlign: 'center', color: '#999', marginBottom: 20 }}>de ${target.toLocaleString()}</Text>

                    <View style={{ height: 12, backgroundColor: '#EEE', borderRadius: 6, overflow: 'hidden', marginBottom: 5 }}>
                        <View style={{ width: `${progress * 100}%`, height: '100%', backgroundColor: colors.primary }} />
                    </View>
                    <Text style={{ textAlign: 'right', color: colors.primary, fontWeight: 'bold' }}>{(progress * 100).toFixed(1)}%</Text>

                    <View style={{ flexDirection: 'row', marginTop: 20, gap: 10 }}>
                        <TouchableOpacity onPress={() => { setMode('deposit'); setTransactionModalVisible(true); }} style={{ flex: 1, backgroundColor: colors.primary, padding: 12, borderRadius: 10, alignItems: 'center' }}>
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>+ Abonar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { setMode('withdraw'); setTransactionModalVisible(true); }} style={{ flex: 1, backgroundColor: 'white', borderWidth: 1, borderColor: colors.expense, padding: 12, borderRadius: 10, alignItems: 'center' }}>
                            <Text style={{ color: colors.expense, fontWeight: 'bold' }}>- Retirar</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* SUGERENCIAS DE IA */}
                <AISuggestionCard 
                    recommendation={aiRecommendation?.message || null}
                    loading={aiLoading}
                    isViable={aiRecommendation?.isViable}
                    suggestedMonthlyAmount={aiRecommendation?.suggestedMonthlyAmount}
                    tips={aiRecommendation?.tips}
                    style={{ marginBottom: 20 }}
                />

                {/* BOTONES DE EDICIÓN */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 }}>
                    <TouchableOpacity onPress={() => setEditModalVisible(true)} style={{ flex: 0.48, backgroundColor: '#F0F4FF', padding: 15, borderRadius: 12, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 8 }}>
                        <Text style={{ fontSize: 18 }}>✏️</Text>
                        <Text style={{ color: colors.secondary, fontWeight: 'bold' }}>Editar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleDelete} style={{ flex: 0.48, backgroundColor: '#FFF0F0', padding: 15, borderRadius: 12, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 8 }}>
                        <Text style={{ fontSize: 18 }}>🗑️</Text>
                        <Text style={{ color: colors.expense, fontWeight: 'bold' }}>Eliminar</Text>
                    </TouchableOpacity>
                </View>

                {/* HISTORIAL */}
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.textPrimary, marginBottom: 10 }}>Historial</Text>
                {history.length === 0 ? (
                    <Text style={{ textAlign: 'center', color: '#999', marginTop: 10, fontStyle: 'italic' }}>No hay movimientos aún.</Text>
                ) : (
                    history.map((tx) => (
                        <View key={tx.id} style={{ backgroundColor: 'white', padding: 15, borderRadius: 12, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View>
                                <Text style={{ fontWeight: 'bold', color: '#333' }}>{tx.type === 'DEPOSIT' ? 'Abono' : 'Retiro'}</Text>
                                <Text style={{ fontSize: 12, color: '#999' }}>{new Date(tx.date).toLocaleDateString()}</Text>
                            </View>
                            <Text style={{ fontWeight: 'bold', fontSize: 16, color: tx.type === 'DEPOSIT' ? colors.success : colors.expense }}>
                                {tx.type === 'DEPOSIT' ? '+' : '-'}${tx.amount.toLocaleString()}
                            </Text>
                        </View>
                    ))
                )}
            </ScrollView>

            {/* MODAL TRANSACCIÓN */}
            <Modal visible={transactionModalVisible} transparent animationType="fade">
                <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)', padding: 20 }}>
                    <View style={{ backgroundColor: 'white', padding: 24, borderRadius: 16 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' }}>{mode === 'deposit' ? 'Abonar' : 'Retirar'}</Text>
                        <TextInput value={amount} onChangeText={setAmount} placeholder="Monto" keyboardType="numeric" autoFocus style={{ borderWidth: 1, borderColor: colors.border, borderRadius: 8, padding: 12, marginBottom: 20, fontSize: 20, textAlign: 'center' }} />
                        <View style={{ flexDirection: 'row', gap: 10 }}>
                            <TouchableOpacity onPress={() => setTransactionModalVisible(false)} style={{ flex: 1, padding: 12, alignItems: 'center' }}><Text style={{ color: '#666' }}>Cancelar</Text></TouchableOpacity>
                            <TouchableOpacity onPress={handleTransaction} style={{ flex: 1, backgroundColor: colors.primary, padding: 12, borderRadius: 8, alignItems: 'center' }}><Text style={{ color: 'white', fontWeight: 'bold' }}>Confirmar</Text></TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* MODAL EDICIÓN */}
            <Modal visible={editModalVisible} transparent animationType="slide">
                <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)', padding: 20 }}>
                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 12 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 15 }}>Editar Meta</Text>

                        <Text style={{marginBottom: 5, color: '#666'}}>Nombre</Text>
                        <TextInput value={editName} onChangeText={setEditName} style={{ borderWidth: 1, borderColor: '#DDD', borderRadius: 8, padding: 10, marginBottom: 10 }} />

                        <Text style={{marginBottom: 5, color: '#666'}}>Meta ($)</Text>
                        <TextInput value={editTarget} onChangeText={setEditTarget} keyboardType="numeric" style={{ borderWidth: 1, borderColor: '#DDD', borderRadius: 8, padding: 10, marginBottom: 10 }} />

                        <Text style={{marginBottom: 5, color: '#666'}}>Fecha Límite</Text>
                        <View style={{ marginBottom: 10 }}>
                            <DatePicker value={editDate} onDateChange={setEditDate} placeholder="Fecha" format="YYYY-MM-DD" />
                        </View>

                        <Text style={{marginBottom: 5, color: '#666'}}>Categoría</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }}>
                            {GOAL_CATEGORIES.map((cat) => (
                                <TouchableOpacity key={cat.value} onPress={() => setEditCategory(cat.value)} style={{ padding: 8, marginRight: 8, borderRadius: 15, backgroundColor: editCategory === cat.value ? colors.primary : '#F0F0F0' }}>
                                    <Text style={{ color: editCategory === cat.value ? 'white' : '#666', fontSize: 12 }}>{cat.label}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 10 }}>
                            <TouchableOpacity onPress={() => setEditModalVisible(false)}><Text style={{ padding: 10, color: '#666' }}>Cancelar</Text></TouchableOpacity>
                            <TouchableOpacity onPress={handleUpdate} style={{ backgroundColor: colors.primary, padding: 10, borderRadius: 8 }}><Text style={{ color: 'white', fontWeight: 'bold' }}>Guardar</Text></TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default GoalDetailScreen;