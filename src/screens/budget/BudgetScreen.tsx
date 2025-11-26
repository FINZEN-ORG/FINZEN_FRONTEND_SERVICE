import React from 'react';
import {View, Text, ActivityIndicator, FlatList, TouchableOpacity} from 'react-native';
import {
    ScreenTitle,
    SectionSubtitle,
    ExpensesList,
} from '../../components';
import {colors, globalStyles} from '../../styles';
import useBudget from './useBudget';
import { useNavigation } from '@react-navigation/native';

const BudgetScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    const { loading, budgets, expenses } = useBudget();

    if (loading) {
        return (
            <View style={[globalStyles.screenContainer, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color="#6C5CE7" />
            </View>
        );
    }

    return (
        <View style={globalStyles.screenContainer}>
            <ScreenTitle title="Presupuesto" subtitle="Controla tus límites mensuales" />

            {/* BOTONES DE ACCIÓN PRINCIPALES */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, marginBottom: 20 }}>

                {/* Opción A: Crear Categoría (Suelta) */}
                <TouchableOpacity
                    onPress={() => navigation.navigate('NewCategory')}
                    style={{
                        flex: 0.48, backgroundColor: colors.backgroundLightest,
                        padding: 15, borderRadius: 12, alignItems: 'center',
                        borderWidth: 1, borderColor: colors.border
                    }}
                >
                    <Text style={{ fontSize: 24 }}>🏷️</Text>
                    <Text style={{ color: colors.primaryDark, fontWeight: 'bold', marginTop: 5 }}>
                        Nueva Categoría
                    </Text>
                </TouchableOpacity>

                {/* Opción B: Crear Presupuesto (Asociar categoría a monto) */}
                <TouchableOpacity
                    onPress={() => navigation.navigate('NewBudget')} // Vamos a la nueva pantalla
                    style={{
                        flex: 0.48, backgroundColor: '#F0F4FF', // Un azulito claro o usar colors.backgroundSoft
                        padding: 15, borderRadius: 12, alignItems: 'center',
                        borderWidth: 1, borderColor: '#E0E0FF'
                    }}
                >
                    <Text style={{ fontSize: 24 }}>📊</Text>
                    <Text style={{ color: '#6C5CE7', fontWeight: 'bold', marginTop: 5 }}>
                        Nuevo Presupuesto
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Sección de Presupuestos (Barras de Progreso) */}
            <SectionSubtitle text="Mis Presupuestos" marginTop={true} />

            <FlatList
                data={budgets}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
                renderItem={({ item }) => (
                    <View style={{
                        width: 160,
                        height: 140,
                        backgroundColor: 'white',
                        borderRadius: 12,
                        padding: 12,
                        marginRight: 10,
                        elevation: 2
                    }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 24 }}>{item.icon}</Text>
                            <Text style={{ fontWeight: 'bold' }}>${item.limit}</Text>
                        </View>
                        <Text style={{ marginTop: 8, fontWeight: '600' }}>{item.title}</Text>

                        <View style={{ marginTop: 15 }}>
                            <Text style={{ fontSize: 10, color: '#666' }}>Gastado: ${item.spent}</Text>
                            {/* Barra de progreso simple */}
                            <View style={{
                                height: 6,
                                backgroundColor: '#EEE',
                                borderRadius: 3,
                                marginTop: 4
                            }}>
                                <View style={{
                                    width: `${Math.min(item.percentage * 100, 100)}%`,
                                    height: '100%',
                                    backgroundColor: item.percentage > 1 ? 'red' : item.color,
                                    borderRadius: 3
                                }} />
                            </View>
                        </View>
                    </View>
                )}
                contentContainerStyle={{ paddingHorizontal: 5, paddingBottom: 10 }}
            />

            <SectionSubtitle text="Gastos Recientes" marginTop={true} />
            <ExpensesList expenses={expenses} onExpensePress={() => {}} />
        </View>
    );
};
export default BudgetScreen;