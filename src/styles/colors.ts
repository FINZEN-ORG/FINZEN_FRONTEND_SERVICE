// Paleta Finzen actualizada
// Colores proporcionados: #eafff2, #A9F8C4, #00C66D, #008942, #00481c

export const colors = {
  // Raw palette
  palette: {
    veryLight: '#eafff2', // fondo superior suave
    light: '#A9F8C4',     // tono medio para degradados
    accent: '#00C66D',    // color principal (botones, acciones)
    dark: '#008942',      // color principal oscuro (bordes, acentos)
    darkest: '#00481c',   // color más oscuro para contrastes
  },

  // Semantic tokens
  primary: '#00C66D',
  primaryDark: '#008942',
  primaryDarker: '#00481c',

  background: '#eafff2',
  backgroundSecondary: '#A9F8C4',
  surface: '#FFFFFF',

  // Text colors (permitidos adicionalmente: negro y blanco)
  textPrimary: '#000000',
  textSecondary: '#00481c',
  textLight: '#ffffff',

  // Borders / subtle elements
  border: '#dff6e9',
  borderLight: '#f4fff8',

  // Status
  success: '#00C66D',
  info: '#A9F8C4',
  warning: '#008942',
  error: '#E74C3C', // mantener rojo para errores

  // Financial semantic colors (aligned to palette)
  income: '#00C66D',
  savings: '#008942',
  investment: '#00481c',
  expense: '#FF7A6B',

  // UI helpers
  overlay: 'rgba(0,0,0,0.5)',
  shadow: 'rgba(4, 72, 28, 0.12)',
};

export default colors;