import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import OnboardingStyles from './OnboardingStyles';
import LottieView from 'lottie-react-native';

const OnboardingProcessing: React.FC = () => {
  const navigation = useNavigation();
  const styles = OnboardingStyles;

  useEffect(() => {
    const t = setTimeout(() => {
      (navigation as any).replace('PlanResult');
    }, 10000);
    return () => clearTimeout(t);
  }, [navigation]);

  return (
    <View style={[styles.scroll, styles.processingWrapper]}>
      <LottieView
        source={require('../../assets/animation/loading-AI.json')}
        autoPlay
        loop
        style={styles.processingAnimation}
      />
      <Text style={styles.subtitle}>Generando tu plan inicial…</Text>
      <Text style={styles.helper}>Esto sólo es una simulación de la llamada al microservicio de IA.</Text>
    </View>
  );
};

export default OnboardingProcessing;
