import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GOALS_API_BASE_URL } from "@env";

export enum GoalCategory {
    TRAVEL = 'TRAVEL',
    EMERGENCY_FUND = 'EMERGENCY_FUND',
    EDUCATION = 'EDUCATION',
    TECHNOLOGY = 'TECHNOLOGY',
    VEHICLE = 'VEHICLE',
    HOME = 'HOME',
    INVESTMENT = 'INVESTMENT',
    OTHER = 'OTHER'
}

export interface GoalDto {
    id?: number;
    name: string;
    description?: string;
    targetAmount: number;
    savedAmount?: number;
    category: GoalCategory;
    status?: string;
    dueDate?: string;
}

class GoalService {
    static async getAuthHeader() {
        const token = await AsyncStorage.getItem("jwt");
        if (!token) throw new Error("No authentication token found");
        return { Authorization: `Bearer ${token}` };
    }

    static async getAllGoals(): Promise<GoalDto[]> {
        const headers = await this.getAuthHeader();
        const url = `${GOALS_API_BASE_URL}/goals`;
        const response = await axios.get(url, { headers });
        return response.data;
    }

    static async createGoal(data: GoalDto): Promise<GoalDto> {
        const headers = await this.getAuthHeader();
        const url = `${GOALS_API_BASE_URL}/goals`;
        const response = await axios.post(url, data, { headers });
        return response.data;
    }

    // Lógica de Alcancía
    static async deposit(id: number, amount: number): Promise<GoalDto> {
        const headers = await this.getAuthHeader();
        const url = `${GOALS_API_BASE_URL}/goals/${id}/deposit`;
        const response = await axios.post(url, { amount }, { headers });
        return response.data;
    }

    static async withdraw(id: number, amount: number): Promise<GoalDto> {
        const headers = await this.getAuthHeader();
        const url = `${GOALS_API_BASE_URL}/goals/${id}/withdraw`;
        const response = await axios.post(url, { amount }, { headers });
        return response.data;
    }
}
export default GoalService;