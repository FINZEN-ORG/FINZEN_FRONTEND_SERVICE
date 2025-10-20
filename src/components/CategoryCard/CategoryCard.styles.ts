import { StyleSheet } from 'react-native';
import { colors, spacing, typography, borders, shadows } from '../../styles';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: borders.radius.md,
    padding: spacing.sm,
    marginHorizontal: spacing.xs,
    ...shadows.light,
    flex: 1,
    minHeight: 80,
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },

  containerSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.borderLight,
  },

  logoContainer: {
    width: 35,
    height: 35,
    borderRadius: borders.radius.sm,
    backgroundColor: colors.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },

  logo: {
    fontSize: 18,
  },

  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },

  title: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
    textAlign: 'center',
    lineHeight: 12,
  },

  titleSelected: {
    color: colors.primary,
    fontWeight: typography.fontWeight.semibold,
  },
});