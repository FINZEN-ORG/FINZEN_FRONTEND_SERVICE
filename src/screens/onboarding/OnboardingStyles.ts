import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

const OnboardingStyles = StyleSheet.create({
  scroll: {
    padding: 20,
    paddingBottom: 60, // Extend container further down
    backgroundColor: '#F5FFF5', // Softer green background
  },
  progressWrap: {
    flex: 1,
    marginTop: 12, // Adjust spacing
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  stepText: {
    color: colors.primaryDarker,
    fontSize: 12,
    marginBottom: 6,
    textAlign: 'center', // Center align step text
  },
  progressBar: {
    height: 12, // Slightly taller
    backgroundColor: colors.borderLight,
    borderRadius: 12, // Rounded edges
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.primary, // Add border for better visibility
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 12, // Match rounded edges
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.primaryDarker,
    marginTop: 6,
    marginBottom: 6,
    textAlign: 'center', // Center align title
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 20,
    textAlign: 'center', // Center align subtitle
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 12,
    marginBottom: 6,
    color: colors.primaryDarker,
  },
  helper: {
    fontSize: 13,
    color: colors.primary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.borderLight,
    marginBottom: 6,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    marginBottom: 24,
  },
  optionsColumn: {
    flexDirection: 'column',
    gap: 12,
    marginTop: 12,
    marginBottom: 24,
  },
  optionsRowWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    marginBottom: 12,
  },
  expenseGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 12,
    marginBottom: 24,
  },
  cardWrapper: {
    width: '48%',
    marginBottom: 12,
  },
  cardWrapperFull: {
    width: '100%',
    marginBottom: 12,
  },
  continueButton: {
    marginTop: 8,
    backgroundColor: colors.primary,
    borderRadius: 32,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 16,
    elevation: 3,
  },
  buttonContainer: {
    marginTop: 24, // Add spacing between form and button
    alignItems: 'center',
  },
  continueButtonFull: {
    width: '92%',
    alignSelf: 'center',
  },
  buttonContainerFull: {
    marginTop: 24,
    alignItems: 'center',
    width: '100%',
  },
  continueDisabled: {
    backgroundColor: '#CDEFD8',
  },
  continueText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
  },
  continueTextDisabled: {
    color: colors.primaryDarker,
  },
});

export default OnboardingStyles;
