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

export default function Login({ navigation }) {
    const { t } = useTranslation();
    const { colors } = useTheme();
    const [phone, setPhone] = useState('');

    const [loader, setLoader] = useState(false);
    const [error, setError] = useState([]);

    const phoneSubmit = async () => {
        setLoader(true);
        const form_data = new FormData();
        form_data.append('phone', phone);

        await axios.post('/auth/check_phone', form_data)
            .then(response => {
                if (response.data.message == 'send_sms') {
                    navigation.navigate('Activation', {
                        status: 'activation',
                        phone: phone,
                        user_id: response.data.data.user_id
                    });
                }
                else if (response.data.message == 'password_login') {
                    navigation.navigate('PasswordLogin', {
                        phone: phone,
                        user_id: response.data.data.user_id
                    })
                }
            }).catch(err => {
                if (err.response) {
                    if (err.response.status == 422 || err.response.status == 401) {
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
            <DefaultLayout title={t('auth.sign_in_title')} navigation={navigation}>
                <FlexColumn gap={20}>
                    {error.auth_failed && <CustomText color={colors.danger} size={stylesConfig.fontSize.text_base}>{error.auth_failed}</CustomText>}
                    <CustomInput input_label={t('auth.phone')} input_type={'phone'} input_mode={'numeric'} placeholder={'+7 (___) ___-____'} input_value={phone} setInputValue={setPhone} label_error={error.phone} icon={'call-outline'}></CustomInput>
                    <CustomButton width={'100%'} onPressHandle={() => phoneSubmit()}>
                        <CustomText color={'#fff'} fontFamily={stylesConfig.fontFamily[500]}>{t('misc.continue')}</CustomText>
                    </CustomButton>
                </FlexColumn>
            </DefaultLayout>
    );
}