import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import { colors } from '../../styles/colors';

const { width } = Dimensions.get('window');

const AICoachScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/animation/loading-AI.json')}
        autoPlay
        loop
        style={styles.lottie}
      />
      <Text style={styles.title}>¡Prepárate para tu Coach IA!</Text>
      <Text style={styles.subtitle}>
        Muy pronto podrás descubrir una nueva forma de aprender, ahorrar y alcanzar tus metas financieras con la ayuda de inteligencia artificial. ¡La revolución financiera personalizada está por comenzar!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background, // Verde claro consistente
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  lottie: {
    width: width * 0.7,
    height: width * 0.7,
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2D3A4B',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#4F5D75',
    textAlign: 'center',
    lineHeight: 28,
  },
});

export default AICoachScreen;