import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#EAFFF2', flexGrow: 1 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 24, color: colors.textPrimary },
  label: { fontSize: 14, marginTop: 10, marginBottom: 6, color: colors.textSecondary, fontWeight: '600' },
  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    fontSize: 16
  },
  colorsRow: { flexDirection: 'row', flexWrap: 'wrap', marginVertical: 12 },
  colorCircle: { width: 44, height: 44, borderRadius: 22, margin: 6, elevation: 2 },
  colorSelected: { borderWidth: 3, borderColor: '#2B8E6A' },
  importanceRow: { flexDirection: 'row', marginTop: 8, marginBottom: 16 },
  importanceBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D7D7D7',
    marginRight: 10,
    backgroundColor: '#fff'
  },
  importanceBtnActive: { backgroundColor: '#E8F7F0', borderColor: '#2B8E6A' },
  importanceTxt: { color: '#333' },
  importanceTxtActive: { color: '#2B8E6A', fontWeight: '600' },
  aiBox: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#FFD1A6',
    backgroundColor: '#FFFDF6',
    padding: 14,
    borderRadius: 10,
    marginVertical: 12
  },
  aiTitle: { color: '#C86A25', fontWeight: '700', marginBottom: 6 },
  aiText: { color: '#555', marginBottom: 8 },
  aiAmount: { fontSize: 18, fontWeight: '700', color: '#2B8E6A' },
  primaryBtn: { backgroundColor: colors.primary, padding: 16, borderRadius: 12, marginTop: 20, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3 },
  primaryBtnText: { color: '#fff', fontWeight: 'bold', textAlign: 'center', fontSize: 16 },
  secondaryBtn: { backgroundColor: 'white', padding: 14, borderRadius: 12, marginTop: 12, borderWidth: 1, borderColor: colors.border },
  secondaryBtnText: { textAlign: 'center', color: colors.textSecondary, fontWeight: '600', fontSize: 16 }
});
