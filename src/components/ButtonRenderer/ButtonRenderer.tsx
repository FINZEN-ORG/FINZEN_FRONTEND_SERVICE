import React from 'react';
import { View, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { FormButton } from '../../types/form';
import { form } from '../../styles/form';
import ButtonItem from '../ButtonItem';

export type ButtonRendererProps = {
  buttons: FormButton[];
  handlers?: Record<string, () => void>;
  containerStyle?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
};

const ButtonRenderer: React.FC<ButtonRendererProps> = ({ buttons, handlers = {}, containerStyle, buttonStyle, labelStyle }) => {
  return (
    <View style={[form.buttonsContainer, containerStyle]}>
      {buttons.map((btn) => {
        const onPress = handlers[btn.id] ?? btn.onPress ?? (() => {});
        return (
          <ButtonItem key={btn.id} btn={btn} onPress={() => onPress()} buttonStyle={buttonStyle} labelStyle={labelStyle} />
        );
      })}
    </View>
  );
};

export default ButtonRenderer;
