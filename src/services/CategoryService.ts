import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TRANSACTIONS_API_BASE_URL } from "@env";

export interface CategoryDto {
    id: number;
    name: string;
    predefined: boolean;
}

class CategoryService {
    static async getAuthHeader() {
        const token = await AsyncStorage.getItem("jwt");
        if (!token) throw new Error("No authentication token found");
        return { Authorization: `Bearer ${token}` };
    }

    // GET /api/categories - Obtener todas las categorías del usuario
    static async getAllCategories(): Promise<CategoryDto[]> {
        const headers = await this.getAuthHeader();
        const url = `${TRANSACTIONS_API_BASE_URL}/categories`;
        const response = await axios.get(url, { headers });
        return response.data;
    }

    // POST /api/categories - Crear categoría personalizada
    static async createCategory(data: { name: string }): Promise<CategoryDto> {
        const headers = await this.getAuthHeader();
        const url = `${TRANSACTIONS_API_BASE_URL}/categories`;
        const response = await axios.post(url, data, { headers });
        return response.data;
    }
}

export default CategoryService;