import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import OnboardingStyles from './OnboardingStyles';
import LottieView from 'lottie-react-native';
import { useOnboarding } from '../../context/OnboardingContext';
import AIService from '../../services/AIService';
import { useNavigation } from '@react-navigation/native';

const OnboardingProcessing: React.FC = () => {
    const navigation = useNavigation<any>();
    const { state } = useOnboarding();
    const styles = OnboardingStyles;

    useEffect(() => {
        const processOnboarding = async () => {
            // 1. Construir perfil semántico
            const semanticProfile = {
                preferred_tone: state.tone || 'friendly',
                risk_tolerance: (state.importanciaAhorro || 3) >= 4 ? 'low' : 'medium',
                motivation_style: state.goal ? 'goal_oriented' : 'balanced',
                financial_literacy: 'beginner',
                preferred_categories: [state.ocio === 'Sí' ? 'ENTERTAINMENT' : null].filter(Boolean),
                emotional_state: 'optimistic'
            };

            try {
                // 2. Enviar a la IA (sin cambiar el estado de auth todavía)
                await AIService.createSemanticProfile(semanticProfile);
            } catch (error) {
                console.error("Error saving profile:", error);
            } finally {
                // 3. Esperar un poco para la animación y avanzar a RESULTADOS
                setTimeout(() => {
                    navigation.replace('PlanResult');
                }, 3000);
            }
        };

        processOnboarding();
    }, [navigation, state.goal, state.importanciaAhorro, state.ocio, state.tone]);

    return (
        <View style={[styles.scroll, styles.processingWrapper]}>
            <LottieView
                source={require('../../assets/animation/loading-AI.json')}
                autoPlay
                loop
                style={styles.processingAnimation}
            />
            <Text style={styles.subtitle}>Analizando tu perfil...</Text>
            <Text style={styles.helper}>La IA está creando tu plan personalizado.</Text>
        </View>
    );
};

export default OnboardingProcessing;