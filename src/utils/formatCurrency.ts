/**
 * Utilidades de formateo de moneda para pesos colombianos (COP)
 */

/**
 * Formatea un número como moneda colombiana con separadores de miles
 * Ejemplo: 12875000 -> "$12.875.000"
 */
export const formatCOP = (amount: number): string => {
  return `$${amount.toLocaleString('es-CO', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
};

/**
 * Formatea un número grande en millones para una visualización compacta
 * Ejemplo: 12875000 -> "$12.9M"
 */
export const formatCOPCompact = (amount: number): string => {
  if (amount >= 1000000) {
    const millions = amount / 1000000;
    return `$${millions.toFixed(1)}M`;
  }
  
  if (amount >= 1000) {
    const thousands = amount / 1000;
    return `$${thousands.toFixed(0)}K`;
  }
  
  return `$${amount.toFixed(0)}`;
};

/**
 * Formatea moneda con decimales para balances precisos
 * Ejemplo: 12875000.50 -> "$12.875.000,50"
 */
export const formatCOPWithDecimals = (amount: number): string => {
  return `$${amount.toLocaleString('es-CO', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

/**
 * Formatea un número en formato de millones legible
 * Ejemplo: 12875000 -> "12.9 millones"
 */
export const formatMillions = (amount: number): string => {
  const millions = amount / 1000000;
  return `${millions.toFixed(1)} millones`;
};
