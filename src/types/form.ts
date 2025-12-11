export type FieldType = 'text' | 'number' | 'select' | 'email' | 'password'| 'date';

export interface FormField {
  name: string;
  label: string;
  placeholder?: string;
  type: FieldType;
  options?: string[]; 
}

export interface FormButton {
  /** Unique identifier for the button (used as React key and handler lookup) */
  id: string;
  label: string;
  variant?: 'primary' | 'secondary' | 'danger';
  onPress?: (formValues?: Record<string, any>) => void;
  disabled?: boolean;
}
