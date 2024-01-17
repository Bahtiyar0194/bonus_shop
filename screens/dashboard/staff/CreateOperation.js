import { useState } from "react";
import { useTranslation } from "react-i18next";
import axios from 'axios';
import DefaultLayout from "../../../layouts/DefaultLayout";
import CustomText from "../../../components/CustomText";
import { Loader } from "../../../components/Loader";
import { View } from "react-native";
import { FlexWrap } from "../../../components/FlexWrap";
import { CustomButton } from "../../../components/CustomButton";
import { useTheme } from "../../../providers/ThemeProvider";
import stylesConfig from "../../../config/styles";
import { FlexColumn } from "../../../components/FlexColumn";
import QRCode from 'react-native-qrcode-svg';
import Ionicons from '@expo/vector-icons/Ionicons';
import { PressableLink } from "../../../components/PressableLink";
import { Audio } from 'expo-av';
import CenterLayout from "../../../layouts/CenterLayout";

export default function CreateOperation({ navigation }) {
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(false);
    const { t } = useTranslation();
    const { colors, dark } = useTheme();
    const [amount, setAmount] = useState(0);

    const [data, setData] = useState(null);

    const [expired, setExpired] = useState(false);

    const [finish, setFinish] = useState(false);

    async function playSuccessSound() {
        const { sound } = await Audio.Sound.createAsync(require('../../../assets/sounds/success.mp3'));
        await sound.playAsync();
    }

    async function playErrorSound() {
        const { sound } = await Audio.Sound.createAsync(require('../../../assets/sounds/error.mp3'));
        await sound.playAsync();
    }

    const changeAmount = (value) => {
        if (value == 'x') {
            setAmount(0);
        }
        else if (value == '<') {
            let newAmount = amount.substring(0, amount.length - 1);
            setAmount(newAmount);
        }
        else {
            setAmount(amount + `${value}`);
        }
    }

    const buttons = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        ['x', 0, '<']
    ];

    let intervalId = null;
    let intervalCount = 20;

    const createOperation = async () => {
        if (amount == 0 || amount == '') {
            setError({ amount: t('operations.enter_the_amount') });
        }
        else {
            setLoader(true);

            const form_data = new FormData();
            form_data.append('amount', parseInt(amount));

            await axios
                .post('/operations/create', form_data)
                .then(({ data }) => {
                    setData(data);
                    intervalId = setInterval(() => checkOperation(data.operation_hash), 3000);
                })
                .catch((err) => {
                    if (err.response) {
                        if (err.response.status == 422) {
                            setError(err.response.data.data);
                        }
                        else if (err.response.status == 401) {
                            alert(t('errors.not_logged_in'));
                        }
                    }
                    else {
                        alert(t('errors.network_error'));
                    }
                }).finally(() => {
                    setLoader(false);
                });
        }
    }


    const checkOperation = async (hash) => {
        if (intervalCount > 0) {
            intervalCount--;
            await axios
                .get('/operations/check/' + hash)
                .then(({ data }) => {
                    if (data.client_id) {
                        setFinish(true);
                        clearInterval(intervalId);
                        playSuccessSound();
                    }
                })
                .catch((err) => {
                    alert(t('errors.network_error'));
                });
        }
        else {
            setExpired(true);
            clearInterval(intervalId);
            playErrorSound();
        }
    }

    return (
        loader
            ?
            <Loader />
            :
            <CenterLayout alignItems={'center'} title={t('operations.new_operation')} navigation={navigation}>
                {expired === true
                    ?
                    <FlexColumn justifyContent={'center'}>
                        <View style={{ width: '100%', alignItems: 'center' }}>
                            <Ionicons name='hourglass-outline' size={72} color={colors.secondary} />
                        </View>
                        <CustomText fontFamily={stylesConfig.fontFamily[500]} size={stylesConfig.fontSize.text_xl} textAlign={'center'}>{t('scanner.expired_title')}</CustomText>
                        <CustomText fontFamily={stylesConfig.fontFamily[500]} textAlign={'center'}>{t('scanner.expired_description')}</CustomText>
                        <PressableLink text={t('misc.go_back')} onPressHandle={() => navigation.goBack()} />
                    </FlexColumn>
                    :
                    finish === true
                        ?
                        <FlexColumn justifyContent={'center'}>
                            <View style={{ width: '100%', alignItems: 'center' }}>
                                <Ionicons name='checkmark-circle-outline' size={72} color={colors.primary} />
                            </View>
                            <CustomText fontFamily={stylesConfig.fontFamily[500]} size={stylesConfig.fontSize.text_xl} textAlign={'center'}>{t('operations.success_title')}</CustomText>
                            <CustomText fontFamily={stylesConfig.fontFamily[500]} textAlign={'center'}>{t('operations.success_description')}</CustomText>
                            <PressableLink text={t('home.to_main_page')} onPressHandle={() => navigation.navigate('Home')} />
                        </FlexColumn>
                        :
                        <>
                            {data
                                ?
                                <FlexColumn gap={20} justifyContent={'center'}>
                                    <View width={'100%'}>
                                        <CustomText fontFamily={stylesConfig.fontFamily[500]} textAlign={'center'}>{t('scanner.scan_the_qr_code')}</CustomText>
                                        <CustomText fontFamily={stylesConfig.fontFamily[700]} size={stylesConfig.fontSize.text_2xl} textAlign={'center'}>{new Intl.NumberFormat("ru").format(data.amount)} &#x20b8;</CustomText>
                                    </View>
                                    <QRCode
                                        size={200}
                                        value={`${data.operation_hash}`}
                                        color={dark ? '#fff' : '#000'}
                                        backgroundColor={colors.inactive}
                                    />
                                </FlexColumn>
                                :
                                <FlexColumn gap={15}>
                                    <View width={'100%'}>
                                        {error.amount && <CustomText marginBottom={10} color={colors.danger} textAlign={'center'}>{error.amount}</CustomText>}
                                        <CustomText marginBottom={10} fontFamily={stylesConfig.fontFamily[500]} size={stylesConfig.fontSize.text_4xl} textAlign={'center'}>{new Intl.NumberFormat("ru").format(amount)} &#x20b8;</CustomText>
                                    </View>
                                    <FlexColumn>
                                        {buttons.map((item, row_index) => (
                                            <FlexWrap key={row_index} justifyContent={'space-between'} width={'100%'}>
                                                {item.map((value, btn_index) => (
                                                    <CustomButton key={btn_index} color={colors.border} flex={1} onPressHandle={() => changeAmount(value)}>
                                                        <CustomText fontFamily={stylesConfig.fontFamily[500]} size={stylesConfig.fontSize.text_2xl}>{value}</CustomText>
                                                    </CustomButton>
                                                ))}
                                            </FlexWrap>
                                        ))}
                                    </FlexColumn>
                                    <CustomButton width={'100%'} onPressHandle={() => createOperation()}>
                                        <CustomText color={'#fff'} size={stylesConfig.fontSize.text_xl}>{t('misc.continue')}</CustomText>
                                    </CustomButton>
                                </FlexColumn>
                            }
                        </>
                }
            </CenterLayout>
    );
}