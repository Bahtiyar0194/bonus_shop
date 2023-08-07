import { Pressable } from 'react-native';
import CustomText from './CustomText';
import { useTheme } from '../providers/ThemeProvider';
import stylesConfig from '../config/styles';

export const PressableLink = (props) => {
    const { colors } = useTheme();
    return (
        <Pressable width={props.width || null} onPress={props.onPressHandle}>
            <CustomText
                fontFamily={stylesConfig.fontFamily[500]}
                size={props.size || stylesConfig.fontSize.text_base}
                color={props.color || colors.primary}>
                {props.text}
            </CustomText>
        </Pressable>
    )
}