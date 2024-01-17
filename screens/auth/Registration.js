import { useTranslation } from "react-i18next";
import { useState, useEffect } from 'react';
import { Loader } from '../../components/Loader';
import DefaultLayout from "../../layouts/DefaultLayout";
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import axios from 'axios';
import stylesConfig from '../../config/styles';
import CustomText from '../../components/CustomText';
import { FlexColumn } from "../../components/FlexColumn";
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { authenticate } from '../../store/slices/userSlice';

export default function Registration({ navigation }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const [cities, setCities] = useState([]);

    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [iin, setIin] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');

    const [loader, setLoader] = useState(false);
    const [error, setError] = useState([]);

    const getCities = async () => {
        setLoader(true);

        await axios.get('/cities/get')
            .then(response => {
                setCities(response.data.cities);
            }).catch(err => {
                alert(t('errors.network_error'));
            }).finally(() => {
                setLoader(false);
            });
    }

    const registrationSubmit = async () => {
        setLoader(true);
        const form_data = new FormData();
        form_data.append('first_name', first_name);
        form_data.append('last_name', last_name);
        form_data.append('iin', iin);
        form_data.append('email', email);
        form_data.append('city', city.id);

        let token = await AsyncStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

        await axios.post('/auth/registration', form_data)
            .then(response => {
                setError([]);
                dispatch(authenticate(response.data.data.user)).then(navigation.navigate('Home'));
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

    useEffect(() => {
        getCities();
    }, []);

    return (
        loader
            ?
            <Loader />
            :
            <DefaultLayout title={t('auth.sign_up_title')} navigation={navigation}>
                <FlexColumn gap={20}>
                    <CustomInput input_label={t('user.first_name')} input_value={first_name} setInputValue={setFirstName} label_error={error.first_name} icon={'person-outline'}></CustomInput>
                    <CustomInput input_label={t('user.last_name')} input_value={last_name} setInputValue={setLastName} label_error={error.last_name} icon={'person-outline'}></CustomInput>
                    <CustomInput input_label={t('user.iin')} input_mode={'numeric'} input_value={iin} setInputValue={setIin} label_error={error.iin} maxLength={12} icon={'person-outline'}></CustomInput>
                    <CustomInput input_label={t('user.email')} input_value={email} setInputValue={setEmail} label_error={error.email} icon={'mail-outline'}></CustomInput>
                    <CustomInput input_label={t('user.city')} input_type={'group_select'} label_error={error.city} placeholder={t('user.choose_a_city')} icon={'business-outline'} modal_title={t('user.choose_a_city')} data={cities} select_value={city} setSelectValue={setCity} />
                    <CustomButton width={'100%'} onPressHandle={() => registrationSubmit()}>
                        <Ionicons name='checkbox-outline' size={24} color={'#fff'} />
                        <CustomText color={'#fff'} fontFamily={stylesConfig.fontFamily[500]}>{t('auth.sign_up_finish')}</CustomText>
                    </CustomButton>
                </FlexColumn>
            </DefaultLayout>
    );
}