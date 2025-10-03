import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './AIMessage.styles';
import { colors } from '../../styles';

export type MessageType = 'emergency' | 'regular' | 'good';

export interface AIMessageProps {
  mensaje: string;
  titulo?: string;
  type?: MessageType;
}

export const AIMessage: React.FC<AIMessageProps> = ({
  mensaje,
  titulo,
  type = 'good',
  
}) => {
  const getColorByType = (messageType: MessageType) => {
    switch (messageType) {
      case 'emergency':
        return colors.aiMessages.emergency;
      case 'regular':
        return colors.aiMessages.regular;
      case 'good':
        return colors.aiMessages.good;
      default:
        return colors.aiMessages.good;
    }
  };

  const backgroundColor = getColorByType(type);

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {titulo && (
        <Text style={styles.titulo}>{titulo}</Text>
      )}
      <Text style={styles.mensaje}>{mensaje}</Text>
    </View>
  );
};

export default AIMessage;