import { StyleSheet } from 'react-native';
import { spacing, typography, borders, shadows } from '../../styles';

export const styles = StyleSheet.create({
  container: {
    padding: spacing.sm,
    borderRadius: borders.radius.sm,
    marginVertical: spacing.xs,
    marginHorizontal: spacing.sm,
    ...shadows.light,
    minHeight: 60,
    justifyContent: 'center',
  },

  titulo: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    color: '#FFFFFF',
    marginBottom: spacing.xs,
  },

  mensaje: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    color: '#FFFFFF',
    lineHeight: typography.fontSize.md * typography.lineHeight.normal,
  },
});