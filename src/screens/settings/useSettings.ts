import { Alert } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function useSettings() {
    const { logout, user } = useAuth();

    const onLogoutPress = () => {
        Alert.alert(
            'Cerrar sesión',
            '¿Estás seguro de que quieres cerrar sesión?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Cerrar sesión',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await logout();
                        } catch (error) {
                            console.error('Error logout:', error);
                            Alert.alert('Error', 'No se pudo cerrar sesión');
                        }
                    }
                }
            ]
        );
    };

    return {
        user,
        onLogoutPress,
    };
}
