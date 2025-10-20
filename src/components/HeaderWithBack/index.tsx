import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { headerStyles } from './HeaderWithBack.styles';

export interface HeaderWithBackProps {
  title: string;
  onBackPress?: () => void; // Función personalizada de navegación
  showBackButton?: boolean; // Opcional: mostrar/ocultar botón de volver
  backgroundColor?: string; // Color de fondo personalizado
  titleColor?: string; // Color del título personalizado
  rightComponent?: React.ReactNode; // Componente opcional a la derecha
  containerStyle?: any; // Estilos personalizados del container
}

export const HeaderWithBack: React.FC<HeaderWithBackProps> = ({
  title,
  onBackPress,
  showBackButton = true,
  backgroundColor,
  titleColor,
  rightComponent,
  containerStyle,
}) => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View 
      style={[
        headerStyles.header,
        backgroundColor && { backgroundColor },
        containerStyle,
      ]}
    >
      {/* Botón de volver */}
      {showBackButton ? (
        <TouchableOpacity 
          style={headerStyles.backButton}
          onPress={handleBackPress}
          activeOpacity={0.7}
        >
          <View style={headerStyles.backIconContainer}>
            <Text style={headerStyles.backIcon}>‹</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <View style={headerStyles.placeholder} />
      )}

      {/* Título */}
      <Text 
        style={[
          headerStyles.headerTitle,
          titleColor && { color: titleColor },
        ]}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {title}
      </Text>

      {/* Componente derecho o placeholder */}
      {rightComponent ? (
        <View style={headerStyles.rightComponent}>
          {rightComponent}
        </View>
      ) : (
        <View style={headerStyles.placeholder} />
      )}
    </View>
  );
};

export default HeaderWithBack;