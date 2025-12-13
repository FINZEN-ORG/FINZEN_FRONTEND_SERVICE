import React from 'react';
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { ScreenTitle } from '../../components';
import { colors, globalStyles } from '../../styles';
import { budgetStyles } from './BudgetScreen.Style';
import useBudget from './useBudget';
import { useNavigation } from '@react-navigation/native';

const BudgetScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    const { loading, budgets } = useBudget();

    if (loading) {
        return (
            <View style={[globalStyles.screenContainer, budgetStyles.centerContainer]}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    const renderHeader = () => (
        <View style={budgetStyles.headerContainer}>
            <ScreenTitle title="Presupuesto" subtitle="Controla tus límites mensuales" />

            {/* BOTONES DE ACCIÓN */}
            <View style={budgetStyles.actionButtons}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('NewCategory')}
                    style={budgetStyles.categoryButton}
                >
                    <Text style={budgetStyles.buttonEmoji}>🏷️</Text>
                    <Text style={budgetStyles.categoryButtonText}>
                        Nueva Categoría
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('NewBudget')}
                    style={budgetStyles.budgetButton}
                >
                    <Text style={budgetStyles.buttonEmoji}>📊</Text>
                    <Text style={budgetStyles.budgetButtonText}>
                        Nuevo Presupuesto
                    </Text>
                </TouchableOpacity>
            </View>

            <Text style={budgetStyles.sectionTitle}>
                Mis Presupuestos
            </Text>
        </View>
    );

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
            style={[
                budgetStyles.budgetCard,
                { borderTopColor: item.percentage > 1 ? colors.expense : item.color }
            ]}
        >
            <View style={budgetStyles.budgetCardHeader}>
                <Text style={budgetStyles.budgetCardEmoji}>{item.icon}</Text>
                <Text style={[
                    budgetStyles.budgetCardPercentage,
                    { color: item.percentage > 1 ? colors.expense : colors.textSecondary }
                ]}>
                    {(item.percentage * 100).toFixed(0)}%
                </Text>
            </View>

            <Text style={budgetStyles.budgetCardTitle} numberOfLines={1}>
                {item.title}
            </Text>

            <Text style={budgetStyles.budgetCardLimit}>
                ${item.limit.toLocaleString()}
            </Text>

            <View style={budgetStyles.budgetProgressBar}>
                <View style={[
                    budgetStyles.budgetProgressFill,
                    {
                        width: `${Math.min(item.percentage * 100, 100)}%`,
                        backgroundColor: item.percentage > 1 ? colors.expense : item.color
                    }
                ]} />
            </View>

            <Text style={budgetStyles.budgetCardSpent}>
                Gastado: ${item.spent.toLocaleString()}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View style={globalStyles.screenContainer}>
            <FlatList
                data={budgets}
                keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
                ListHeaderComponent={renderHeader}
                numColumns={2}
                columnWrapperStyle={budgetStyles.columnWrapper}
                contentContainerStyle={budgetStyles.flatListContent}
                renderItem={renderBudgetItem}
                ListEmptyComponent={
                    <View style={budgetStyles.emptyState}>
                        <Text style={budgetStyles.emptyStateEmoji}>📉</Text>
                        <Text style={budgetStyles.emptyStateText}>
                            No tienes presupuestos activos.
                        </Text>
                        <Text style={budgetStyles.emptyStateSubtext}>
                            Crea uno para empezar a controlar tus gastos.
                        </Text>
                    </View>
                }
            />
        </View>
    );
};

export default BudgetScreen;