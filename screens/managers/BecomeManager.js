import { useTranslation } from "react-i18next";
import { useState } from 'react';
import { Loader } from '../../components/Loader';
import DefaultLayout from "../../layouts/DefaultLayout";
import { CustomButton } from '../../components/CustomButton';
import axios from 'axios';
import stylesConfig from '../../config/styles';
import CustomText from '../../components/CustomText';
import { FlexColumn } from "../../components/FlexColumn";
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native";
import { useTheme } from "../../providers/ThemeProvider";
import { PressableLink } from "../../components/PressableLink";

export default function BecomeManager({ navigation }) {
    const { t } = useTranslation();
    const { colors } = useTheme();

    const [loader, setLoader] = useState(false);
    const [finish, setFinish] = useState(false);

    const registrationSubmit = async () => {
        setLoader(true);
        let token = await AsyncStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

        await axios.post('/managers/submit_application')
            .then(response => {
                setFinish(true);
            }).catch(err => {
                if (err.response) {
                    if (err.response.status == 422) {
                        setError(err.response.data.data);
                    }
                    else if (err.response.status == 401) {
                        alert(t('errors.not_logged_in'));
                    }
                }
            }).finally(() => {
                setLoader(false);
            });
    }

    return (
        loader
            ?
            <Loader />
            :
            <DefaultLayout title={t('managers.application')} navigation={navigation}>
                {
                    finish === true
                        ?
                        <FlexColumn justifyContent={'center'}>
                            <Ionicons name='checkmark-circle-outline' size={72} color={colors.primary} />
                            <CustomText fontFamily={stylesConfig.fontFamily[500]} size={stylesConfig.fontSize.text_xl} textAlign={'center'}>{t('partners.application_accepted_title')}</CustomText>
                            <CustomText fontFamily={stylesConfig.fontFamily[500]} textAlign={'center'}>{t('partners.application_accepted_description')}</CustomText>
                            <PressableLink text={t('home.to_main_page')} onPressHandle={() => navigation.navigate('Home')} />
                        </FlexColumn>
                        :
                        <FlexColumn gap={20} paddingVertical={15}>
                            <CustomText>Вы можете участвовать в нашей партнерской программе и зарабатывать деньги, просто привлекая в наш сервис новых клиентов и партнёров. Каждый привлеченный партнёр и клиент будет приносить вам доход в течение всего времени использования нашего сервиса. Таким образом, общая ваша прибыль будет постоянно увеличиваться — чем больше ваших клиентов, тем больше прибыль.</CustomText>
                            <CustomButton width={'100%'} onPressHandle={() => registrationSubmit()}>
                                <Ionicons name='checkbox-outline' size={24} color={'#fff'} />
                                <CustomText color={'#fff'} fontFamily={stylesConfig.fontFamily[500]}>{t('partners.submit_application')}</CustomText>
                            </CustomButton>
                        </FlexColumn>
                }
            </DefaultLayout>
    );
}