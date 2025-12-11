import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AI_SERVICE_BASE_URL } from "@env";

export interface GoalAnalysisInput {
    name: string;
    targetAmount: number;
    category: string;
    dueDate?: string;
    description?: string;
}

export interface AIRecommendation {
    message: string;
    isViable: boolean;
    suggestedMonthlyAmount?: number;
    warnings?: string[];
    tips?: string[];
}

export interface GoalAnalysisResponse {
    recommendation: string;
    isViable: boolean;
    suggestedMonthlyAmount?: number;
    analysis?: {
        viability: string;
        timeline: string;
        suggestions: string[];
    };
}

class AIService {
    static async getAuthHeader() {
        const token = await AsyncStorage.getItem("jwt");
        if (!token) throw new Error("No authentication token found");
        return { Authorization: `Bearer ${token}` };
    }

    /**
     * Solicita análisis de viabilidad de una meta a la IA
     * @param goalData - Datos de la meta a analizar
     * @returns Recomendación de la IA
     */
    static async analyzeGoalViability(goalData: GoalAnalysisInput): Promise<AIRecommendation> {
        try {
            const headers = await this.getAuthHeader();
            const url = `${AI_SERVICE_BASE_URL}/analyze`;
            
            const payload = {
                user_query: `Analiza la viabilidad de esta meta financiera: "${goalData.name}". Meta: $${goalData.targetAmount}, Categoría: ${goalData.category}, Fecha límite: ${goalData.dueDate || 'No especificada'}. Dame recomendaciones específicas y un ahorro mensual sugerido.`,
                goals: [],
                transactions: [],
                financial_context: null
            };

            const response = await axios.post(url, payload, { headers });
            
            // La respuesta del backend tiene formato: { response: string, ... }
            const aiResponse = response.data?.response || response.data?.recommendation || "";
            return this.parseAITextResponse(aiResponse);
        } catch (error: any) {
            console.error("Error analyzing goal with AI:", error);
            
            // Retornar recomendación básica en caso de error
            return {
                message: "No se pudo conectar con el servicio de IA. Verifica que tus datos sean correctos.",
                isViable: true,
                warnings: ["Servicio de IA temporalmente no disponible"]
            };
        }
    }

    /**
     * Solicita recomendaciones sobre metas existentes
     * @returns Sugerencias de la IA sobre metas del usuario
     */
    static async getGoalSuggestions(): Promise<string[]> {
        try {
            const headers = await this.getAuthHeader();
            const url = `${AI_SERVICE_BASE_URL}/analyze/goals`;
            
            const payload = {
                query: "Dame sugerencias sobre mis metas financieras actuales y cómo optimizar mi ahorro."
            };

            const response = await axios.post(url, payload, { headers });
            
            if (response.data?.analysis?.suggestions) {
                return response.data.analysis.suggestions;
            }
            
            return [response.data?.recommendation || "Continúa ahorrando de forma consistente."];
        } catch (error) {
            console.error("Error getting AI suggestions:", error);
            return [];
        }
    }

    /**
     * Solicita sugerencia de nueva meta basada en análisis financiero del usuario
     * @returns Sugerencia de nueva meta personalizada
     */
    static async suggestNewGoal(): Promise<string | null> {
        try {
            const headers = await this.getAuthHeader();
            const url = `${AI_SERVICE_BASE_URL}/analyze`;
            
            const payload = {
                user_query: "Basado en mis hábitos de gasto y mi situación financiera actual, ¿qué meta financiera me recomiendas crear? Por favor sugiere una meta específica con nombre y monto aproximado. Ejemplo: '¡Ahorra para tu próximo viaje! Te sugerimos crear una meta de $5,000,000 para un viaje en los próximos 12 meses. Has mostrado capacidad de ahorro constante.'",
                goals: [],
                transactions: [],
                financial_context: null
            };

            const response = await axios.post(url, payload, { headers });
            
            return response.data?.response || response.data?.recommendation || null;
        } catch (error) {
            console.error("Error getting new goal suggestion:", error);
            return null;
        }
    }

    /**
     * Parsea la respuesta de texto de la IA y extrae información relevante
     */
    private static parseAITextResponse(aiText: string): AIRecommendation {
        // Extraer monto mensual sugerido si está en el texto
        let suggestedAmount: number | undefined;
        const amountMatch = aiText.match(/\$?([\d,]+)\s*(?:por mes|mensual|al mes)/i);
        if (amountMatch) {
            suggestedAmount = parseFloat(amountMatch[1].replace(/,/g, ''));
        }

        // Determinar viabilidad
        const isViable = !aiText.toLowerCase().includes('no es viable') &&
                        !aiText.toLowerCase().includes('muy difícil') &&
                        !aiText.toLowerCase().includes('imposible');

        // Extraer tips (buscar bullets o listas)
        const tips: string[] = [];
        const bulletMatches = aiText.match(/[•\-*]\s*([^\n]+)/g);
        if (bulletMatches) {
            bulletMatches.forEach(bullet => {
                const cleanTip = bullet.replace(/^[•\-*]\s*/, '').trim();
                if (cleanTip) tips.push(cleanTip);
            });
        }
        
        return {
            message: aiText,
            isViable,
            suggestedMonthlyAmount: suggestedAmount,
            tips: tips.length > 0 ? tips : undefined
        };
    }
}

export default AIService;
