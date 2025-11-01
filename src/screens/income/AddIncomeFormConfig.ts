import { FormField, FormButton } from '../../types/form';

export const userFields: FormField[] = [
  { name: 'amount', label: 'Monto del ingreso', placeholder: '$ 0.00', type: 'number' },
  { name: 'description', label: 'Descripción', placeholder: 'Ej: Pago extra', type: 'text' },
  { name: 'date', label: 'Fecha', placeholder: 'Ingrese la fecha', type: 'date' },
];

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
