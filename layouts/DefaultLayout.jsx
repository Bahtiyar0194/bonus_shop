import Container from "../components/Container";
import CustomText from "../components/CustomText";
import stylesConfig from "../config/styles";
import { Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FlexWrap } from "../components/FlexWrap";
import { useTheme } from "../providers/ThemeProvider";

export default function DefaultLayout(props) {
    const { colors } = useTheme();
    return (
        <Container justifyContent={props.justifyContent || 'space-between'} alignItems={props.alignItems}>
            <FlexWrap gap={15}>
                <Pressable
                    style={{
                        width: 30,
                        height: 30,
                        backgroundColor: colors.active,
                        borderWidth: 1,
                        borderColor: colors.border,
                        borderRadius: 15,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress={() => props.navigation.goBack()}>
                    <Ionicons name='arrow-back-outline' size={24} color={colors.secondary} />
                </Pressable>
                <CustomText flex={1} size={stylesConfig.fontSize.text_base} fontFamily={stylesConfig.fontFamily[700]}>
                    {props.title}
                </CustomText>
            </FlexWrap>
            {props.children}
            <FlexWrap width={'100%'} alignItems={'center'} justifyContent={'center'}>
                <CustomText color={colors.secondary} font={stylesConfig.fontFamily[400]}>
                    Bonus.Shop &copy; 2023
                </CustomText>
            </FlexWrap>
        </Container>
    )
}