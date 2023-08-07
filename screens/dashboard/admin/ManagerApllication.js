import { useState } from "react";
import { useTranslation } from "react-i18next";
import DefaultLayout from "../../../layouts/DefaultLayout";
import { ScrollView } from "react-native";
import CustomText from "../../../components/CustomText";
import stylesConfig from "../../../config/styles";
import { FlexWrap } from "../../../components/FlexWrap";
import { FlexColumn } from "../../../components/FlexColumn";
import { CustomButton } from "../../../components/CustomButton";
import Ionicons from '@expo/vector-icons/Ionicons';
import { CustomModal } from "../../../components/CustomModal";
import { useTheme } from "../../../providers/ThemeProvider";
import { Loader } from "../../../components/Loader";
import axios from "axios";

export default function ManagerApplication({ navigation, route }) {
    const { t } = useTranslation();
    const [loader, setLoader] = useState(false);
    const { colors } = useTheme();
    const application = route.params.application;
    const [acceptModal, setAcceptModal] = useState(false);

    const acceptApplication = () => {
        setLoader(true);
        axios
            .post('/managers/accept_application', {
                user_id: application.user_id
            })
            .then(({ data }) => {
                navigation.navigate('ManagersList');
            })
            .catch((err) => {
                alert(t('errors.network_error'));
            }).finally(() => {
                setLoader(false);
            });
    };

    return (
        loader
            ?
            <Loader />
            :
            <DefaultLayout title={t('managers.application')} navigation={navigation}>
                <ScrollView style={{ width: '100%', paddingTop: 10 }}>
                    <FlexColumn marginBottom={20} gap={15}>
                        <CustomText size={stylesConfig.fontSize.text_xl} fontFamily={stylesConfig.fontFamily[700]}>{application.last_name} {application.first_name}</CustomText>

                        <FlexWrap width={'100%'} gap={2}>
                            <CustomText size={stylesConfig.fontSize.text_sm}>{t('user.iin') + ': '}</CustomText>
                            <CustomText size={stylesConfig.fontSize.text_sm} fontFamily={stylesConfig.fontFamily[700]}>{application.iin}</CustomText>
                        </FlexWrap>

                        <FlexWrap width={'100%'} gap={2}>
                            <CustomText size={stylesConfig.fontSize.text_sm}>{t('user.city') + ': '}</CustomText>
                            <CustomText size={stylesConfig.fontSize.text_sm} fontFamily={stylesConfig.fontFamily[700]}>{application.city_name}</CustomText>
                        </FlexWrap>

                        <FlexWrap width={'100%'} gap={2}>
                            <CustomText size={stylesConfig.fontSize.text_sm}>{t('auth.phone') + ': '}</CustomText>
                            <CustomText size={stylesConfig.fontSize.text_sm} fontFamily={stylesConfig.fontFamily[700]}>{application.phone}</CustomText>
                        </FlexWrap>

                        <FlexWrap width={'100%'} gap={2}>
                            <CustomText size={stylesConfig.fontSize.text_sm}>{t('auth.email') + ': '}</CustomText>
                            <CustomText size={stylesConfig.fontSize.text_sm} fontFamily={stylesConfig.fontFamily[700]}>{application.email}</CustomText>
                        </FlexWrap>

                        <FlexWrap width={'100%'} gap={2}>
                            <CustomText size={stylesConfig.fontSize.text_sm}>{t('misc.created_at') + ': '}</CustomText>
                            <CustomText size={stylesConfig.fontSize.text_sm} fontFamily={stylesConfig.fontFamily[700]}>{new Date(application.created_at).toLocaleString()}</CustomText>
                        </FlexWrap>
                    </FlexColumn>

                    <CustomButton width={'100%'} onPressHandle={() => setAcceptModal(true)}>
                        <Ionicons name='checkbox-outline' size={24} color={'#fff'} />
                        <CustomText color={'#fff'} fontFamily={stylesConfig.fontFamily[500]}>{t('partners.accept_application')}</CustomText>
                    </CustomButton>
                </ScrollView>

                <CustomModal show={acceptModal} hide={() => setAcceptModal(false)} modal_title={t('managers.application')}>
                    <CustomText>{t('partners.accept_application_confirm')}</CustomText>
                    <FlexWrap marginTop={20}>
                        <CustomButton onPressHandle={() => acceptApplication()}>
                            <CustomText color={'#fff'}>{t('misc.yes')}</CustomText>
                        </CustomButton>
                        <CustomButton color={colors.active} borderWidth={1} borderColor={colors.border} onPressHandle={() => setAcceptModal(false)}>
                            <CustomText>{t('misc.no')}</CustomText>
                        </CustomButton>
                    </FlexWrap>
                </CustomModal>
            </DefaultLayout>
    );
}