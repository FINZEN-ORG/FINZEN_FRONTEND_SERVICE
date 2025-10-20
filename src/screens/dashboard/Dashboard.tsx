import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { dashboardStyles } from './Dashboard.Style';
import { useAuth } from '../../context/AuthContext';
import { useAuthActions } from '../../hooks/useAuthActions';

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
  const { user } = useAuth();
  const { handleLogout } = useAuthActions();

  const onLogoutPress = async () => {
    try {
      await handleLogout();
    } catch (error) {
      // Error is already handled in useAuthActions
    }
  };

  if (!user) {
    return (
      <View style={dashboardStyles.container}>
        <Text>Cargando...</Text>
      </View>
    );
  }

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
          onPress={onLogoutPress}
        >
          <Text style={dashboardStyles.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Dashboard;