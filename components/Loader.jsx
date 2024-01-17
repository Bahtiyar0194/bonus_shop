import { ActivityIndicator, View } from 'react-native';
import { useTheme } from '../providers/ThemeProvider';
import CustomText from './CustomText';
import stylesConfig from '../config/styles';

export const Loader = (props) => {
    const { colors, dark } = useTheme();

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: dark ? colors.active : colors.primary
        }}>
            <ActivityIndicator
                size={props.size || 50} color={colors.warning}
            />

            {props.text && <CustomText fontFamily={stylesConfig.fontFamily[500]} paddingVertical={10} textAlign={'center'}>{props.text}</CustomText>}
        </View>
    )
}