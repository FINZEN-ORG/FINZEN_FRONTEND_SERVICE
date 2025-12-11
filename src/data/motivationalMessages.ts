export const motivationalMessages = {
  formal: [
    'Excelente gestión financiera. Su disciplina lo acerca significativamente a sus objetivos económicos. 💼',
    'Le felicito por mantener un registro ordenado de sus finanzas. Esta es la base del éxito patrimonial. 📊',
    'Cada decisión financiera consciente que toma hoy construye la estabilidad económica del mañana. 💎',
    'Su compromiso con la planificación financiera es digno de reconocimiento. Continúe con esta trayectoria. 🎯',
    'La constancia en el control de gastos demuestra madurez financiera. Está en el camino correcto. 📈',
    'Su capacidad para administrar sus recursos es notable. Los resultados se reflejarán pronto. 💰',
    'Mantener la disciplina financiera requiere carácter. Usted lo está demostrando admirablemente. 🏆',
    'El hábito del ahorro que está desarrollando le proporcionará tranquilidad y oportunidades futuras. 🌟',
  ],
  amigable: [
    '¡Muy bien! Estás llevando tus finanzas de manera excelente. Sigue así. 💪',
    '¡Felicitaciones! Cada paso que das te acerca más a tus metas financieras. 🌟',
    'Llevas un gran control de tus gastos. Esto te traerá muchos beneficios. 📊',
    '¡Excelente trabajo! Tu esfuerzo por ahorrar vale mucho. Continúa por ese camino. 💰',
    'Cada decisión financiera inteligente que tomas construye un mejor futuro. 🎯',
    '¡Vas muy bien! Tu disciplina con el dinero te llevará lejos. 🚀',
    'Registrar tus gastos es un gran hábito. Estás haciendo las cosas bien. ✨',
    '¡Sigue adelante! Tu compromiso con tus finanzas te dará muchas alegrías. 🌈',
  ],
  relaxed: [
    '¡Ey, qué crack! Llevas las finanzas como todo un jefe. Así se hace, parcero. 🔥',
    '¡Uff, qué chimba! Cada pesito que ahorras te acerca a vivir la vida que te mereces. 💪',
    'Mira nada más, ¡vas re bien! Sigue así que vas a lograr cosas increíbles. 🚀',
    'Brother, controlar tus gastos así es de campeones. ¡Dale con todo! 🎉',
    'Tu yo del futuro va a estar re agradecido por todo lo que haces hoy. ¡Sigue metiéndole! 🌈',
    '¡Woow! Administrar la plata así es de pros. Vas que lo petas. 💫',
    'Cada ticket que registras es oro puro para tu futuro. ¡No aflojés! 🦸',
    'Che, con esa actitud financiera vas a llegar lejísimos. ¡A darle nomás! 🎯',
  ],
};

export const getRandomMessage = (tone: 'formal' | 'amigable' | 'relaxed' = 'amigable'): string => {
  const messages = motivationalMessages[tone];
  return messages[Math.floor(Math.random() * messages.length)];
};

export const loadingMessages = [
  'Preparando tu dosis de motivación... ✨',
  'Cargando inspiración financiera... 💡',
  'Un momento, buscando palabras de aliento... 🌟',
  'Generando tu mensaje del día... 🎯',
];

export const getRandomLoadingMessage = (): string => {
  return loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
};
