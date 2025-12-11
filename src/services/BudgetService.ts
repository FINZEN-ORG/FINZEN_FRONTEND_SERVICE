import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GOALS_API_BASE_URL } from "@env";

export interface BudgetDto {
    id?: number;
    categoryId: number; // ID de categoría de transacciones
    amount: number;     // Límite mensual
    spent?: number;     // Viene del backend calculado (API Composition)
    startDate?: string;
    endDate?: string;
}

class BudgetService {
    static async getAuthHeader() {
        const token = await AsyncStorage.getItem("jwt");
        if (!token) throw new Error("No authentication token found");
        return { Authorization: `Bearer ${token}` };
    }

    static async getAllBudgets(): Promise<BudgetDto[]> {
        const headers = await this.getAuthHeader();
        const url = `${GOALS_API_BASE_URL}/budgets`;
        const response = await axios.get(url, { headers });
        return response.data;
    }

    static async createOrUpdateBudget(data: BudgetDto): Promise<BudgetDto> {
        const headers = await this.getAuthHeader();
        const url = `${GOALS_API_BASE_URL}/budgets`;
        const response = await axios.post(url, data, { headers });
        return response.data;
    }

    static async deleteBudget(id: number): Promise<BudgetDto> {
        const headers = await this.getAuthHeader();
        const url = `${GOALS_API_BASE_URL}/budgets/${id}`;
        const response = await axios.delete(url, { headers });
        return response.data;
    }

    static async updateBudget(id: number, data: BudgetDto): Promise<BudgetDto> {
        const headers = await this.getAuthHeader();
        const url = `${GOALS_API_BASE_URL}/budgets/${id}`;
        const response = await axios.put(url, data, { headers });
        return response.data;
    }
}

export default BudgetService;