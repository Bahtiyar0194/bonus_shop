import { Text } from 'react-native';
import stylesConfig from '../config/styles';
import { useTheme } from '../providers/ThemeProvider';

export default function CustomText(props) {
    const { colors } = useTheme();
    return (
        <Text style={{
            flex: props.flex || 0,
            fontSize: props.size || stylesConfig.fontSize.text_base,
            fontFamily: props.fontFamily || stylesConfig.fontFamily[400],
            color: props.color || colors.text,
            textAlign: props.textAlign || 'left',
            marginTop: props.marginTop,
            marginBottom: props.marginBottom,
            position: props.position || 'relative',
            top: props.top || null,
            left: props.left || null,
            padding: props.padding,
            paddingVertical: props.paddingVertical,
            paddingHorizontal: props.paddingHorizontal,
            backgroundColor: props.backgroundColor || null
        }}>
            {props.children}
        </Text>
    )
}