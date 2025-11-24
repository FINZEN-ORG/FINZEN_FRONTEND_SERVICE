import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export default StyleSheet.create({
  // Header
  container: { marginBottom: 6, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', display: 'flex', position: 'relative', paddingTop: 8 },
  topRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6, width: '100%', minHeight: 48 },
  topImage: { width: 44, height: 44, position: 'absolute', left: 12, top: '50%', transform: [{ translateY: -22 }] },
  metaRight: { flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%' },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: colors.primaryDeep,
    marginTop: 6,
    alignSelf: 'stretch',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 36,
  },
  description: { fontSize: 17, color: colors.textSecondary, marginBottom: 5, alignSelf: 'stretch', textAlign: 'center', lineHeight: 22 },

  // ProgressDots
  dotsContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: colors.borderLight,
    borderWidth: 1,
    borderColor: colors.border,
    marginHorizontal: 3,
  },
  dotActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    width: 10,
    height: 10,
    borderRadius: 6,
  },

  // QuestionField
  qLabel: { fontSize: 15, fontWeight: '700', marginTop: 12, marginBottom: 6, color: colors.primaryDeep },
  qHelper: { fontSize: 13, color: colors.primaryDark, marginBottom: 8 },

  // MultiSelect
  multiContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 8 },
  multiItem: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
    width: '48%',
    minHeight: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // lightweight wrapper for grids when inner component already draws card visuals
  gridItemWrapper: {
    width: '49%',
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  // utility to force inner card to full width of wrapper
  gridInnerFull: {
    width: '100%',
  },
  // utility to make inner card auto-height (override OptionCard minHeight)
  gridInnerAuto: {
    minHeight: 0,
    paddingVertical: 12,
  },
  multiItemSelected: { borderColor: colors.primary, backgroundColor: colors.backgroundLightest },
  multiItemText: { color: colors.textPrimary, fontWeight: '600', textAlign: 'center', fontSize: 14 },
  multiItemTextSelected: { color: colors.primaryDeep },

  // ContinueButton
  continueButton: {
    marginTop: 18,
    backgroundColor: colors.primary,
    borderRadius: 32,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 16,
    elevation: 3,
  },
  continueButtonFull: { alignSelf: 'stretch' },
  continueDisabled: { backgroundColor: colors.backgroundLight },
  continueText: { color: '#fff', fontSize: 18, fontWeight: '800' },
  continueTextDisabled: { color: colors.primaryDeep },
  // Completion modal styles (for shared tokens)
  completionTitle: { fontSize: 25, fontWeight: '800', color: colors.primaryDeep, textAlign: 'center', alignSelf: 'stretch', marginBottom: 8 },
  completionDescription: { fontSize: 15, color: colors.textSecondary, textAlign: 'center', alignSelf: 'stretch', marginBottom: 18 },
});
