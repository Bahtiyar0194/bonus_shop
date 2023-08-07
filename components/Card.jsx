import { View } from 'react-native';
import { useTheme } from '../providers/ThemeProvider';

export const Card = (props) => {

    const { colors } = useTheme();

    return (
        <View style={{
            padding: 12,
            marginBottom: props.marginBottom,
            backgroundColor: props.backgroundColor || colors.active,
            borderRadius: 10,
            borderWidth: props.borderWidth,
            borderColor: colors.border,
            width: '100%'
        }}>
            {props.children}
        </View>
    )
}