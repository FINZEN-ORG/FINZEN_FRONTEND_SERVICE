import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#F7F8F7', flexGrow: 1 },
  title: { fontSize: 22, fontWeight: '700', textAlign: 'center', marginBottom: 16 },
  label: { fontSize: 14, marginTop: 10, marginBottom: 6, color: '#444' },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E6E6E6'
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
  primaryBtn: { backgroundColor: '#2B8E6A', padding: 14, borderRadius: 12, marginTop: 8 },
  primaryBtnText: { color: '#fff', fontWeight: '700', textAlign: 'center' },
  secondaryBtn: { backgroundColor: '#E8ECE9', padding: 12, borderRadius: 12, marginTop: 8 },
  secondaryBtnText: { textAlign: 'center', color: '#555', fontWeight: '600' }
});
