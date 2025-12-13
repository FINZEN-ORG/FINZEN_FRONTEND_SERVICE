import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { HeaderWithBack } from '../../components';
import { globalStyles } from '../../styles';
import { colors } from '../../styles/colors';
import CategoryService, { CategoryDto } from '../../services/CategoryService';
import BudgetService from '../../services/BudgetService';

const NewBudgetScreen: React.FC = () => {
    const navigation = useNavigation();
    const route = useRoute<any>();

    const {
        categoryId: preselectedCategoryId,
        categoryName: preselectedCategoryName,
        suggestedAmount,
        startDate: suggestedStartDate,
        endDate: suggestedEndDate,
        aiTip
    } = route.params || {};

    const [amount, setAmount] = useState(suggestedAmount?.toString() || '');
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
        preselectedCategoryId || null
    );
    const [categories, setCategories] = useState<CategoryDto[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadCats = async () => {
            try {
                const data = await CategoryService.getCategoriesByType('EXPENSE');
                setCategories(data);
            } catch (e) {
                console.error(e);
            }
        };
        loadCats();
    }, []);

    const handleCreate = async () => {
        if (!selectedCategoryId) {
            Alert.alert("Atención", "Selecciona una categoría");
            return;
        }

        if (!amount || parseFloat(amount) <= 0) {
            Alert.alert("Atención", "Ingresa un monto válido");
            return;
        }

        try {
            setLoading(true);

            await BudgetService.createOrUpdateBudget({
                categoryId: selectedCategoryId,
                amount: parseFloat(amount),
            } as any);

            Alert.alert(
                "¡Éxito!",
                "Presupuesto asignado correctamente.",
                [{ text: "OK", onPress: () => navigation.goBack() }]
            );
        } catch (error: any) {
            console.error('Error creating budget:', error);
            Alert.alert(
                "Error",
                error.response?.data?.message || "No se pudo guardar el presupuesto."
            );
        } finally {
            setLoading(false);
        }
    };

    const renderCategoryItem = ({ item }: { item: any }) => {
        const isSelected = selectedCategoryId === item.id;
        const isPreselected = preselectedCategoryId === item.id;

        return (
            <TouchableOpacity
                onPress={() => setSelectedCategoryId(item.id)}
                style={[
                    styles.categoryItem,
                    isSelected && styles.categoryItemSelected,
                    isPreselected && styles.categoryItemPreselected,
                ]}
            >
                <Text style={styles.categoryIcon}>{item.icon || '📦'}</Text>
                <Text
                    style={[
                        styles.categoryName,
                        isPreselected && styles.categoryNamePreselected
                    ]}
                    numberOfLines={1}
                >
                    {item.name}
                </Text>
                {isPreselected && (
                    <Text style={styles.aiBadge}>✨ Sugerida por IA</Text>
                )}
            </TouchableOpacity>
        );
    };

    return (
        <View style={globalStyles.screenContainer}>
            <HeaderWithBack
                title="Nuevo Presupuesto"
                onBackPress={() => navigation.goBack()}
            />

            <FlatList
                data={categories}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                renderItem={renderCategoryItem}
                contentContainerStyle={styles.listContainer}

                ListHeaderComponent={
                    <View style={styles.header}>
                        {preselectedCategoryId && suggestedAmount && (
                            <View style={styles.aiBanner}>
                                <View style={styles.aiBannerHeader}>
                                    <Text style={styles.aiBannerEmoji}>✨</Text>
                                    <Text style={styles.aiBannerTitle}>
                                        Sugerencia de la IA
                                    </Text>
                                </View>
                                <Text style={styles.aiBannerText}>
                                    La IA recomienda un presupuesto de{' '}
                                    <Text style={styles.aiBannerAmount}>
                                        ${Math.round(suggestedAmount).toLocaleString()}
                                    </Text>
                                    {' '}para {preselectedCategoryName}.
                                </Text>
                                {aiTip && (
                                    <View style={styles.aiTipBox}>
                                        <Text style={styles.aiTipLabel}>💡 Consejo:</Text>
                                        <Text style={styles.aiTipText}>{aiTip}</Text>
                                    </View>
                                )}
                            </View>
                        )}

                        <Text style={styles.sectionTitle}>
                            1. Elige una categoría
                        </Text>
                    </View>
                }

                ListFooterComponent={
                    <View style={styles.footer}>
                        <Text style={styles.sectionTitle}>
                            2. Límite Mensual
                        </Text>

                        <TextInput
                            style={[
                                styles.amountInput,
                                suggestedAmount && styles.amountInputHighlighted
                            ]}
                            placeholder={suggestedAmount
                                ? `Sugerido: $${Math.round(suggestedAmount).toLocaleString()}`
                                : "$0.00"
                            }
                            placeholderTextColor={suggestedAmount ? '#D97706' : '#999'}
                            keyboardType="numeric"
                            value={amount}
                            onChangeText={setAmount}
                        />

                        {suggestedStartDate && suggestedEndDate && (
                            <View style={styles.periodBox}>
                                <Text style={styles.periodLabel}>📅 Período sugerido:</Text>
                                <Text style={styles.periodValue}>
                                    {suggestedStartDate} al {suggestedEndDate}
                                </Text>
                            </View>
                        )}

                        <TouchableOpacity
                            onPress={handleCreate}
                            disabled={loading}
                            style={[
                                styles.createButton,
                                loading && styles.createButtonDisabled
                            ]}
                        >
                            <Text style={styles.createButtonText}>
                                {loading ? 'Creando...' : 'Crear Presupuesto'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    listContainer: {
        padding: 20,
    },

    header: {
        marginBottom: 15,
    },

    // Banner de IA
    aiBanner: {
        backgroundColor: '#FFF8E7',
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#FFD966',
    },

    aiBannerHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },

    aiBannerEmoji: {
        fontSize: 18,
        marginRight: 8,
    },

    aiBannerTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#D97706',
    },

    aiBannerText: {
        fontSize: 13,
        color: '#78350F',
        lineHeight: 18,
    },

    aiBannerAmount: {
        fontWeight: 'bold',
    },

    aiTipBox: {
        backgroundColor: 'rgba(217, 119, 6, 0.1)',
        borderRadius: 8,
        padding: 10,
        marginTop: 10,
    },

    aiTipLabel: {
        fontSize: 11,
        color: '#92400E',
        marginBottom: 4,
    },

    aiTipText: {
        fontSize: 12,
        color: '#78350F',
        lineHeight: 16,
    },

    // Títulos de sección
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: colors.textPrimary,
    },

    // Items de categoría
    categoryItem: {
        flex: 1,
        margin: 5,
        aspectRatio: 1,
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: colors.border,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
    },

    categoryItemSelected: {
        backgroundColor: colors.backgroundLight,
        borderColor: colors.primary,
    },

    categoryItemPreselected: {
        backgroundColor: '#FFF8E7',
        borderColor: '#FFD966',
    },

    categoryIcon: {
        fontSize: 24,
    },

    categoryName: {
        fontSize: 12,
        textAlign: 'center',
        marginTop: 5,
    },

    categoryNamePreselected: {
        fontWeight: 'bold',
        color: '#D97706',
    },

    aiBadge: {
        fontSize: 10,
        color: '#D97706',
        marginTop: 2,
    },

    // Footer
    footer: {
        marginTop: 20,
    },

    amountInput: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        fontSize: 18,
        borderWidth: 1,
        borderColor: colors.border,
        color: colors.textPrimary,
    },

    amountInputHighlighted: {
        borderColor: '#FFD966',
    },

    periodBox: {
        backgroundColor: '#F0F9FF',
        borderRadius: 8,
        padding: 12,
        marginTop: 15,
        borderWidth: 1,
        borderColor: '#BAE6FD',
    },

    periodLabel: {
        fontSize: 12,
        color: '#0369A1',
        marginBottom: 4,
    },

    periodValue: {
        fontSize: 13,
        color: '#075985',
        fontWeight: '600',
    },

    createButton: {
        backgroundColor: colors.primary,
        padding: 15,
        borderRadius: 30,
        marginTop: 30,
        alignItems: 'center',
        elevation: 3,
    },

    createButtonDisabled: {
        backgroundColor: '#CCC',
    },

    createButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default NewBudgetScreen;