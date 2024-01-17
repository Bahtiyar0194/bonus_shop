import CustomText from "../../components/CustomText";
import stylesConfig from "../../config/styles";
import { FlexWrap } from "../../components/FlexWrap";
import { useTheme } from "../../providers/ThemeProvider";

export default function Footer(props) {
    const { colors } = useTheme();
    return (
        <FlexWrap width={'100%'} alignItems={'center'} justifyContent={'center'}>
            <CustomText color={colors.secondary} size={stylesConfig.fontSize.text_xs} font={stylesConfig.fontFamily[400]}>
                Bonus.Shop &copy; 2023
            </CustomText>
        </FlexWrap>
    )
}