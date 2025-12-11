import React, { useState, useCallback, useEffect } from 'react';
import { Modal, TextInput, View, Text, TouchableOpacity, FlatList, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GoalService, { GoalDto } from '../../services/GoalService';
import AIService, { AIRecommendation } from '../../services/AIService';
import { globalStyles } from '../../styles';
import { ScreenTitle, AISuggestionCard, DatePicker } from '../../components';
import { colors } from '../../styles/colors';

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

    // Estado para sugerencias de IA
    const [aiRecommendation, setAiRecommendation] = useState<AIRecommendation | null>(null);
    const [aiLoading, setAiLoading] = useState(false);

    // Estado para descubrir nueva meta sugerida por IA
    const [aiSuggestedGoal, setAiSuggestedGoal] = useState<any>(null);
    const [aiSuggestionLoading, setAiSuggestionLoading] = useState(false);
    const [showSuggestedGoalCard, setShowSuggestedGoalCard] = useState(false);

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

    useFocusEffect(useCallback(() => { 
        loadGoals();
        loadAISuggestedGoal();
        
        // 🔍 DEBUG: Imprimir token en consola
        AsyncStorage.getItem('jwt').then(token => {
            console.log('🔑 JWT TOKEN:', token);
            console.log('📋 Para copiar:', token ? token.substring(0, 50) + '...' : 'No token found');
        });
    }, []));

    // Cargar sugerencia de nueva meta de la IA
    const loadAISuggestedGoal = async () => {
        try {
            setAiSuggestionLoading(true);
            console.log('🤖 Intentando cargar sugerencia de IA...');
            const suggestion = await AIService.suggestNewGoal();
            
            console.log('✅ Sugerencia recibida:', suggestion);
            
            if (suggestion) {
                // Parsear la sugerencia para extraer datos de la meta
                const parsed = parseAISuggestion(suggestion);
                console.log('📝 Sugerencia parseada:', parsed);
                
                if (parsed) {
                    setAiSuggestedGoal(parsed);
                    setShowSuggestedGoalCard(true);
                } else {
                    console.log('⚠️ No se pudo parsear la sugerencia');
                }
            } else {
                console.log('⚠️ No se recibió sugerencia de la IA');
            }
        } catch (error) {
            console.error('❌ Error loading AI suggested goal:', error);
            // Ocultar card si hay error
            setShowSuggestedGoalCard(false);
            setAiSuggestedGoal(null);
        } finally {
            setAiSuggestionLoading(false);
        }
    };

    // Parsear sugerencia de IA para extraer datos estructurados
    const parseAISuggestion = (suggestion: string): any => {
        // Intentar extraer información de la sugerencia
        // Formato esperado: "¡Ahorra para tu próximo viaje! Te sugerimos..."
        try {
            return {
                message: suggestion,
                suggestedName: extractGoalName(suggestion),
                suggestedAmount: extractAmount(suggestion),
                suggestedCategory: extractCategory(suggestion)
            };
        } catch {
            return null;
        }
    };

    const extractGoalName = (text: string): string => {
        // Buscar patrones como "para tu [algo]", "para un/una [algo]"
        const patterns = [
            /para tu (?:próximo |siguiente )?([^!.,]+)/i,
            /para un(?:a)? ([^!.,]+)/i,
            /(?:ahorra|crea|considera) (?:para )?([^!.,]+)/i
        ];
        
        for (const pattern of patterns) {
            const match = text.match(pattern);
            if (match) return match[1].trim();
        }
        return 'Nueva meta sugerida';
    };

    const extractAmount = (text: string): number => {
        // Buscar montos en el texto
        const match = text.match(/\$([\d,]+)/i);
        return match ? parseFloat(match[1].replace(/,/g, '')) : 0;
    };

    const extractCategory = (text: string): string => {
        const lowerText = text.toLowerCase();
        if (lowerText.includes('viaje')) return 'TRAVEL';
        if (lowerText.includes('emergencia')) return 'EMERGENCY_FUND';
        if (lowerText.includes('educación') || lowerText.includes('estudio')) return 'EDUCATION';
        if (lowerText.includes('tecnología') || lowerText.includes('computador')) return 'TECHNOLOGY';
        if (lowerText.includes('vehículo') || lowerText.includes('carro')) return 'VEHICLE';
        if (lowerText.includes('hogar') || lowerText.includes('casa')) return 'HOME';
        if (lowerText.includes('inversión')) return 'INVESTMENT';
        return 'OTHER';
    };

    // Aceptar sugerencia de IA y pre-llenar el formulario
    const handleAcceptAISuggestion = () => {
        if (aiSuggestedGoal) {
            setNewGoalName(aiSuggestedGoal.suggestedName || '');
            setNewGoalTarget(aiSuggestedGoal.suggestedAmount?.toString() || '');
            setNewGoalCategory(aiSuggestedGoal.suggestedCategory || 'OTHER');
            setShowSuggestedGoalCard(false);
            setCreateModalVisible(true);
        }
    };

    // Solicitar análisis de IA cuando se completen los campos
    useEffect(() => {
        const shouldAnalyze = newGoalName && newGoalTarget && parseFloat(newGoalTarget) > 0;
        
        if (shouldAnalyze) {
            const timeoutId = setTimeout(async () => {
                setAiLoading(true);
                try {
                    const recommendation = await AIService.analyzeGoalViability({
                        name: newGoalName,
                        targetAmount: parseFloat(newGoalTarget),
                        category: newGoalCategory,
                        dueDate: newGoalDate
                    });
                    setAiRecommendation(recommendation);
                } catch (error) {
                    console.error('Error getting AI recommendation:', error);
                    // En caso de error, ocultar la tarjeta de IA
                    setAiRecommendation(null);
                } finally {
                    setAiLoading(false);
                }
            }, 1000); // Esperar 1 segundo después de que el usuario termine de escribir

            return () => clearTimeout(timeoutId);
        } else {
            setAiRecommendation(null);
            setAiLoading(false);
        }
    }, [newGoalName, newGoalTarget, newGoalCategory, newGoalDate]);

    const handleCreateGoal = async () => {
        if (!newGoalName || !newGoalTarget || !newGoalDate) {
            Alert.alert("Atención", "Por favor completa todos los campos.");
            return;
        }

        try {
            console.log('📤 Creando meta:', {
                name: newGoalName,
                targetAmount: parseFloat(newGoalTarget),
                category: newGoalCategory,
                dueDate: newGoalDate
            });

            await GoalService.createGoal({
                name: newGoalName,
                targetAmount: parseFloat(newGoalTarget),
                category: newGoalCategory as any,
                dueDate: newGoalDate,
                description: 'Meta creada desde app',
                status: 'ACTIVE'
            });

            console.log('✅ Meta creada exitosamente');
            setCreateModalVisible(false);
            // Reset fields
            setNewGoalName(''); setNewGoalTarget(''); setNewGoalDate(''); setNewGoalCategory('OTHER');
            setAiRecommendation(null);

            loadGoals();
            Alert.alert('¡Éxito!', 'Meta creada.');
        } catch (error: any) {
            console.error('❌ Error creando meta:', error);
            console.error('📋 Detalles del error:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            
            const msg = error.response?.data?.message || error.message || 'No se pudo crear la meta.';
            Alert.alert('Error creando meta', msg);
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

            {/* Card de sugerencia de nueva meta de la IA */}
            {showSuggestedGoalCard && aiSuggestedGoal && (
                <View style={{
                    backgroundColor: '#FFF8E7',
                    borderRadius: 12,
                    padding: 16,
                    marginHorizontal: 5,
                    marginBottom: 20,
                    borderWidth: 1.5,
                    borderColor: '#FFD966',
                    borderStyle: 'dashed',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 3,
                    elevation: 2
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                        <Text style={{ fontSize: 20, marginRight: 8 }}>✨</Text>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#D97706' }}>Sugerencias de la IA</Text>
                    </View>

                    <Text style={{ fontSize: 14, color: '#78350F', lineHeight: 20, marginBottom: 15 }}>
                        {aiSuggestedGoal.message}
                    </Text>

                    {aiSuggestedGoal.suggestedName && (
                        <View style={{
                            backgroundColor: 'rgba(217, 119, 6, 0.1)',
                            borderRadius: 8,
                            padding: 12,
                            marginBottom: 15
                        }}>
                            <Text style={{ fontSize: 12, color: '#92400E', marginBottom: 4 }}>📝 Meta sugerida:</Text>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#D97706' }}>
                                {aiSuggestedGoal.suggestedName}
                            </Text>
                            {aiSuggestedGoal.suggestedAmount > 0 && (
                                <Text style={{ fontSize: 14, color: '#78350F', marginTop: 4 }}>
                                    Monto: ${aiSuggestedGoal.suggestedAmount.toLocaleString()}
                                </Text>
                            )}
                        </View>
                    )}

                    <View style={{ flexDirection: 'row', gap: 10 }}>
                        <TouchableOpacity
                            onPress={() => setShowSuggestedGoalCard(false)}
                            style={{
                                flex: 1,
                                padding: 12,
                                borderRadius: 8,
                                backgroundColor: 'white',
                                borderWidth: 1,
                                borderColor: '#D97706',
                                alignItems: 'center'
                            }}
                        >
                            <Text style={{ color: '#D97706', fontWeight: '600' }}>Ahora no</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleAcceptAISuggestion}
                            style={{
                                flex: 1,
                                padding: 12,
                                borderRadius: 8,
                                backgroundColor: '#D97706',
                                alignItems: 'center'
                            }}
                        >
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>Crear meta con IA</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

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
                    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                        <View style={{ backgroundColor: 'white', padding: 24, borderRadius: 16, maxHeight: '90%' }}>
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
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
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

                        {/* Sugerencias de IA */}
                        <AISuggestionCard 
                            recommendation={aiRecommendation?.message || null}
                            loading={aiLoading}
                            isViable={aiRecommendation?.isViable}
                            suggestedMonthlyAmount={aiRecommendation?.suggestedMonthlyAmount}
                            tips={aiRecommendation?.tips}
                        />

                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 10, marginTop: 20 }}>
                            <TouchableOpacity onPress={() => setCreateModalVisible(false)} style={{ padding: 12 }}>
                                <Text style={{ color: '#666', fontWeight: '600' }}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleCreateGoal} style={{ backgroundColor: colors.primary, paddingVertical: 12, paddingHorizontal: 20, borderRadius: 10 }}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>Crear Meta</Text>
                            </TouchableOpacity>
                        </View>
                        </View>
                    </ScrollView>
                </View>
            </Modal>
        </View>
    );
};

export default GoalsScreen;