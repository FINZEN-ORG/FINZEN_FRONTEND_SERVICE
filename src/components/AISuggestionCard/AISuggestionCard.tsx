import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

interface AISuggestionCardProps {
    recommendation: string | null;
    loading?: boolean;
    isViable?: boolean;
    suggestedMonthlyAmount?: number;
    tips?: string[];
    style?: any;
}

/**
 * Componente para mostrar sugerencias de la IA
 * Muestra un card con estilo similar a las imágenes proporcionadas
 */
const AISuggestionCard: React.FC<AISuggestionCardProps> = ({
    recommendation,
    loading = false,
    isViable = true,
    suggestedMonthlyAmount,
    tips,
    style
}) => {
    if (loading) {
        return (
            <View style={[styles.container, styles.loadingContainer, style]}>
                <View style={styles.header}>
                    <Text style={styles.sparkle}>✨</Text>
                    <Text style={styles.title}>Sugerencias de la IA</Text>
                </View>
                <ActivityIndicator size="small" color={colors.primary} style={{ marginVertical: 10 }} />
                <Text style={styles.loadingText}>Analizando tu meta...</Text>
            </View>
        );
    }

    if (!recommendation) {
        return null;
    }

    return (
        <View style={[styles.container, style]}>
            <View style={styles.header}>
                <Text style={styles.sparkle}>✨</Text>
                <Text style={styles.title}>Sugerencias de la IA</Text>
            </View>

            {/* Mensaje principal */}
            <Text style={styles.recommendation}>{recommendation}</Text>

            {/* Monto mensual sugerido */}
            {suggestedMonthlyAmount && (
                <View style={styles.amountContainer}>
                    <Text style={styles.amountLabel}>💰 Ahorro mensual sugerido:</Text>
                    <Text style={styles.amountValue}>${suggestedMonthlyAmount.toLocaleString()}</Text>
                </View>
            )}

            {/* Tips adicionales */}
            {tips && tips.length > 0 && (
                <View style={styles.tipsContainer}>
                    {tips.map((tip, index) => (
                        <Text key={index} style={styles.tip}>• {tip}</Text>
                    ))}
                </View>
            )}

            {/* Indicador de viabilidad */}
            {!isViable && (
                <View style={styles.warningContainer}>
                    <Text style={styles.warningIcon}>⚠️</Text>
                    <Text style={styles.warningText}>
                        Esta meta podría ser difícil de alcanzar. Considera ajustar el monto o la fecha.
                    </Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF8E7',
        borderRadius: 12,
        padding: 16,
        borderWidth: 1.5,
        borderColor: '#FFD966',
        borderStyle: 'dashed',
        marginVertical: 10,
    },
    loadingContainer: {
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    sparkle: {
        fontSize: 20,
        marginRight: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#D97706',
    },
    recommendation: {
        fontSize: 14,
        color: '#78350F',
        lineHeight: 20,
        marginBottom: 12,
    },
    loadingText: {
        fontSize: 13,
        color: '#92400E',
        fontStyle: 'italic',
    },
    amountContainer: {
        backgroundColor: 'rgba(217, 119, 6, 0.1)',
        borderRadius: 8,
        padding: 10,
        marginTop: 8,
        marginBottom: 10,
    },
    amountLabel: {
        fontSize: 12,
        color: '#92400E',
        marginBottom: 4,
    },
    amountValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#D97706',
    },
    tipsContainer: {
        marginTop: 8,
        paddingLeft: 5,
    },
    tip: {
        fontSize: 13,
        color: '#78350F',
        marginBottom: 6,
        lineHeight: 18,
    },
    warningContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderRadius: 8,
        padding: 10,
        marginTop: 10,
    },
    warningIcon: {
        fontSize: 16,
        marginRight: 8,
    },
    warningText: {
        flex: 1,
        fontSize: 12,
        color: '#991B1B',
        lineHeight: 16,
    },
});

export default AISuggestionCard;
