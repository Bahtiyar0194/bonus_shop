import { useTranslation } from "react-i18next";
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import { FlexWrap } from "../../components/FlexWrap";
import { PressableLink } from "../../components/PressableLink";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function PasswordLogin({ navigation, route }) {
    const { t } = useTranslation();
    const { colors } = useTheme();
    const [password, setPassword] = useState('');

    const [loader, setLoader] = useState(false);
    const [error, setError] = useState([]);

    const setToken = async (token) => {
        try {
            await AsyncStorage.setItem('token', token);
        } catch (error) {
            alert('Set token error');
        }
    }

    const login = async () => {
        setLoader(true);
        const form_data = new FormData();
        form_data.append('phone', route.params.phone);
        form_data.append('password', password);

        await axios.post('/auth/login', form_data)
            .then(response => {
                setError([]);
                setToken(response.data.data.token).then(navigation.navigate('Home'));
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


    const resetPassword = async () => {
        setLoader(true);
        const form_data = new FormData();
        form_data.append('user_id', route.params.user_id);

        await axios.post('/auth/reset_password', form_data)
            .then(response => {
                if (response.data.message == 'reset_password') {
                    navigation.navigate('Activation', {
                        status: 'reset_password',
                        user_id: response.data.data.user_id,
                        phone: route.params.phone
                    });
                }
            }).catch(err => {
                alert(t('errors.network_error'));
            }).finally(() => {
                setLoader(false);
            });
    }

    return (
        loader
            ?
            <Loader />
            :
            <DefaultLayout title={t('auth.password_login_title')} navigation={navigation}>
                <FlexColumn gap={20}>
                    {error.auth_failed && <CustomText color={colors.danger} size={stylesConfig.fontSize.text_base}>{error.auth_failed}</CustomText>}
                    <CustomInput input_label={t('auth.password')} input_type={'password'} input_value={password} setInputValue={setPassword} label_error={error.password} icon={'lock-closed-outline'}></CustomInput>
                    <CustomButton width={'100%'} onPressHandle={() => login()}>
                        <Ionicons name='log-in-outline' size={24} color={'#fff'} />
                        <CustomText color={'#fff'} fontFamily={stylesConfig.fontFamily[500]}>{t('auth.sign_in')}</CustomText>
                    </CustomButton>
                    <FlexWrap gap={5} alignItems={'baseline'} width={'100%'}>
                        <CustomText>{t('auth.forgot_password')}</CustomText>
                        <PressableLink text={t('auth.password_reset')} onPressHandle={() => resetPassword()} />
                    </FlexWrap>
                </FlexColumn>
            </DefaultLayout>
    );
}