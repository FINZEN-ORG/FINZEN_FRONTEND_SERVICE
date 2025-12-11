import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
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

    // Renderizado de cada item de la grilla
    const renderCategoryItem = ({ item }: { item: any }) => (
        <TouchableOpacity
            onPress={() => setSelectedCategoryId(item.id)}
            style={{
                flex: 1, margin: 5, aspectRatio: 1,
                backgroundColor: selectedCategoryId === item.id ? colors.backgroundLight : 'white',
                borderColor: selectedCategoryId === item.id ? colors.primary : colors.border,
                borderWidth: 2, borderRadius: 12,
                justifyContent: 'center', alignItems: 'center', elevation: 2
            }}
        >
            <Text style={{ fontSize: 24, fontFamily: 'System' }}>{item.icon || '📦'}</Text>
            <Text style={{ fontSize: 12, textAlign: 'center', marginTop: 5 }} numberOfLines={1}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={globalStyles.screenContainer}>
            <HeaderWithBack title="Nuevo Presupuesto" onBackPress={() => navigation.goBack()} />

            <FlatList
                data={categories}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                renderItem={renderCategoryItem}
                contentContainerStyle={{ padding: 20 }}

                // HEADER: Título y etiquetas
                ListHeaderComponent={
                    <View style={{ marginBottom: 15 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10, color: colors.textPrimary }}>
                            1. Elige una categoría
                        </Text>
                    </View>
                }

                // FOOTER: Input de monto y botón
                ListFooterComponent={
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10, color: colors.textPrimary }}>
                            2. Límite Mensual
                        </Text>
                        <TextInput
                            style={{
                                backgroundColor: 'white', borderRadius: 10, padding: 15,
                                fontSize: 18, borderWidth: 1, borderColor: colors.border,
                                color: colors.textPrimary
                            }}
                            placeholder="$0.00" keyboardType="numeric"
                            value={amount} onChangeText={setAmount}
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
                    </View>
                }
            />
        </View>
    );
};
export default NewBudgetScreen;