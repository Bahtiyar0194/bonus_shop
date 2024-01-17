import { useTranslation } from "react-i18next";
import { useState, useEffect } from 'react';
import { Loader } from "../../components/Loader";
import DefaultLayout from "../../layouts/DefaultLayout";
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import axios from 'axios';
import stylesConfig from '../../config/styles';
import CustomText from '../../components/CustomText';
import { FlexColumn } from "../../components/FlexColumn";
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView, View } from "react-native";
import { useTheme } from "../../providers/ThemeProvider";
import { PressableLink } from "../../components/PressableLink";

export default function RegisterPartner({ navigation }) {
    const { t } = useTranslation();
    const { colors } = useTheme();

    const [cities, setCities] = useState([]);
    const [city, setCity] = useState('');
    const [partner_name, setPartnerName] = useState('');
    const [partner_org_name, setPartnerOrgName] = useState('');
    const [partner_bin, setPartnerBin] = useState('');
    const [partner_email, setPartnerEmail] = useState('');
    const [partner_phone, setPartnerPhone] = useState('');

    const [loader, setLoader] = useState(false);
    const [error, setError] = useState([]);
    const [finish, setFinish] = useState(false);

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
        form_data.append('partner_name', partner_name);
        form_data.append('partner_org_name', partner_org_name);
        form_data.append('partner_bin', partner_bin);
        form_data.append('partner_email', partner_email);
        form_data.append('partner_phone', partner_phone);
        form_data.append('city', city.id);

        let token = await AsyncStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

        await axios.post('/partners/submit_application', form_data)
            .then(response => {
                setError([]);
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

    useEffect(() => {
        getCities();
    }, []);

    return (
        loader
            ?
            <Loader />
            :
            <DefaultLayout title={t('partners.application')} navigation={navigation}>
                {
                    finish === true
                        ?
                        <FlexColumn justifyContent={'center'}>
                            <View style={{width: '100%', alignItems: 'center'}}>
                                <Ionicons name='checkmark-circle-outline' size={72} color={colors.primary} />
                            </View>
                            <CustomText fontFamily={stylesConfig.fontFamily[500]} size={stylesConfig.fontSize.text_xl} textAlign={'center'}>{t('partners.application_accepted_title')}</CustomText>
                            <CustomText fontFamily={stylesConfig.fontFamily[500]} textAlign={'center'}>{t('partners.application_accepted_description')}</CustomText>
                            <PressableLink text={t('home.to_main_page')} onPressHandle={() => navigation.navigate('Home')} />
                        </FlexColumn>
                        :
                        <ScrollView style={{ width: '100%' }}>
                            <FlexColumn gap={20} paddingVertical={15}>
                                <CustomText flex={1} fontFamily={stylesConfig.fontFamily[500]} marginBottom={40} size={stylesConfig.fontSize.text_xl} textAlign={'center'}>{t('partners.become_a_partner_offer')}</CustomText>
                                <CustomInput input_label={t('partners.partner_name')} input_value={partner_name} setInputValue={setPartnerName} label_error={error.partner_name} icon={'briefcase-outline'}></CustomInput>
                                <CustomInput input_label={t('partners.partner_org_name')} input_value={partner_org_name} setInputValue={setPartnerOrgName} label_error={error.partner_org_name} placeholder={t('partners.partner_org_name_placeholder')} icon={'briefcase-outline'}></CustomInput>
                                <CustomInput input_label={t('partners.bin')} input_mode={'numeric'} input_value={partner_bin} setInputValue={setPartnerBin} label_error={error.partner_bin} maxLength={12} icon={'briefcase-outline'}></CustomInput>
                                <CustomInput input_label={t('user.email')} input_value={partner_email} setInputValue={setPartnerEmail} label_error={error.partner_email} icon={'mail-outline'}></CustomInput>
                                <CustomInput input_label={t('auth.phone')} input_type={'phone'} input_mode={'numeric'} placeholder={'+7 (___) ___-____'} input_value={partner_phone} setInputValue={setPartnerPhone} label_error={error.partner_phone} icon={'call-outline'}></CustomInput>
                                <CustomInput input_label={t('user.city')} input_type={'group_select'} label_error={error.city} placeholder={t('user.choose_a_city')} icon={'business-outline'} modal_title={t('user.choose_a_city')} data={cities} select_value={city} setSelectValue={setCity} />
                                <CustomButton width={'100%'} onPressHandle={() => registrationSubmit()}>
                                    <Ionicons name='checkbox-outline' size={24} color={'#fff'} />
                                    <CustomText color={'#fff'} fontFamily={stylesConfig.fontFamily[500]}>{t('partners.submit_application')}</CustomText>
                                </CustomButton>
                            </FlexColumn>
                        </ScrollView>
                }
            </DefaultLayout>
    );
}