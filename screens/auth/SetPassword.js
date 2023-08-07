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

const setToken = async (token) => {
    try {
        await AsyncStorage.setItem('token', token);
    } catch (error) {
        alert('Set token error');
    }
}

export default function SetPassword({ navigation, route }) {
    const { t } = useTranslation();
    const { colors } = useTheme();
    const [password, setPassword] = useState('');
    const [password_confirmation, setPasswordConfirmation] = useState('');

    const [loader, setLoader] = useState(false);
    const [error, setError] = useState([]);

    const createPasswordSubmit = async () => {
        setLoader(true);
        const form_data = new FormData();
        form_data.append('user_id', route.params.user_id);
        form_data.append('password', password);
        form_data.append('password_confirmation', password_confirmation);

        await axios.post('/auth/set_password', form_data)
            .then(response => {
                setToken(response.data.data.token);
                if (response.data.message == 'register') {
                    navigation.navigate('Registration');
                }
                else if(response.data.message == 'reset_password_success'){
                    navigation.navigate('Home');
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
            <DefaultLayout title={t('auth.creating_a_password')} navigation={navigation}>
                <FlexColumn gap={20}>
                    <CustomText flex={1} textAlign={'center'} fontFamily={stylesConfig.fontFamily[500]} color={colors.primary}>{t('auth.password_tutorial')}</CustomText>
                    {error.auth_failed && <CustomText color={colors.danger} size={stylesConfig.fontSize.text_base}>{error.auth_failed}</CustomText>}
                    <CustomInput input_label={t('auth.password')} input_type={'password'} input_value={password} setInputValue={setPassword} label_error={error.password} icon={'lock-closed-outline'}></CustomInput>
                    <CustomInput input_label={t('auth.password_confirmation')} input_type={'password'} input_value={password_confirmation} setInputValue={setPasswordConfirmation} label_error={error.password_confirmation} icon={'lock-closed-outline'}></CustomInput>
                    <CustomButton width={'100%'} onPressHandle={() => createPasswordSubmit()}>
                        <CustomText color={'#fff'} fontFamily={stylesConfig.fontFamily[500]}>{t('misc.continue')}</CustomText>
                    </CustomButton>
                </FlexColumn>
            </DefaultLayout>
    );
}