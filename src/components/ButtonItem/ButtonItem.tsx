import React from 'react';
import { TouchableOpacity, Text, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { FormButton } from '../../types/form';
import { form } from '../../styles/form';

export type ButtonItemProps = {
  btn: FormButton;
  onPress: () => void;
  buttonStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
};

const ButtonItem: React.FC<ButtonItemProps> = ({ btn, onPress, buttonStyle, labelStyle }) => {
  const isPrimary = btn.variant === 'primary';

  return (
    <TouchableOpacity
      key={btn.id}
      style={isPrimary ? [form.confirmButton, buttonStyle] : [form.cancelButton, buttonStyle]}
      onPress={onPress}
      disabled={btn.disabled}
    >
      <Text style={isPrimary ? [form.confirmButtonText, labelStyle] : [form.cancelButtonText, labelStyle]}>{btn.label}</Text>
    </TouchableOpacity>
  );
};

export default ButtonItem;
