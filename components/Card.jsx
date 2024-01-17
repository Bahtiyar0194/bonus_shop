import { View } from 'react-native';
import { useTheme } from '../providers/ThemeProvider';

export const Card = (props) => {

    const { colors, dark } = useTheme();

    return (
        <View style={{
            padding: 15,
            marginBottom: props.marginBottom,
            backgroundColor: props.backgroundColor || colors.active,
            borderRadius: 10,
            borderWidth: dark ? 0 : props.borderWidth,
            borderColor: props.borderColor || colors.border,
            width: '100%'
        }}>
            {props.children}
        </View>
    )
}