import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import IoniconsIcon from '@react-native-vector-icons/ionicons';
import { colors } from '../../styles/colors';
import useSettings from './useSettings';

const SettingsScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    const { user, onLogoutPress } = useSettings();

    return (
        <View style={{ flex: 1, backgroundColor: '#EAFFF2' }}>
            {/* Header con gradiente verde - más compacto */}
            <View style={{
                backgroundColor: colors.primary,
                paddingTop: 40,
                paddingBottom: 20,
                paddingHorizontal: 20,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
            }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 16 }}>
                    <IoniconsIcon name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {/* Avatar del usuario */}
                    <View style={{
                        width: 60,
                        height: 60,
                        borderRadius: 30,
                        backgroundColor: 'white',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: 16,
                        elevation: 3,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.2,
                        shadowRadius: 3,
                    }}>
                        <IoniconsIcon name="person" size={32} color={colors.primary} />
                    </View>
                    
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', marginBottom: 4 }}>
                            {user?.name || 'Usuario'}
                        </Text>
                        <Text style={{ color: 'white', fontSize: 13, opacity: 0.9 }}>
                            {user?.email || 'correo@ejemplo.com'}
                        </Text>
                    </View>
                </View>
            </View>

            <View style={{ flex: 1, padding: 16 }}>
                {/* Opciones de configuración */}
                <View style={{
                    backgroundColor: 'white',
                    borderRadius: 16,
                    padding: 4,
                    marginBottom: 20,
                    elevation: 2,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                }}>
                    <TouchableOpacity style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 16,
                        borderBottomWidth: 1,
                        borderBottomColor: colors.border,
                    }}>
                        <View style={{
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            backgroundColor: colors.backgroundLight,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginRight: 12,
                        }}>
                            <IoniconsIcon name="notifications-outline" size={20} color={colors.textSecondary} />
                        </View>
                        <Text style={{ flex: 1, fontSize: 16, color: colors.textPrimary }}>Notificaciones</Text>
                        <IoniconsIcon name="chevron-forward" size={20} color={colors.textSecondary} />
                    </TouchableOpacity>

                    <TouchableOpacity style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 16,
                        borderBottomWidth: 1,
                        borderBottomColor: colors.border,
                    }}>
                        <View style={{
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            backgroundColor: colors.backgroundLight,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginRight: 12,
                        }}>
                            <IoniconsIcon name="language-outline" size={20} color={colors.textSecondary} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 16, color: colors.textPrimary }}>Idioma</Text>
                        </View>
                        <Text style={{ fontSize: 14, color: colors.textSecondary, marginRight: 8 }}>Español</Text>
                        <IoniconsIcon name="chevron-forward" size={20} color={colors.textSecondary} />
                    </TouchableOpacity>

                    <TouchableOpacity style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 16,
                        borderBottomWidth: 1,
                        borderBottomColor: colors.border,
                    }}>
                        <View style={{
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            backgroundColor: colors.backgroundLight,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginRight: 12,
                        }}>
                            <IoniconsIcon name="cash-outline" size={20} color={colors.textSecondary} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 16, color: colors.textPrimary }}>Moneda</Text>
                        </View>
                        <Text style={{ fontSize: 16, color: colors.textSecondary, marginRight: 8, fontWeight: '600' }}>COP</Text>
                        <IoniconsIcon name="chevron-forward" size={20} color={colors.textSecondary} />
                    </TouchableOpacity>

                    <TouchableOpacity style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 16,
                    }}>
                        <View style={{
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            backgroundColor: colors.backgroundLight,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginRight: 12,
                        }}>
                            <IoniconsIcon name="moon-outline" size={20} color={colors.textSecondary} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 16, color: colors.textPrimary }}>Tema</Text>
                        </View>
                        <Text style={{ fontSize: 14, color: colors.textSecondary, marginRight: 8 }}>Claro</Text>
                        <IoniconsIcon name="chevron-forward" size={20} color={colors.textSecondary} />
                    </TouchableOpacity>
                </View>

                {/* Card Premium */}
                <View style={{
                    backgroundColor: '#FF9F43',
                    borderRadius: 16,
                    padding: 20,
                    marginBottom: 20,
                    elevation: 2,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                }}>
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>
                        Desbloquea funciones premium
                    </Text>
                    <Text style={{ color: 'white', fontSize: 14, marginBottom: 16, opacity: 0.9 }}>
                        Obtén acceso ilimitado a todas las funciones y herramientas.
                    </Text>
                    <TouchableOpacity style={{
                        backgroundColor: 'white',
                        padding: 14,
                        borderRadius: 10,
                        alignItems: 'center',
                    }}>
                        <Text style={{ color: '#FF9F43', fontWeight: 'bold', fontSize: 16 }}>Actualizar ahora</Text>
                    </TouchableOpacity>
                </View>

                {/* Sección de Seguridad */}
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.textPrimary, marginBottom: 12 }}>
                    Seguridad
                </Text>

                {/* Botón de Cerrar Sesión */}
                <TouchableOpacity
                    onPress={onLogoutPress}
                    style={{
                        backgroundColor: 'white',
                        borderRadius: 16,
                        padding: 16,
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 30,
                        borderWidth: 1,
                        borderColor: '#FFE0E0',
                    }}
                >
                    <View style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        backgroundColor: '#FFE0E0',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: 12,
                    }}>
                        <IoniconsIcon name="log-out-outline" size={20} color="#FF6B6B" />
                    </View>
                    <Text style={{ flex: 1, fontSize: 16, color: '#FF6B6B', fontWeight: '600' }}>Cerrar sesión</Text>
                    <IoniconsIcon name="chevron-forward" size={20} color="#FF6B6B" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SettingsScreen;
