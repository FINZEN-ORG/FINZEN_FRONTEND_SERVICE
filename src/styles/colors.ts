// Paleta Finzen actualizada
// Colores proporcionados: #EAFFF2, #e4ffed, #cdfedc, #a9f8c4, #30e88c, #5fdc93, #00c66d, #00A654, #008942, #00662d, #00481c
export const colors = {
  // Full palette array (top -> bottom as provided)
  paletteArray: [
    '#EAFFF2',
    '#e4ffed',
    '#cdfedc',
    '#a9f8c4',
    '#30e88c',
    '#5fdc93',
    '#00c66d',
    '#00A654',
    '#008942',
    '#00662d',
    '#00481c',
  ],

  // Named tokens for easier consumption across the app
  primary: '#00c66d',
  primaryAlt: '#00A654',
  primaryDark: '#008942',
  primaryDarker: '#00662d',
  primaryDeep: '#00481c',

  // Light backgrounds (usable for gradients or layers)
  backgroundLightest: '#EAFFF2',
  backgroundLighter: '#e4ffed',
  backgroundLight: '#cdfedc',
  backgroundSoft: '#a9f8c4',

  // Accent mid tones
  accentLight: '#30e88c',
  accent: '#5fdc93',

  // General UI tokens
  background: '#EAFFF2',
  surface: '#FFFFFF',
  textPrimary: '#000000',
  textSecondary: '#00481c',
  textOnPrimary: '#ffffff',

  // Borders / subtle elements
  border: '#dff6e9',
  borderLight: '#f4fff8',

  // Status
  success: '#00c66d',
  info: '#a9f8c4',
  warning: '#008942',
  error: '#E74C3C',

  // Financial semantic colors (aligned to palette)
  income: '#00c66d',
  savings: '#008942',
  investment: '#00481c',
  expense: '#FF7A6B',

  // UI helpers
  overlay: 'rgba(0,0,0,0.5)',
  shadow: 'rgba(4, 72, 28, 0.12)',

  // --- AGREGADOS PARA CORREGIR ERRORES TS ---
  // Usado en tarjetas y fondos secundarios (gris muy claro)
  backgroundSecondary: '#F7F8F7',
  // Usado en textos sobre fondos oscuros
  textWhite: '#FFFFFF',
  // Usado en inputs o textos deshabilitados (gris suave)
  textLight: '#999999',
  // El color morado que se ve en tus capturas (Balance Card)
  secondary: '#6C5CE7',
  // Objeto requerido por AIMessage
  aiMessages: {
    emergency: '#E74C3C', // Rojo error
    regular: '#FFD93D',   // Amarillo advertencia
    good: '#00c66d',      // Tu verde primario
    info: '#6C5CE7'       // Morado info
  }
};

export default colors;