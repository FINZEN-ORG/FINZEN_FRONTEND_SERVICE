import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useOnboarding } from '../../context/OnboardingContext';
import OptionCard from '../../components/OptionCard/OptionCard';
import OnboardingStyles from './OnboardingStyles';
import Header from '../../components/Onboarding/Header';
import { getOnboardingForTone } from '../../data/onboardingQuestions';

const OnboardingFinancialSituation: React.FC = () => {
    const navigation = useNavigation();
    const { state, updateAnswer, setStep } = useOnboarding();
    const toneKey = (state.tone as any) || 'friendly';
    const toneConfig = getOnboardingForTone(toneKey as any);
    const screen3 = toneConfig.screen3;
    const ingresoQuestion = screen3.questions.find((q: any) => q.id === 'ingreso') as any;
    const importanciaQuestion = screen3.questions.find((q: any) => q.id === 'importanciaAhorro') as any;
    const ocioQuestion = screen3.questions.find((q: any) => q.id === 'ocio') as any;
    const [incomeFrequency, setIncomeFrequency] = useState<string | null>((state.ingreso as string) || null);
    const [savingImportance, setSavingImportance] = useState<number | null>((state.importanciaAhorro as number) || null);
    const [leisure, setLeisure] = useState<string | null>((state.ocio as string) || null);
    // This screen is step 3 in the flow
    useEffect(() => {
        setStep(3);
    }, [setStep]);
    // Only require the three sections: income, stars, leisure choice
    const canContinue = !!incomeFrequency && !!savingImportance && !!leisure;
    const onContinue = () => {
        if (!canContinue) return;
        updateAnswer('ingreso', incomeFrequency);
        updateAnswer('importanciaAhorro', savingImportance);
        updateAnswer('ocio', leisure);
        // mark next step and navigate to processing simulation
        setStep(4);
        (navigation as any).navigate('Processing');
    };
    const styles = OnboardingStyles;

    return (
        // CORRECCIÓN: Usamos un View contenedor con flex: 1 para asegurar que ocupe la pantalla
        <View style={{ flex: 1, backgroundColor: '#F5FFF5' }}>
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{
                    padding: 20,
                    paddingBottom: 100 // Espacio extra abajo para que el botón no quede cortado
                }}
                keyboardShouldPersistTaps="handled"
            >
                <Header
                    title={screen3.title || 'Hablemos de tu situación financiera'}
                    description={screen3.description || 'Esto nos ayudará a crear un presupuesto que realmente funcione para ti.'}
                    step={3}
                    total={3}
                />

                {/* Sección 1: Ingresos */}
                <Text style={styles.label}>{(ingresoQuestion && ingresoQuestion.label) || '¿Cada cuánto recibes tus ingresos?'}</Text>
                <View style={styles.optionsColumn}>
                    {((ingresoQuestion && ingresoQuestion.options) || ['Fijo', 'Variable', 'Mixto']).map((opt: string, idx: number) => (
                        <View key={opt} style={idx === 1 ? styles.cardWrapperFull : styles.cardWrapper}>
                            <OptionCard
                                title={opt}
                                titleStyle={styles.toneTitle}
                                containerStyle={styles.toneCardCompact}
                                selected={incomeFrequency === opt}
                                onPress={() => setIncomeFrequency(opt)}
                            />
                        </View>
                    ))}
                </View>

                {/* Sección 2: Importancia Ahorro */}
                <Text style={styles.label}>{(importanciaQuestion && importanciaQuestion.label) || '¿Qué tan importante es ahorrar para ti ahora mismo?'}</Text>
                <View style={styles.starWrapper}>
                    <View style={styles.starRow}>
                        {((importanciaQuestion && importanciaQuestion.scale) || [1, 2, 3, 4, 5]).map((n: number) => (
                            <TouchableOpacity key={n} onPress={() => setSavingImportance(n)} activeOpacity={0.8}>
                                <Text style={[styles.star, savingImportance && n <= (savingImportance as number) ? styles.starActive : styles.starInactive]}>★</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Sección 3: Ocio */}
                <Text style={styles.label}>{(ocioQuestion && ocioQuestion.label) || '¿Quieres incluir ocio en tu presupuesto?'}</Text>
                {((ocioQuestion && ocioQuestion.options) || ['Sí', 'No', 'Un poco', 'Lo mínimo']).reduce((rows: any[], opt: string, idx: number) => {
                    const rowIndex = Math.floor(idx / 2);
                    rows[rowIndex] = rows[rowIndex] || [];
                    rows[rowIndex].push(opt);
                    return rows;
                }, []).map((row: string[], rIdx: number) => (
                    <View style={styles.optionsRow} key={`row-${rIdx}`}>
                        {row.map((opt) => (
                            <View style={styles.cardWrapper} key={opt}>
                                <OptionCard
                                    title={opt}
                                    titleStyle={styles.toneTitle}
                                    containerStyle={styles.toneCardCompact}
                                    selected={leisure === opt}
                                    onPress={() => setLeisure(opt)}
                                />
                            </View>
                        ))}
                    </View>
                ))}

                <View style={styles.buttonContainerFull}>
                    <TouchableOpacity
                        style={[styles.continueButton, styles.continueButtonFull, !canContinue && styles.continueDisabled]}
                        onPress={onContinue}
                        activeOpacity={0.9}
                    >
                        <Text style={[styles.continueText, !canContinue && styles.continueTextDisabled]}>Listo — generar plan</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>
    );
};

export default OnboardingFinancialSituation;