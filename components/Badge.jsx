import { View } from 'react-native';
import { useTheme } from '../providers/ThemeProvider';
import CustomText from './CustomText';
import stylesConfig from '../config/styles';

export const Badge = (props) => {

    const { colors } = useTheme();

    return (
        <View style={{ paddingHorizontal: 4, minWidth: 18, height: 18, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: colors.secondary, borderRadius: 18 }}>
            <CustomText color={colors.secondary} fontFamily={stylesConfig.fontFamily[500]} size={stylesConfig.fontSize.text_sm}>{props.badge}</CustomText>
        </View>
    )
}