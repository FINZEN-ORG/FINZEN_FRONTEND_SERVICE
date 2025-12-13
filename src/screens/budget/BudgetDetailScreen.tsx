import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Alert, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { HeaderWithBack, ExpensesList } from '../../components';
import { globalStyles, colors } from '../../styles';
import TransactionService from '../../services/TransactionService';
import BudgetService from '../../services/BudgetService';
import AIService, { BudgetReview } from '../../services/AIService';

const BudgetDetailScreen: React.FC = () => {
    const route = useRoute<any>();
    const navigation = useNavigation();
    const { budgetId, categoryId, categoryName, limit, spent } = route.params;
    const [expenses, setExpenses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [aiReview, setAiReview] = useState<BudgetReview | null>(null);
    const [aiLoading, setAiLoading] = useState(false);
    const [showAIAnalysis, setShowAIAnalysis] = useState(false);

    useEffect(() => {
        loadExpenses();
        loadAIReview();
    }, [categoryId, categoryName]);

    const loadExpenses = async () => {
        try {
            const all = await TransactionService.getAllTransactions();
            const filtered = all.filter((t: any) =>
                t.categoryId === categoryId && t.type === 'EXPENSE'
            );

            const mapped = filtered.map((t: any) => ({
                id: t.id,
                categoryIcon: '💸',
                description: t.description,
                amount: t.amount,
                date: new Date(t.date).toISOString().split('T')[0],
                category: categoryName
            }));

            setExpenses(mapped);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const loadAIReview = async () => {
        try {
            setAiLoading(true);

            const now = new Date();
            const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
            const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

            const startDate = firstDay.toISOString().split('T')[0];
            const endDate = lastDay.toISOString().split('T')[0];

            const review = await AIService.reviewBudget({
                id: budgetId,
                categoryId: categoryId,
                amount: limit,
                startDate: startDate,
                endDate: endDate
            });

            if (review && !review.error) {
                setAiReview(review);
            }
        } catch (error) {
            console.error('Error loading AI review:', error);
        } finally {
            setAiLoading(false);
        }
    };

    const handleDeleteBudget = () => {
        Alert.alert(
            "Eliminar Presupuesto",
            "¿Estás seguro? Esto eliminará el límite establecido, pero tus gastos históricos se mantendrán.",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await BudgetService.deleteBudget(budgetId);
                            Alert.alert("Éxito", "Presupuesto eliminado.");
                            navigation.goBack();
                        } catch (error) {
                            Alert.alert("Error", "No se pudo eliminar el presupuesto.");
                        }
                    }
                }
            ]
        );
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'bien': return '#22C55E';
            case 'regular': return '#F59E0B';
            case 'mal': return '#EF4444';
            default: return '#999';
        }
    };

    const getStatusEmoji = (status: string) => {
        switch (status) {
            case 'bien': return '✅';
            case 'regular': return '⚠️';
            case 'mal': return '❌';
            default: return '📊';
        }
    };

    const percentage = (spent / limit) * 100;
    const isOverBudget = spent > limit;

    const TrashButton = (
        <TouchableOpacity onPress={handleDeleteBudget} style={styles.trashButton}>
            <Text style={styles.trashIcon}>🗑️</Text>
        </TouchableOpacity>
    );

    return (
        <ScrollView style={globalStyles.screenContainer}>
            <HeaderWithBack
                title={categoryName}
                onBackPress={() => navigation.goBack()}
                rightComponent={TrashButton}
            />

            {/* Card de Resumen */}
            <View style={styles.summaryCard}>
                <Text style={styles.summaryLabel}>Presupuesto Mensual</Text>
                <Text style={styles.summaryAmount}>
                    ${limit.toLocaleString()}
                </Text>

                <View style={styles.summaryRow}>
                    <Text style={[
                        styles.spentText,
                        { color: isOverBudget ? colors.expense : colors.success }
                    ]}>
                        Gastado: ${spent.toLocaleString()}
                    </Text>
                    <Text style={[
                        styles.percentageText,
                        { color: isOverBudget ? colors.expense : '#666' }
                    ]}>
                        {Math.round(percentage)}%
                    </Text>
                </View>

                <View style={styles.progressBar}>
                    <View style={[
                        styles.progressFill,
                        {
                            width: `${Math.min(percentage, 100)}%`,
                            backgroundColor: isOverBudget ? colors.expense : colors.secondary
                        }
                    ]} />
                </View>

                {isOverBudget && (
                    <View style={styles.warningBox}>
                        <Text style={styles.warningText}>
                            ⚠️ Has excedido tu presupuesto en ${(spent - limit).toLocaleString()}
                        </Text>
                    </View>
                )}
            </View>

            {/* Análisis de IA */}
            {aiReview && (
                <View style={styles.aiCard}>
                    <TouchableOpacity
                        onPress={() => setShowAIAnalysis(!showAIAnalysis)}
                        style={styles.aiCardHeader}
                    >
                        <View style={styles.aiHeaderLeft}>
                            <Text style={styles.aiHeaderEmoji}>✨</Text>
                            <Text style={styles.aiHeaderTitle}>Análisis de la IA</Text>
                        </View>
                        <View style={styles.aiHeaderRight}>
                            <View style={[
                                styles.statusBadge,
                                { backgroundColor: getStatusColor(aiReview.status) + '20' }
                            ]}>
                                <Text style={[
                                    styles.statusBadgeText,
                                    { color: getStatusColor(aiReview.status) }
                                ]}>
                                    {getStatusEmoji(aiReview.status)} {aiReview.status.toUpperCase()}
                                </Text>
                            </View>
                            <Text style={styles.expandIcon}>
                                {showAIAnalysis ? '▼' : '▶'}
                            </Text>
                        </View>
                    </TouchableOpacity>

                    {showAIAnalysis && (
                        <View style={styles.aiContent}>
                            <View style={styles.analysisBox}>
                                <Text style={styles.analysisText}>
                                    {aiReview.analysis}
                                </Text>
                            </View>

                            {aiReview.tips && aiReview.tips.length > 0 && (
                                <View style={styles.section}>
                                    <Text style={styles.sectionTitle}>💡 Consejos:</Text>
                                    {aiReview.tips.map((tip, index) => (
                                        <View key={index} style={styles.tipBox}>
                                            <Text style={styles.tipText}>• {tip}</Text>
                                        </View>
                                    ))}
                                </View>
                            )}

                            {aiReview.patterns && aiReview.patterns.length > 0 && (
                                <View style={styles.section}>
                                    <Text style={styles.sectionTitle}>📊 Patrones detectados:</Text>
                                    {aiReview.patterns.map((pattern, index) => (
                                        <Text key={index} style={styles.patternText}>
                                            • {pattern}
                                        </Text>
                                    ))}
                                </View>
                            )}

                            {aiReview.suggested_changes && aiReview.suggested_changes.length > 0 && (
                                <View style={styles.section}>
                                    <Text style={styles.sectionTitle}>🔄 Mejoras sugeridas:</Text>
                                    {aiReview.suggested_changes.map((change, index) => (
                                        <View key={index} style={styles.changeBox}>
                                            <Text style={styles.changeText}>• {change}</Text>
                                        </View>
                                    ))}
                                </View>
                            )}
                        </View>
                    )}
                </View>
            )}

            {aiLoading && (
                <View style={styles.aiLoadingCard}>
                    <ActivityIndicator size="small" color="#D97706" />
                    <Text style={styles.aiLoadingText}>
                        La IA está analizando tu presupuesto...
                    </Text>
                </View>
            )}

            {/* Historial de Gastos */}
            <View style={styles.expensesSection}>
                <Text style={styles.expensesTitle}>Historial de Gastos</Text>

                {loading ? (
                    <ActivityIndicator color={colors.primary} />
                ) : expenses.length > 0 ? (
                    <ExpensesList expenses={expenses} onExpensePress={() => {}} />
                ) : (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyEmoji}>📭</Text>
                        <Text style={styles.emptyText}>
                            No hay gastos registrados en esta categoría.
                        </Text>
                    </View>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    trashButton: {
        padding: 5,
    },

    trashIcon: {
        fontSize: 24,
    },

    // Summary Card
    summaryCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        margin: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },

    summaryLabel: {
        color: '#666',
        fontSize: 12,
    },

    summaryAmount: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.textPrimary,
        marginTop: 4,
    },

    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
    },

    spentText: {
        flex: 1,
        fontWeight: 'bold',
        fontSize: 16,
    },

    percentageText: {
        fontWeight: 'bold',
        fontSize: 18,
    },

    progressBar: {
        height: 8,
        backgroundColor: '#E0E0E0',
        borderRadius: 4,
        marginTop: 10,
        overflow: 'hidden',
    },

    progressFill: {
        height: '100%',
    },

    warningBox: {
        backgroundColor: '#FEE2E2',
        borderRadius: 8,
        padding: 12,
        marginTop: 15,
        borderWidth: 1,
        borderColor: '#FCA5A5',
    },

    warningText: {
        fontSize: 12,
        color: '#991B1B',
        fontWeight: '600',
    },

    // AI Card
    aiCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        marginHorizontal: 16,
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },

    aiCardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    aiHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    aiHeaderEmoji: {
        fontSize: 20,
        marginRight: 8,
    },

    aiHeaderTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.textPrimary,
    },

    aiHeaderRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
        marginRight: 8,
    },

    statusBadgeText: {
        fontWeight: 'bold',
        fontSize: 12,
    },

    expandIcon: {
        fontSize: 18,
        color: '#999',
    },

    aiContent: {
        marginTop: 15,
    },

    analysisBox: {
        backgroundColor: '#F9FAFB',
        borderRadius: 8,
        padding: 12,
        marginBottom: 15,
    },

    analysisText: {
        fontSize: 13,
        color: colors.textPrimary,
        lineHeight: 18,
    },

    section: {
        marginBottom: 15,
    },

    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.textPrimary,
        marginBottom: 8,
    },

    tipBox: {
        backgroundColor: '#ECFDF5',
        borderRadius: 8,
        padding: 10,
        marginBottom: 8,
        borderLeftWidth: 3,
        borderLeftColor: '#10B981',
    },

    tipText: {
        fontSize: 12,
        color: '#065F46',
        lineHeight: 16,
    },

    patternText: {
        fontSize: 12,
        color: '#78350F',
        marginBottom: 4,
        paddingLeft: 10,
    },

    changeBox: {
        backgroundColor: '#EFF6FF',
        borderRadius: 8,
        padding: 10,
        marginBottom: 8,
        borderLeftWidth: 3,
        borderLeftColor: '#3B82F6',
    },

    changeText: {
        fontSize: 12,
        color: '#1E40AF',
        lineHeight: 16,
    },

    aiLoadingCard: {
        backgroundColor: '#FFF8E7',
        borderRadius: 12,
        padding: 15,
        marginHorizontal: 16,
        marginBottom: 16,
        alignItems: 'center',
    },

    aiLoadingText: {
        fontSize: 12,
        color: '#92400E',
        marginTop: 8,
    },

    // Expenses Section
    expensesSection: {
        flex: 1,
        marginHorizontal: 16,
    },

    expensesTitle: {
        fontWeight: 'bold',
        marginBottom: 10,
        color: colors.textPrimary,
        fontSize: 16,
    },

    emptyState: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 30,
        alignItems: 'center',
    },

    emptyEmoji: {
        fontSize: 40,
        marginBottom: 10,
    },

    emptyText: {
        textAlign: 'center',
        color: '#999',
    },
});

export default BudgetDetailScreen;