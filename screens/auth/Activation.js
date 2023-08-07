import { useTranslation } from "react-i18next";
import { useState } from 'react';
import { Loader } from '../../components/Loader';
import DefaultLayout from "../../layouts/DefaultLayout";
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import axios from 'axios';
import stylesConfig from '../../config/styles';
import CustomText from '../../components/CustomText';
import { FlexColumn } from "../../components/FlexColumn";
import { useTheme } from "../../providers/ThemeProvider";

export default function Activation({ navigation, route }) {
    const { colors } = useTheme();
    const { t } = useTranslation();
    const [sms, setSMS] = useState('');

    const [loader, setLoader] = useState(false);
    const [error, setError] = useState([]);

    const activationSubmit = async () => {
        setLoader(true);
        const form_data = new FormData();
        form_data.append('user_id', route.params.user_id)
        form_data.append('sms', sms);

        await axios.post('/auth/activation', form_data)
            .then(response => {
                if (response.data.message == 'set_password') {
                    setError([]);
                    navigation.navigate('SetPassword', {
                        user_id: response.data.data.user_id
                    });
                }
            }).catch(err => {
                if (err.response) {
                    if (err.response.status == 422) {
                        setError(err.response.data.data);
                    }
                }
                else {
                    alert(t('errors.network_error'));
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
            <DefaultLayout title={route.params.status == 'activation' ? t('auth.activation') : t('auth.password_recovery')} navigation={navigation}>
                <FlexColumn gap={20}>
                    <CustomText flex={1} textAlign={'center'} fontFamily={stylesConfig.fontFamily[500]} color={colors.primary}>{t('auth.enter_the_sms_code', {phone: route.params.phone})}</CustomText>
                    <CustomInput input_label={t('auth.sms_code')} input_mode={'numeric'} input_value={sms} setInputValue={setSMS} label_error={error.sms} placeholder={'_ _ _ _'} icon={'chatbox-ellipses-outline'}></CustomInput>
                    <CustomButton width={'100%'} onPressHandle={() => activationSubmit()}>
                        <CustomText color={'#fff'} fontFamily={stylesConfig.fontFamily[500]}>{t('misc.continue')}</CustomText>
                    </CustomButton>
                </FlexColumn>
            </DefaultLayout>
    );
}