import React, { useEffect, useRef } from 'react';
import { Modal, View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { useOnboarding } from '../../context/OnboardingContext';
import { colors } from '../../styles/colors';
import sharedStyles from './OnboardingComponents.styles';

const CompletionModal: React.FC = () => {
  const { state, reset } = useOnboarding();
  const visible = !!state.completed;
  const scale = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(scale, { toValue: 1, useNativeDriver: true, friction: 7 }).start();
    } else {
      scale.setValue(0.6);
    }
  }, [visible, scale]);

  const onClose = async () => {
    // Reset onboarding state and storage
    await reset();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={localStyles.backdrop}>
        <Animated.View style={[localStyles.card, { transform: [{ scale }] }]}>
          <Text style={sharedStyles.completionTitle}>¡Listo!</Text>
          <Text style={sharedStyles.completionDescription}>Gracias — ya configuré todo para adaptarme a tu estilo. Empecemos a controlar tus finanzas.</Text>
          <TouchableOpacity style={localStyles.button} onPress={onClose} activeOpacity={0.85}>
            <Text style={localStyles.buttonText}>Comenzar</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

const localStyles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  card: { width: '100%', maxWidth: 520, backgroundColor: colors.surface, borderRadius: 14, padding: 22, alignItems: 'center', shadowColor: colors.shadow, shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.18, shadowRadius: 24, elevation: 6 },
  // title and description use sharedStyles.completionTitle / completionDescription
  // kept here only other local modal styles
  button: { backgroundColor: colors.primary, paddingVertical: 12, paddingHorizontal: 28, borderRadius: 999, alignSelf: 'stretch' },
  buttonText: { color: '#fff', fontWeight: '800', textAlign: 'center', fontSize: 16 },
});

export default CompletionModal;
