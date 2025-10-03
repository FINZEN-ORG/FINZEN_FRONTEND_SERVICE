import { StyleSheet } from 'react-native';
import { colors } from './colors';
import { typography, spacing } from './typography';

// Estilos comunes globales para componentes
export const globalStyles = StyleSheet.create({
  // Contenedores
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
  },

  headerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
  },

  safeContainer: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.md,
  },

  // Títulos
  title: {
    fontSize: typography.fontSize.title,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 0,
  },
  
  subtitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },

  // Centrado
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Flex básicos
  flexRow: {
    flexDirection: 'row',
  },
  
  flexBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  flex1: {
    flex: 1,
  },

  // Texto
  textCenter: {
    textAlign: 'center',
  },
});