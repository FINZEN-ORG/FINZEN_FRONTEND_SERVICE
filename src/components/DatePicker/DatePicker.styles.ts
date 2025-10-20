import { StyleSheet, Dimensions } from 'react-native';
import { colors, spacing, typography, borders, shadows } from '../../styles';

const { width, height } = Dimensions.get('window');

export const datePickerStyles = StyleSheet.create({
  // Container principal
  container: {
    width: '100%',
  },

  // Input que abre el calendario
  input: {
    backgroundColor: '#FFE4B5', // Color amarillo como en AddExpenseScreen
    borderRadius: borders.radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: '#F4D03F',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 50,
  },

  inputText: {
    fontSize: typography.fontSize.md,
    color: colors.textPrimary,
    flex: 1,
  },

  placeholderText: {
    color: '#999',
  },

  calendarIcon: {
    fontSize: 20,
    marginLeft: spacing.sm,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  calendarContainer: {
    backgroundColor: colors.background,
    borderRadius: borders.radius.lg,
    margin: spacing.lg,
    padding: spacing.lg,
    width: width * 0.9,
    maxHeight: height * 0.7,
    ...shadows.medium,
  },

  // Header del calendario
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },

  navButton: {
    padding: spacing.sm,
    borderRadius: borders.radius.sm,
    backgroundColor: colors.backgroundSecondary,
    minWidth: 40,
    alignItems: 'center',
  },

  navButtonText: {
    fontSize: 24,
    color: colors.primary,
    fontWeight: typography.fontWeight.bold,
  },

  monthText: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
  },

  // Header de la semana
  weekHeader: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    paddingBottom: spacing.xs,
  },

  weekDayContainer: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },

  weekDayText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.textSecondary,
  },

  // Calendario
  calendar: {
    maxHeight: 300,
  },

  dayContainer: {
    flex: 1,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 1,
    borderRadius: borders.radius.sm,
  },

  dayInactive: {
    opacity: 0.3,
  },

  dayToday: {
    backgroundColor: colors.secondary + '20', // Orange con transparencia
    borderWidth: 2,
    borderColor: colors.secondary,
  },

  daySelected: {
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.primary,
  },

  dayText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
  },

  dayTextInactive: {
    color: colors.textSecondary,
  },

  dayTextToday: {
    color: colors.secondary,
    fontWeight: typography.fontWeight.bold,
  },

  dayTextSelected: {
    color: colors.textWhite,
    fontWeight: typography.fontWeight.bold,
  },

  // Botones de acción
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },

  cancelButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    marginRight: spacing.sm,
    borderRadius: borders.radius.md,
    backgroundColor: colors.backgroundSecondary,
    alignItems: 'center',
  },

  cancelButtonText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    color: colors.textSecondary,
  },

  todayButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    marginLeft: spacing.sm,
    borderRadius: borders.radius.md,
    backgroundColor: colors.primary,
    alignItems: 'center',
  },

  todayButtonText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    color: colors.textWhite,
  },
});