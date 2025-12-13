import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ChatScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/ai-learning.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>¡Muy pronto!</Text>
      <Text style={styles.subtitle}>
        Estamos construyendo la próxima experiencia de aprendizaje financiero con IA.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  image: {
    width: 220,
    height: 220,
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

export default ChatScreen;
