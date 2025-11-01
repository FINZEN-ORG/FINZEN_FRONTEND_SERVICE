import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { form as formStyles } from '../../styles/form';
import { FormField as FormFieldType } from '../../types/form';
import DatePicker from '../DatePicker/DatePicker';

export type FormFieldProps = {
  field: FormFieldType;
  value: any;
  onChange: (name: string, value: any) => void;
  error?: string | null;
  containerStyle?: any;
  inputStyle?: any;
  labelStyle?: any;
};

export const FormField: React.FC<FormFieldProps> = ({ field, value, onChange, error, containerStyle, inputStyle, labelStyle }) => {
  const renderInput = () => {
    switch (field.type) {
      case 'number':
        return (
          <TextInput
            style={formStyles.input}
            value={value ?? ''}
            onChangeText={(t) => onChange(field.name, t)}
            placeholder={field.placeholder}
            placeholderTextColor="#e6eae6ce"
            keyboardType="numeric"
          />
        );
      case 'date':
        return (
          <DatePicker
            value={value}
            onDateChange={(d: string) => onChange(field.name, d)}
            placeholder={field.placeholder}
            format={(field as any).format ?? 'MM/DD/YYYY'}
          />
        );
      case 'text':
      default:
        return (
          <TextInput
            style={formStyles.input}
            value={value ?? ''}
            onChangeText={(t) => onChange(field.name, t)}
            placeholder={field.placeholder}
            placeholderTextColor="#e6eae6ce"
            multiline={field.name === 'description'}
            textAlignVertical={field.name === 'description' ? 'top' : 'center'}
          />
        );
    }
  };

  return (
    <View style={formStyles.section}>
      <Text style={formStyles.label}>{field.label}</Text>
      {renderInput()}
      {error ? <Text style={formStyles.errorText}>{error}</Text> : null}
    </View>
  );
};



export default FormField;
