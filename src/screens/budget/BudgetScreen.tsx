import React from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import {
    ScreenTitle,
    SectionSubtitle,
    ExpensesList,
} from '../../components';
import { globalStyles } from '../../styles';
import useBudget from './useBudget';

const BudgetScreen: React.FC = () => {
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