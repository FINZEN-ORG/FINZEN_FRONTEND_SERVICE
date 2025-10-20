import { StyleSheet } from 'react-native';

export const loginStyles = StyleSheet.create({
  imageContainer: {
    flex: 0.6,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain', 
  },

  googleButton: {
    backgroundColor: '#37706b', 
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Forque',
  },
});