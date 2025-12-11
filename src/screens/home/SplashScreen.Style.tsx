import { StyleSheet } from 'react-native';

export const splashStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAFFF2', 
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  letter: {
    fontSize: 50,
    fontFamily: 'Forque', 
    fontWeight: 'bold',
    color: '#37706b',
    marginHorizontal: 2,
  },
  subtitle: {
    fontSize: 18,
    color: '#666666',
    fontFamily: 'Forque',
    textAlign: 'center',
  },
});