import CustomText from './CustomText';
import { CustomButton } from './CustomButton';
import { FlexWrap } from './FlexWrap';
import { FlexColumn } from './FlexColumn';
import CustomTimePicker from './CustomTimePicker';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../providers/ThemeProvider';

export const WorkRegulationItem = ({ item, week_days, setWeekDays }) => {
    const { colors } = useTheme();
    const { t } = useTranslation();

    const toggleWeekend = () => {
        let newState = week_days.map(obj => {
            if (obj.week_day_id === item.week_day_id) {
                return { ...obj, weekend: item.weekend == 1 ? 0 : 1 };
            }
            return obj;
        });

        setWeekDays(newState);
    }

    const toggleAroundTheClock = () => {
        let newState = week_days.map(obj => {
            if (obj.week_day_id === item.week_day_id) {
                return { ...obj, around_the_clock: item.around_the_clock == 1 ? 0 : 1 };
            }
            return obj;
        });

        setWeekDays(newState);
    }

    return (
        <FlexColumn gap={15}>
            <FlexWrap>
                <CustomButton color={colors.active} borderWidth={1} borderColor={item.weekend == 1 ? colors.border : colors.primary} onPressHandle={() => toggleWeekend()}>
                    <CustomText color={item.weekend == 0 ? colors.text : colors.secondary}>{item.weekend == 1 ? t('misc.weekend') : t('misc.working_day')}</CustomText>
                </CustomButton>
                {item.weekend == 0 &&
                    <CustomButton color={colors.active} borderWidth={1} borderColor={item.around_the_clock == 1 ? colors.primary : colors.border} onPressHandle={() => toggleAroundTheClock()}>
                        <CustomText color={item.around_the_clock == 1 ? colors.text : colors.secondary}>{t('misc.around_the_clock')}</CustomText>
                    </CustomButton>
                }
            </FlexWrap>
            {item.around_the_clock == 0 && item.weekend == 0 &&
                <FlexWrap>
                    <CustomTimePicker item={item} time_type={'work_begin'} week_days={week_days} setWeekDays={setWeekDays} />
                    <CustomTimePicker item={item} time_type={'work_end'} week_days={week_days} setWeekDays={setWeekDays} />
                </FlexWrap>
            }
        </FlexColumn>
    )
}