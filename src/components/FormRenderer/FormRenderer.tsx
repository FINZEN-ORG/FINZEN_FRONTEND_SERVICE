import React from 'react';
import { View } from 'react-native';
import { FormField as FormFieldType } from '../../types/form';
import { form as formStyles } from '../../styles/form';
import FormField from '../FormField/FormField';

export type FormRendererProps = {
  fields: FormFieldType[];
  values: Record<string, any>;
  onChange: (name: string, value: any) => void;
  errors?: Record<string, string | null>;
  skip?: string[];
};

const FormRenderer: React.FC<FormRendererProps> = ({ fields, values, onChange, errors = {}, skip = [] }) => {
  return (
    <View style={formStyles.container}>
      {fields
        .filter((f) => !skip.includes(f.name))
        .map((field) => (
          <FormField
            key={field.name}
            field={field}
            value={values[field.name]}
            onChange={onChange}
            error={errors[field.name] ?? null}
            containerStyle={formStyles.section}
            inputStyle={formStyles.input}
            labelStyle={formStyles.label}
          />
        ))}
    </View>
  );
};

export default FormRenderer;
