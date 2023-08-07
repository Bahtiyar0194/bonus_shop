import { ActivityIndicator, View } from 'react-native';
import { useTheme } from '../providers/ThemeProvider';
import CustomText from './CustomText';
import stylesConfig from '../config/styles';

export const Loader = (props) => {
    const { colors } = useTheme();

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: colors.inactive
        }}>
            <ActivityIndicator
                size={props.size || 50} color={colors.primary}
            />

            {props.text && <CustomText fontFamily={stylesConfig.fontFamily[500]} paddingVertical={10} textAlign={'center'}>{props.text}</CustomText>}
        </View>
    )
}