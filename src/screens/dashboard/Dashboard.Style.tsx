import { StyleSheet } from 'react-native';

export const dashboardStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9efe9ff',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 40,
  },
  welcomeText: {
    fontSize: 24,
    fontFamily: 'Forque',
    fontWeight: 'bold',
    color: '#37706b',
    marginBottom: 10,
  },
  userName: {
    fontSize: 20,
    fontFamily: 'Forque',
    color: '#333333',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: '#666666',
    fontFamily: 'Forque',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: 'Forque',
    fontWeight: 'bold',
    color: '#37706b',
    marginBottom: 20,
  },
  comingSoon: {
    fontSize: 16,
    color: '#666666',
    fontFamily: 'Forque',
    textAlign: 'center',
    paddingHorizontal: 40,
    lineHeight: 24,
  },
  footer: {
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Forque',
  },
});