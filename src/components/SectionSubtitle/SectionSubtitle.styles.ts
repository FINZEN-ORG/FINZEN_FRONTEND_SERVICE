import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../styles';

export const styles = StyleSheet.create({
  subtitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
    textAlign: 'left',
    paddingHorizontal: spacing.md,
    justifyContent: 'flex-start',
  },

  marginTop: {
    marginTop: spacing.md,
  },

  marginBottom: {
    marginBottom: spacing.sm,
  },
});