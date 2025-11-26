import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HeaderWithBack } from '../../components';
import { globalStyles } from '../../styles';
import { colors } from '../../styles/colors';
import CategoryService, { CategoryDto } from '../../services/CategoryService';
import BudgetService from '../../services/BudgetService';

const NewBudgetScreen: React.FC = () => {
    const navigation = useNavigation();
    const [amount, setAmount] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    const [categories, setCategories] = useState<CategoryDto[]>([]);

    // Cargar solo categorías de GASTO
    useEffect(() => {
        const loadCats = async () => {
            try {
                const data = await CategoryService.getCategoriesByType('EXPENSE');
                setCategories(data);
            } catch (e) {
                console.error(e);
            }
        };
        loadCats();
    }, []);

    const handleCreate = async () => {
        if (!selectedCategoryId) {
            Alert.alert("Atención", "Selecciona una categoría");
            return;
        }
        if (!amount || parseFloat(amount) <= 0) {
            Alert.alert("Atención", "Ingresa un monto válido");
            return;
        }
        try {
            await BudgetService.createOrUpdateBudget({
                categoryId: selectedCategoryId,
                amount: parseFloat(amount),
            } as any); // as any para saltar validación estricta si faltan campos opcionales
            Alert.alert("¡Éxito!", "Presupuesto asignado correctamente.", [
                { text: "OK", onPress: () => navigation.goBack() }
            ]);
        } catch (error) {
            Alert.alert("Error", "No se pudo guardar el presupuesto.");
        }
    };

    return (
        <View style={globalStyles.screenContainer}>
            <HeaderWithBack title="Nuevo Presupuesto" onBackPress={() => navigation.goBack()} />
            <ScrollView contentContainerStyle={{ padding: 20 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10, color: colors.textPrimary }}>
                    1. Elige una categoría
                </Text>
                <View style={{ height: 250 }}>
                    {categories.length === 0 ? (
                        <Text style={{ color: '#888', fontStyle: 'italic' }}>
                            No tienes categorías de gasto. Ve a "Crear Categoría" primero.
                        </Text>
                    ) : (
                        <FlatList
                            data={categories}
                            nestedScrollEnabled
                            keyExtractor={(item) => item.id.toString()}
                            numColumns={3}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => setSelectedCategoryId(item.id)}
                                    style={{
                                        width: '30%', margin: '1.5%', aspectRatio: 1,
                                        backgroundColor: selectedCategoryId === item.id ? colors.backgroundLight : 'white',
                                        borderColor: selectedCategoryId === item.id ? colors.primary : colors.border,
                                        borderWidth: 2, borderRadius: 12,
                                        justifyContent: 'center', alignItems: 'center',
                                        elevation: 2
                                    }}
                                >
                                    <Text style={{ fontSize: 24 }}>{(item as any).icon || '📦'}</Text>
                                    <Text style={{ fontSize: 12, textAlign: 'center', marginTop: 5 }} numberOfLines={1}>
                                        {item.name}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        />
                    )}
                </View>

                <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 20, marginBottom: 10, color: colors.textPrimary }}>
                    2. Límite Mensual
                </Text>

                <TextInput
                    style={{
                        backgroundColor: 'white', borderRadius: 10, padding: 15,
                        fontSize: 18, borderWidth: 1, borderColor: colors.border,
                        color: colors.textPrimary
                    }}
                    placeholder="$0.00"
                    keyboardType="numeric"
                    value={amount}
                    onChangeText={setAmount}
                />
                <TouchableOpacity
                    onPress={handleCreate}
                    style={{
                        backgroundColor: colors.primary, padding: 15, borderRadius: 30,
                        marginTop: 30, alignItems: 'center', elevation: 3
                    }}
                >
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Crear Presupuesto</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default NewBudgetScreen;