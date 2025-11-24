export type QuestionType =
  | 'text'
  | 'single-select'
  | 'multi-select'
  | 'scale';

export interface BaseQuestion {
  id: string;
  type: QuestionType;
  label: string;
  helperText?: string;
}

export interface SingleSelectQuestion extends BaseQuestion {
  type: 'single-select';
  options: string[];
}

export interface MultiSelectQuestion extends BaseQuestion {
  type: 'multi-select';
  options: string[];
}

export interface ScaleQuestion extends BaseQuestion {
  type: 'scale';
  scale: number[];
}

export interface TextQuestion extends BaseQuestion {
  type: 'text';
}

export type Question =
  | SingleSelectQuestion
  | MultiSelectQuestion
  | ScaleQuestion
  | TextQuestion;

export interface OnboardingScreen {
  title: string;
  description: string;
  questions: Question[];
  footerMessage: string;
}

export interface ToneConfig {
  screen1: OnboardingScreen;
  screen2: OnboardingScreen;
  screen3: OnboardingScreen;
}

export type Tone = 'formal' | 'friendly' | 'motivating' | 'direct';


export const NeutralScreen: OnboardingScreen = {
  title: 'Tu camino financiero empieza aquí ✨',
  description:
    'Organiza tu dinero, crea metas y recibe recomendaciones a tu medida.',
  questions: [
    {
      id: 'objetivos',
      type: 'multi-select',
      label: '¿Qué quieres lograr con la app?',
      options: [
        '💰 Ahorrar dinero',
        '📊 Organizar mis gastos',
        '📉 Pagar mis deudas',
        '🎯 Lograr una meta personal',
        '🌱 Mejorar mi calidad de vida',
        '📈 Control de mis ingresos',
      ],
    },
    {
      id: 'nombre',
      type: 'text',
      label: '¿Cómo quieres que te llame?',
    },
    {
      id: 'tono',
      type: 'single-select',
      label: '¿Qué tono prefieres?',
      options: ['Formal', 'Amigable', 'Motivador', 'Directo'],
    },
  ],
  footerMessage: '¡Perfecto! ✅ Ya casi terminamos.',
};


export const onboardingQuestionsByTone: Record<Tone, Omit<ToneConfig, 'screen1'>> = {
  formal: {
    screen2: {
      title: 'Tu contexto de vida',
      description:
        'Para ofrecer recomendaciones precisas, necesitamos conocer su ubicación y situación. 💼',
      questions: [
        { id: 'ciudad', type: 'text', label: '¿En qué ciudad vive?' },
        {
          id: 'zona',
          type: 'text',
          label: '¿En qué zona o barrio pasa la mayor parte del tiempo?',
          helperText: 'Esto nos ayudará a ofrecer recomendaciones realistas según su zona. 🗺️',
        },
        {
          id: 'convivencia',
          type: 'single-select',
          label: '¿Vive solo/a o acompañado/a?',
          options: ['Solo/a', 'Con pareja', 'Con familiares', 'Con roommates'],
        },
      ],
      footerMessage: 'Excelente. ✅ Ya casi terminamos.',
    },
    screen3: {
      title: 'Tu perfil financiero',
      description:
        'Con estos datos podemos generar un presupuesto inicial y empezar a ayudarlo a cumplir sus metas. 💼',
      questions: [
        {
          id: 'ingreso',
          type: 'single-select',
          label: '¿Cuál es su ingreso mensual aproximado?',
          options: ['Fijo', 'Variable', 'Mixto'],
        },
        {
          id: 'metaPrincipal',
          type: 'single-select',
          label: '¿Cuál es su meta principal?',
          options: ['Ahorrar', 'Pagar deudas', 'Organizar mis gastos', 'Lograr una meta personal', 'Mejorar mi calidad de vida'],
        },
        {
          id: 'importanciaAhorro',
          type: 'scale',
          label: '¿Qué tan importante es ahorrar para usted ahora mismo?',
          scale: [1, 2, 3, 4, 5],
        },
        {
          id: 'ocio',
          type: 'single-select',
          label: '¿Desea incluir ocio en su presupuesto?',
          options: ['Sí', 'No', 'Un poco', 'Lo mínimo'],
        },
      ],
      footerMessage: 'Listo.Podemos comenzar.',
    },
  },

  friendly: {
    screen2: {
      title: 'Tu contexto de vida',
      description:
        'Para darte sugerencias realistas, necesito saber dónde pasas más tiempo. 😊',
      questions: [
        { id: 'ciudad', type: 'text', label: '¿En qué ciudad vives?' },
        {
          id: 'zona',
          type: 'text',
          label: '¿En qué barrio o zona pasas la mayor parte del tiempo?',
          helperText: 'Esto me ayudará a adaptar tus recomendaciones. 🗺️',
        },
        {
          id: 'convivencia',
          type: 'single-select',
          label: '¿Vives solo/a o acompañado/a?',
          options: ['Solo/a', 'Con pareja', 'Con familiares', 'Con roommates'],
        },
      ],
      footerMessage: '¡Genial! 🙌 Ya casi terminamos.',
    },
    screen3: {
      title: 'Tu perfil financiero',
      description:
        'Con estos datos podré armar un presupuesto inicial y empezar a darte consejos. 😊',
      questions: [
        {
          id: 'ingreso',
          type: 'single-select',
          label: '¿Cuál es tu ingreso mensual aproximado?',
          options: ['Fijo', 'Variable', 'Mixto'],
        },
        {
          id: 'metaPrincipal',
          type: 'single-select',
          label: '¿Cuál es tu meta principal?',
          options: ['Ahorrar', 'Pagar deudas', 'Organizar mis gastos', 'Lograr una meta personal', 'Mejorar mi calidad de vida'],
        },
        {
          id: 'importanciaAhorro',
          type: 'scale',
          label: '¿Qué tan importante es ahorrar para ti ahora mismo?',
          scale: [1, 2, 3, 4, 5],
        },
        {
          id: 'ocio',
          type: 'single-select',
          label: '¿Quieres incluir ocio en tu presupuesto?',
          options: ['Sí', 'No', 'Un poco', 'Lo mínimo'],
        },
      ],
      footerMessage: '¡Listo! 🚀 Vamos a empezar.',
    },
  },

  motivating: {
    screen2: {
      title: 'Tu contexto de vida',
      description:
        'Para darte recomendaciones poderosas, dime dónde pasas más tiempo. 🚀',
      questions: [
        { id: 'ciudad', type: 'text', label: '¿En qué ciudad vives?' },
        {
          id: 'zona',
          type: 'text',
          label: '¿En qué barrio o zona pasas la mayor parte del tiempo?',
          helperText: 'Esto me permitirá darte sugerencias más efectivas. 🗺️',
        },
        {
          id: 'convivencia',
          type: 'single-select',
          label: '¿Vives solo/a o acompañado/a?',
          options: ['Solo/a', 'Con pareja', 'Con familiares', 'Con roommates'],
        },
      ],
      footerMessage: '¡Perfecto! 🙌 Ya casi terminamos.',
    },
    screen3: {
      title: 'Tu perfil financiero',
      description:
        'Con estos datos vamos a crear un plan que te lleve directo a tus metas. 🚀',
      questions: [
        {
          id: 'ingreso',
          type: 'single-select',
          label: '¿Cuál es tu ingreso mensual aproximado?',
          options: ['Fijo', 'Variable', 'Mixto'],
        },
        {
          id: 'metaPrincipal',
          type: 'single-select',
          label: '¿Cuál es tu meta principal?',
          options: ['Ahorrar', 'Pagar deudas', 'Organizar mis gastos', 'Lograr una meta personal', 'Mejorar mi calidad de vida'],
        },
        {
          id: 'importanciaAhorro',
          type: 'scale',
          label: '¿Qué tan importante es ahorrar en este momento?',
          scale: [1, 2, 3, 4, 5],
        },
        {
          id: 'ocio',
          type: 'single-select',
          label: '¿Quieres incluir ocio en tu presupuesto?',
          options: ['Sí', 'No', 'Un poco', 'Lo mínimo'],
        },
      ],
      footerMessage: '¡Listo! 🚀 ¡Vamos por tus metas!',
    },
  },

  direct: {
    screen2: {
      title: 'Contexto',
      description: 'Dime dónde pasas la mayor parte del tiempo. ⚡',
      questions: [
        { id: 'ciudad', type: 'text', label: 'Ciudad' },
        {
          id: 'zona',
          type: 'text',
          label: 'Barrio o zona',
          helperText: 'Para dar sugerencias realistas. 🗺️',
        },
        {
          id: 'convivencia',
          type: 'single-select',
          label: '¿Vives solo/a o acompañado/a?',
          options: ['Solo/a', 'Con pareja', 'Con familiares', 'Con roommates'],
        },
      ],
      footerMessage: 'Bien. ⚡ Continuemos.',
    },
    screen3: {
      title: 'Perfil financiero',
      description: 'Datos rápidos para tu presupuesto. ⚡',
      questions: [
        {
          id: 'ingreso',
          type: 'single-select',
          label: 'Ingreso mensual (aprox.)',
          options: ['Fijo', 'Variable', 'Mixto'],
        },
        {
          id: 'metaPrincipal',
          type: 'single-select',
          label: 'Meta principal',
          options: ['Ahorrar', 'Pagar deudas', 'Organizar gastos', 'Meta personal', 'Mejorar vida'],
        },
        {
          id: 'importanciaAhorro',
          type: 'scale',
          label: '¿Qué tan importante es ahorrar ahora?',
          scale: [1, 2, 3, 4, 5],
        },
        {
          id: 'ocio',
          type: 'single-select',
          label: 'Incluir ocio en presupuesto?',
          options: ['Sí', 'No', 'Un poco', 'Mínimo'],
        },
      ],
      footerMessage: 'Listo. ⚡ Hecho.',
    },
  },
};


export function getOnboardingForTone(tone: Tone) {
  return {
    screen1: NeutralScreen,
    screen2: onboardingQuestionsByTone[tone].screen2,
    screen3: onboardingQuestionsByTone[tone].screen3,
  } as ToneConfig;
}

export default {
  NeutralScreen,
  onboardingQuestionsByTone,
  getOnboardingForTone,
};
