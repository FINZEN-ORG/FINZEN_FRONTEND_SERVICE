import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useOnboarding } from '../../context/OnboardingContext';
import { useAuth } from '../../context/AuthContext';
import OnboardingStyles from './OnboardingStyles';

const OnboardingPlanResult: React.FC = () => {
    const { state } = useOnboarding();
    const { setOnboardingCompleted } = useAuth();
    const styles = OnboardingStyles;

    const handleFinish = async () => {
        await setOnboardingCompleted(true);
    };

    const ingreso = state.ingreso || state.incomeFrequency || '—';
    const importancia = state.importanciaAhorro ?? state.savingImportance ?? '—';
    const ocio = state.ocio || '—';

    return (
        <ScrollView contentContainerStyle={styles.scroll}>
            <Text style={styles.title}>¡Listo! Aquí está tu plan inicial</Text>
            <Text style={styles.subtitle}>
                Hemos configurado tu asistente financiero basado en tus respuestas.
            </Text>

            {/* Resumen de respuestas */}
            <View style={styles.goalItem}>
                <Text style={styles.goalText}>Frecuencia de Ingreso</Text>
                <Text style={styles.goalTextSelected}>{ingreso}</Text>
            </View>
            <View style={styles.goalItem}>
                <Text style={styles.goalText}>Importancia de Ahorro</Text>
                <Text style={styles.goalTextSelected}>{importancia}/5</Text>
            </View>
            <View style={styles.goalItem}>
                <Text style={styles.goalText}>Ocio permitido</Text>
                <Text style={styles.goalTextSelected}>{ocio}</Text>
            </View>

            <View style={styles.buttonContainerFull}>
                <TouchableOpacity
                    style={[styles.continueButton, styles.continueButtonFull]}
                    onPress={handleFinish}
                    activeOpacity={0.9}
                >
                    <Text style={styles.continueText}>Ir al Dashboard 🚀</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default OnboardingPlanResult;