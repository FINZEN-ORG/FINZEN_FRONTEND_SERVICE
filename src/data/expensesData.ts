// Data de simulación para ExpenseCards 😎
export interface ExpenseData {
  id: number;
  categoryIcon: string;
  description: string;
  amount: number;
  date: string;
  category: string;
}

export const expensesData: ExpenseData[] = [
  // Comida y Restaurants 🍕
  {
    id: 1,
    categoryIcon: "🍕",
    description: "Pizza Domino's familiar",
    amount: 28.99,
    date: "2025-10-02",
    category: "comida"
  },
  {
    id: 2,
    categoryIcon: "☕",
    description: "Starbucks - Frappé venti",
    amount: 7.50,
    date: "2025-10-02",
    category: "comida"
  },
  {
    id: 3,
    categoryIcon: "🍔",
    description: "McDonald's - BigMac combo",
    amount: 12.45,
    date: "2025-10-01",
    category: "comida"
  },
  {
    id: 4,
    categoryIcon: "🌮",
    description: "Tacos El Patrón",
    amount: 15.80,
    date: "2025-09-30",
    category: "comida"
  },

  // Transporte 🚗
  {
    id: 5,
    categoryIcon: "⛽",
    description: "Gasolina Shell",
    amount: 45.00,
    date: "2025-10-01",
    category: "transporte"
  },
  {
    id: 6,
    categoryIcon: "🚗",
    description: "Uber a casa",
    amount: 18.25,
    date: "2025-09-29",
    category: "transporte"
  },
  {
    id: 7,
    categoryIcon: "🚌",
    description: "Recarga tarjeta metro",
    amount: 20.00,
    date: "2025-09-28",
    category: "transporte"
  },

  // Compras y Supermercado 🛒
  {
    id: 8,
    categoryIcon: "🛒",
    description: "Walmart - Despensa semanal",
    amount: 85.50,
    date: "2025-09-30",
    category: "supermercado"
  },
  {
    id: 9,
    categoryIcon: "🧻",
    description: "Farmacia - Productos higiene",
    amount: 32.75,
    date: "2025-09-29",
    category: "salud"
  },
  {
    id: 10,
    categoryIcon: "👕",
    description: "Zara - Camisa casual",
    amount: 45.99,
    date: "2025-09-28",
    category: "ropa"
  },

  // Entretenimiento 🎮
  {
    id: 11,
    categoryIcon: "🎬",
    description: "Netflix - Suscripción mensual",
    amount: 15.99,
    date: "2025-09-30",
    category: "streaming"
  },
  {
    id: 12,
    categoryIcon: "🎮",
    description: "Steam - Cyberpunk DLC",
    amount: 29.99,
    date: "2025-09-27",
    category: "videojuegos"
  },
  {
    id: 13,
    categoryIcon: "🎭",
    description: "Cine - Entradas Dune 2",
    amount: 24.00,
    date: "2025-09-26",
    category: "entretenimiento"
  },

  // Servicios y Suscripciones 📱
  {
    id: 14,
    categoryIcon: "📱",
    description: "Telcel - Plan mensual",
    amount: 35.00,
    date: "2025-10-01",
    category: "telefonía"
  },
  {
    id: 15,
    categoryIcon: "💡",
    description: "CFE - Recibo de luz",
    amount: 78.45,
    date: "2025-09-25",
    category: "servicios"
  },
  {
    id: 16,
    categoryIcon: "🌐",
    description: "Internet Telmex",
    amount: 42.99,
    date: "2025-09-24",
    category: "internet"
  },

  // Salud y Fitness 💊
  {
    id: 17,
    categoryIcon: "💊",
    description: "Farmacia Guadalajara",
    amount: 125.50,
    date: "2025-09-25",
    category: "medicina"
  },
  {
    id: 18,
    categoryIcon: "🏋️",
    description: "Smart Fit - Mensualidad",
    amount: 39.00,
    date: "2025-09-23",
    category: "gimnasio"
  },

  // Gastos Random y Divertidos 😅
  {
    id: 19,
    categoryIcon: "🎁",
    description: "Amazon - Gadget inútil",
    amount: 67.89,
    date: "2025-09-22",
    category: "compras online"
  },
  {
    id: 20,
    categoryIcon: "🍦",
    description: "Helado Ben & Jerry's 2x1",
    amount: 9.99,
    date: "2025-09-21",
    category: "antojo"
  },
  {
    id: 21,
    categoryIcon: "🚖",
    description: "Taxi porque llovía",
    amount: 14.50,
    date: "2025-09-20",
    category: "emergencia"
  },
  {
    id: 22,
    categoryIcon: "📚",
    description: "Libro - Clean Code",
    amount: 35.00,
    date: "2025-09-19",
    category: "educación"
  },
  {
    id: 23,
    categoryIcon: "🧸",
    description: "Regalo cumpleaños mamá",
    amount: 89.99,
    date: "2025-09-18",
    category: "regalos"
  },
  {
    id: 24,
    categoryIcon: "🍷",
    description: "Vino para la cena romántica",
    amount: 25.75,
    date: "2025-09-17",
    category: "alcohol"
  },
  {
    id: 25,
    categoryIcon: "🎧",
    description: "Spotify Premium",
    amount: 11.99,
    date: "2025-09-16",
    category: "música"
  }
];

// Función para obtener gastos recientes (últimos 7 días)
export const getRecentExpenses = (): ExpenseData[] => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
  return expensesData.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate >= sevenDaysAgo;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// Función para obtener gastos por categoría
export const getExpensesByCategory = (category: string): ExpenseData[] => {
  return expensesData.filter(expense => expense.category === category);
};

// Función para calcular total de gastos
export const getTotalExpenses = (expenses: ExpenseData[] = expensesData): number => {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
};

// Función para obtener las categorías más gastadas
export const getTopCategories = (limit: number = 5) => {
  const categoryTotals: { [key: string]: number } = {};
  
  expensesData.forEach(expense => {
    if (categoryTotals[expense.category]) {
      categoryTotals[expense.category] += expense.amount;
    } else {
      categoryTotals[expense.category] = expense.amount;
    }
  });
  
  return Object.entries(categoryTotals)
    .sort(([,a], [,b]) => b - a)
    .slice(0, limit)
    .map(([category, total]) => ({ category, total }));
};

// Gastos del día actual para testing rápido
export const todayExpenses = expensesData.filter(expense => 
  expense.date === "2025-10-02"
);