import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { dashboardStyles } from './Dashboard.Style';
import AuthService from '../../services/AuthService';

interface DashboardProps {
  user: any;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  
  const handleLogout = async () => {
    try {
      await AuthService.logout();
      onLogout();
    } catch (error) {
      console.error("Error en logout:", error);
      Alert.alert("Error", "No se pudo cerrar sesión");
    }
  };

  return (
    <View style={dashboardStyles.container}>
      <View style={dashboardStyles.header}>
        <Text style={dashboardStyles.welcomeText}>¡Bienvenido a FinZen! 🎉</Text>
        <Text style={dashboardStyles.userName}>{user.name}</Text>
        <Text style={dashboardStyles.userEmail}>{user.email}</Text>
      </View>
      
      <View style={dashboardStyles.content}>
        <Text style={dashboardStyles.sectionTitle}>Tu Dashboard</Text>
        <Text style={dashboardStyles.comingSoon}>
          Próximamente: Gestión financiera, presupuestos y más...
        </Text>
      </View>
      
      <View style={dashboardStyles.footer}>
        <TouchableOpacity 
          style={dashboardStyles.logoutButton} 
          onPress={handleLogout}
        >
          <Text style={dashboardStyles.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Dashboard;