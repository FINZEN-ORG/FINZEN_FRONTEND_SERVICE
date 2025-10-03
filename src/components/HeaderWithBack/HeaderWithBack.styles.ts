import { StyleSheet } from 'react-native';
import { colors, spacing, typography, borders, shadows } from '../../styles';

export const headerStyles = StyleSheet.create({
  // Header principal
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xs,
    minHeight: 60,
    marginBottom: 0,

  },

  // Botón de volver mejorado
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: borders.radius.round,
    backgroundColor: colors.backgroundSecondary,
    ...shadows.light,
  },

  backIconContainer: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: borders.radius.round,
    backgroundColor: colors.primary + '10', // Teal con transparencia
  },

  backIcon: {
    fontSize: 28,
    color: colors.primary,
    fontWeight: typography.fontWeight.bold,
    lineHeight: 32,
    textAlign: 'center',
    marginLeft: -2, 
  },

  // Título
  headerTitle: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
    textAlign: 'center',
    flex: 1,
    marginHorizontal: spacing.md,
  },

  // Componente derecho
  rightComponent: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Placeholder para mantener balance visual
  placeholder: {
    width: 44,
    height: 44,
  },

  // Variantes de estado
  backButtonPressed: {
    backgroundColor: colors.primary + '20',
    transform: [{ scale: 0.95 }],
  },

  // Estilos adicionales para casos especiales
  headerWithShadow: {
    ...shadows.medium,
    elevation: 4,
  },

  headerTransparent: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
  },

  titleLarge: {
    fontSize: typography.fontSize.xxl,
  },

  titleSmall: {
    fontSize: typography.fontSize.lg,
  },
});