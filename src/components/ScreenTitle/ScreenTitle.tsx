import { Text, View } from "react-native";
import {globalStyles} from '../../styles/index';


interface ScreenTitleProps {
  title: string;
  subtitle?: string;
};

const ScreenTitle: React.FC<ScreenTitleProps> = ({ title, subtitle }) => {
  return (
    <View style={globalStyles.headerContainer}>
      <Text style={globalStyles.title}>{title}</Text>
      <Text style={globalStyles.subtitle}>{subtitle}</Text>
    </View>
  );
};

export default ScreenTitle;