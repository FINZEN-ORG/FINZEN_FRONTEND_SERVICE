import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TRANSACTIONS_API_BASE_URL } from "@env";

export interface CategoryDto {
    id: number;
    name: string;
    type: 'INCOME' | 'EXPENSE';
    icon: string;
    predefined: boolean;
}

class CategoryService {
    static async getAuthHeader() {
        const token = await AsyncStorage.getItem("jwt");
        if (!token) throw new Error("No authentication token found");
        return { Authorization: `Bearer ${token}` };
    }

    static async getCategoriesByType(type: 'INCOME' | 'EXPENSE'): Promise<CategoryDto[]> {
        const headers = await this.getAuthHeader();
        const url = `${TRANSACTIONS_API_BASE_URL}/categories`;
        const response = await axios.get(url, {
            headers,
            params: { type }
        });
        return response.data;
    }

    static async getAllCategories(): Promise<CategoryDto[]> {
        return this.getCategoriesByType('EXPENSE');
    }

    static async createCategory(data: { name: string, type: 'INCOME' | 'EXPENSE' }): Promise<CategoryDto> {
        const headers = await this.getAuthHeader();
        const url = `${TRANSACTIONS_API_BASE_URL}/categories`;
        const response = await axios.post(url, data, { headers });
        return response.data;
    }

    static async deleteCategory(id: number): Promise<CategoryDto> {
        const headers = await this.getAuthHeader();
        const url = `${TRANSACTIONS_API_BASE_URL}/categories/${id}`;
        const response = await axios.delete(url, { headers });
        return response.data;
    }
}
export default CategoryService;