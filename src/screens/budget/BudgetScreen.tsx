import React from 'react';
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { ScreenTitle } from '../../components';
import { colors, globalStyles } from '../../styles';
import useBudget from './useBudget';
import { useNavigation } from '@react-navigation/native';
// Cálculos para el Grid de 2 columnas
const { width } = Dimensions.get('window');
const CARD_MARGIN = 6;
// (Ancho Pantalla - Padding Contenedor (aprox 20) - Márgenes entre items) / 2
const CARD_WIDTH = (width - 40) / 2 - CARD_MARGIN;

const BudgetScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    const { loading, budgets } = useBudget();

    if (loading) {
        return (
            <View style={[globalStyles.screenContainer, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color="#6C5CE7" />
            </View>
        );
    }

    // Componente de Cabecera (Se renderiza dentro del FlatList para evitar errores de scroll anidado)
    const renderHeader = () => (
        <View style={{ marginBottom: 10 }}>
            <ScreenTitle title="Presupuesto" subtitle="Controla tus límites mensuales" />

            {/* BOTONES DE ACCIÓN PRINCIPALES */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 }}>

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
                    onPress={() => navigation.navigate('NewBudget')}
                    style={{
                        flex: 0.48, backgroundColor: '#F0F4FF',
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

            <Text style={{ fontSize: 20, fontWeight: 'bold', color: colors.textPrimary, marginBottom: 15, marginLeft: 5 }}>
                Mis Presupuestos
            </Text>
        </View>
    );

    // Función de renderizado de tarjeta para Grid
    const renderBudgetItem = ({ item }: { item: any }) => (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate('BudgetDetail', {
                budgetId: item.id,
                categoryId: item.categoryId,
                categoryName: item.title,
                limit: item.limit,
                spent: item.spent
            })}
            style={{
                width: CARD_WIDTH,
                margin: CARD_MARGIN,
                backgroundColor: 'white',
                borderRadius: 16,
                padding: 12,
                elevation: 3,
                shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4,
                borderTopWidth: 4, borderTopColor: item.percentage > 1 ? colors.expense : item.color
            }}
        >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <Text style={{ fontSize: 22 }}>{item.icon}</Text>
                <Text style={{ fontSize: 12, fontWeight: 'bold', color: item.percentage > 1 ? colors.expense : colors.textSecondary }}>
                    {(item.percentage * 100).toFixed(0)}%
                </Text>
            </View>

            <Text style={{ fontSize: 14, fontWeight: 'bold', color: colors.textPrimary }} numberOfLines={1}>
                {item.title}
            </Text>

            <Text style={{ fontSize: 12, color: colors.textSecondary, marginBottom: 8 }}>
                ${item.limit.toLocaleString()}
            </Text>

            {/* Barra Miniatura */}
            <View style={{ height: 4, backgroundColor: '#EEE', borderRadius: 2, overflow:'hidden' }}>
                <View style={{
                    width: `${Math.min(item.percentage * 100, 100)}%`,
                    height: '100%',
                    backgroundColor: item.percentage > 1 ? colors.expense : item.color
                }} />
            </View>

            <Text style={{ fontSize: 10, color: '#999', marginTop: 4 }}>
                Gastado: ${item.spent.toLocaleString()}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View style={globalStyles.screenContainer}>
            <FlatList
                data={budgets}
                keyExtractor={(item) => item.id?.toString() || Math.random().toString()}

                // HEADER: Aquí va todo lo que estaba antes del FlatList
                ListHeaderComponent={renderHeader}

                // GRID CONFIG: 2 columnas verticales
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'flex-start' }} // Alineación
                contentContainerStyle={{ paddingHorizontal: 5, paddingBottom: 100 }}

                renderItem={renderBudgetItem}

                // Empty State
                ListEmptyComponent={
                    <View style={{ alignItems: 'center', marginTop: 50, opacity: 0.6 }}>
                        <Text style={{ fontSize: 40, marginBottom: 10 }}>📉</Text>
                        <Text style={{ color: colors.textSecondary }}>No tienes presupuestos activos.</Text>
                    </View>
                }
            />
        </View>
    );
};

export default BudgetScreen;