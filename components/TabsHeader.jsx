import { FlexWrap } from './FlexWrap';
import { FlexColumn } from './FlexColumn';
import CustomText from './CustomText';
import { CustomButton } from './CustomButton';
import { useTheme } from '../providers/ThemeProvider';

export const TabsHeader = ({ tabs, tab, setTab }) => {
    const { colors } = useTheme();
    return (
        <FlexColumn marginTop={10}>
            <FlexWrap>
                {tabs.map((item, index) => (
                    <CustomButton
                        color={colors.active}
                        key={index}
                        borderWidth={1}
                        borderColor={index == tab ? colors.primary : colors.border}
                        badge={item.badge}
                        onPressHandle={() => setTab(index)}>
                        <CustomText>
                            {item.name}
                        </CustomText>
                    </CustomButton>
                ))}
            </FlexWrap>
        </FlexColumn>
    )
}