import { FormField, FormButton } from '../../types/form';

export const userFields: FormField[] = [
    { name: 'amount', label: 'Monto del gasto', placeholder: '$ 0.00', type: 'number' },
    { name: 'description', label: 'Descripción', placeholder: 'Ej: Café con amigos', type: 'text' },
    { name: 'date', label: 'Fecha', placeholder: 'Ingrese la fecha', type: 'date' },
];
    
// Buttons in config should be declarative. Wire actual handlers in the screen using the hook.
export const userButtons: FormButton[] = [
  {
    id: 'confirm',
    label: 'Confirmar',
    variant: 'primary',
    onPress: () => {},
  },
  {
    id: 'cancel',
    label: 'Cancelar',
    variant: 'secondary',
    onPress: () => {},
  },
];
