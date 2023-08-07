import { useTranslation } from "react-i18next";
import DefaultLayout from "../../../layouts/DefaultLayout";
import { ScrollView } from "react-native";
import CustomText from "../../../components/CustomText";
import stylesConfig from "../../../config/styles";
import { FlexWrap } from "../../../components/FlexWrap";
import { FlexColumn } from "../../../components/FlexColumn";

export default function PartnerInfo({ navigation, route }) {
    const { t } = useTranslation();
    const partner = route.params.partner;

    return (
        <DefaultLayout title={route.params.title} navigation={navigation}>
            <ScrollView style={{ width: '100%', paddingTop: 10 }}>
                <FlexColumn marginBottom={20} gap={15}>
                    <CustomText size={stylesConfig.fontSize.text_xl} fontFamily={stylesConfig.fontFamily[700]}>{partner.partner_name}</CustomText>

                    <FlexWrap width={'100%'} gap={2}>
                        <CustomText size={stylesConfig.fontSize.text_sm}>{t('partners.partner_org_name') + ': '}</CustomText>
                        <CustomText size={stylesConfig.fontSize.text_sm} fontFamily={stylesConfig.fontFamily[700]}>{partner.partner_org_name}</CustomText>
                    </FlexWrap>

                    <FlexWrap width={'100%'} gap={2}>
                        <CustomText size={stylesConfig.fontSize.text_sm}>{t('user.city') + ': '}</CustomText>
                        <CustomText size={stylesConfig.fontSize.text_sm} fontFamily={stylesConfig.fontFamily[700]}>{partner.city_name}</CustomText>
                    </FlexWrap>

                    <FlexWrap width={'100%'} gap={2}>
                        <CustomText size={stylesConfig.fontSize.text_sm}>{t('auth.phone') + ': '}</CustomText>
                        <CustomText size={stylesConfig.fontSize.text_sm} fontFamily={stylesConfig.fontFamily[700]}>{partner.partner_phone}</CustomText>
                    </FlexWrap>

                    <FlexWrap width={'100%'} gap={2}>
                        <CustomText size={stylesConfig.fontSize.text_sm}>{t('auth.email') + ': '}</CustomText>
                        <CustomText size={stylesConfig.fontSize.text_sm} fontFamily={stylesConfig.fontFamily[700]}>{partner.partner_email}</CustomText>
                    </FlexWrap>

                    <FlexWrap width={'100%'} gap={2}>
                        <CustomText size={stylesConfig.fontSize.text_sm}>{t('partners.bin') + ': '}</CustomText>
                        <CustomText size={stylesConfig.fontSize.text_sm} fontFamily={stylesConfig.fontFamily[700]}>{partner.partner_bin}</CustomText>
                    </FlexWrap>

                    <FlexWrap width={'100%'} gap={2}>
                        <CustomText size={stylesConfig.fontSize.text_sm}>{t('bonus') + ': '}</CustomText>
                        <CustomText size={stylesConfig.fontSize.text_sm} fontFamily={stylesConfig.fontFamily[700]}>{partner.bonus.toFixed(2)} %</CustomText>
                    </FlexWrap>

                    <FlexWrap width={'100%'} gap={2}>
                        <CustomText size={stylesConfig.fontSize.text_sm}>{t('partners.applicant') + ': '}</CustomText>
                        <CustomText size={stylesConfig.fontSize.text_sm} fontFamily={stylesConfig.fontFamily[700]}>{partner.applicant_last_name + ' ' + partner.applicant_first_name}</CustomText>
                    </FlexWrap>

                    <FlexWrap width={'100%'} gap={2}>
                        <CustomText size={stylesConfig.fontSize.text_sm}>{t('partners.operator') + ': '}</CustomText>
                        <CustomText size={stylesConfig.fontSize.text_sm} fontFamily={stylesConfig.fontFamily[700]}>{partner.operator_last_name + ' ' + partner.operator_first_name}</CustomText>
                    </FlexWrap>

                    <FlexWrap width={'100%'} gap={2}>
                        <CustomText size={stylesConfig.fontSize.text_sm}>{t('partners.manager') + ': '}</CustomText>
                        <CustomText size={stylesConfig.fontSize.text_sm} fontFamily={stylesConfig.fontFamily[700]}>{partner.manager_id && (partner.manager_last_name + ' ' + partner.manager_first_name)}</CustomText>
                    </FlexWrap>

                    <FlexWrap width={'100%'} gap={2}>
                        <CustomText size={stylesConfig.fontSize.text_sm}>{t('misc.created_at') + ': '}</CustomText>
                        <CustomText size={stylesConfig.fontSize.text_sm} fontFamily={stylesConfig.fontFamily[700]}>{new Date(partner.created_at).toLocaleString()}</CustomText>
                    </FlexWrap>
                </FlexColumn>
            </ScrollView>
        </DefaultLayout>
    );
}