import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import DefaultLayout from "../../../layouts/DefaultLayout";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Loader } from "../../../components/Loader";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import { Card } from "../../../components/Card";
import CustomText from "../../../components/CustomText";
import stylesConfig from "../../../config/styles";
import { FlexWrap } from "../../../components/FlexWrap";
import { FlexColumn } from "../../../components/FlexColumn";
import { CustomButton } from "../../../components/CustomButton";
import { useTheme } from "../../../providers/ThemeProvider";
import Container from "../../../components/Container";

export default function PartnersList({ navigation }) {
    const { t } = useTranslation();
    const { colors } = useTheme();
    const [loader, setLoader] = useState(false);
    const [tab, setTab] = useState(0);
    const isFocused = useIsFocused();

    const [partners, setPartners] = useState([]);
    const [applications, setApplications] = useState([]);

    const tabs = [
        {
            name: t('misc.all'),
            badge: null
        },
        {
            name: t('misc.applications'),
            badge: applications.length
        }
    ];

    const fetchPartners = () => {
        setLoader(true);
        axios
            .get('/partners/get')
            .then(({ data }) => {
                setPartners(data.partners);
                setApplications(data.applications);
            })
            .catch((err) => {
                alert(t('errors.network_error'));
            }).finally(() => {
                setLoader(false);
            });
    }

    useEffect(() => {
        if (isFocused) {
            setLoader(true);
            fetchPartners();
        }
    }, [isFocused]);

    return (
        loader
            ?
            <Loader />
            :
            <DefaultLayout title={t('partners.title')} navigation={navigation}>
                <FlexColumn marginTop={10}>
                    <FlexWrap>
                        {tabs.map((item, index) => (
                            <CustomButton
                                color={colors.active}
                                key={index}
                                borderWidth={1}
                                borderColor={index == tab ? colors.primary : colors.border}
                                badge={item.badge}
                                onPressHandle={() => setTab(index)}>
                                <CustomText>
                                    {item.name}
                                </CustomText>
                            </CustomButton>
                        ))}
                    </FlexWrap>
                </FlexColumn>
                {tab === 0 &&
                    <>
                        {partners.length > 0
                            ?
                            <ScrollView style={{ width: '100%', paddingTop: 10 }}>
                                {
                                    partners.map(item => (
                                        <TouchableOpacity key={item.partner_id} onPress={() => navigation.navigate('PartnerInfo', { title: t('partners.partner_info'), partner: item })}>
                                            <Card borderWidth={1} marginBottom={10}>
                                                <FlexColumn gap={8}>
                                                    <CustomText fontFamily={stylesConfig.fontFamily[700]}>{item.partner_name}</CustomText>
                                                    <FlexWrap width={'100%'} gap={2}>
                                                        <CustomText size={stylesConfig.fontSize.text_sm}>{t('partners.partner_org_name') + ': '}</CustomText>
                                                        <CustomText size={stylesConfig.fontSize.text_sm} fontFamily={stylesConfig.fontFamily[500]}>{item.partner_org_name}</CustomText>
                                                    </FlexWrap>

                                                    <FlexWrap width={'100%'} gap={2}>
                                                        <CustomText size={stylesConfig.fontSize.text_sm}>{t('partners.bin') + ': '}</CustomText>
                                                        <CustomText size={stylesConfig.fontSize.text_sm} fontFamily={stylesConfig.fontFamily[500]}>{item.partner_bin}</CustomText>
                                                    </FlexWrap>
                                                </FlexColumn>
                                            </Card>
                                        </TouchableOpacity>
                                    ))
                                }
                            </ScrollView>
                            :
                            <Container alignItems={'center'} justifyContent={'center'}>
                                <CustomText fontFamily={stylesConfig.fontFamily[700]} textAlign={'center'}>{t('partners.no_partners')}</CustomText>
                            </Container>
                        }
                    </>
                }

                {tab === 1 &&
                    <>
                        {applications.length > 0
                            ?
                            <ScrollView style={{ width: '100%', paddingTop: 10 }}>
                                {
                                    applications.map(item => (
                                        <TouchableOpacity key={item.partner_id} onPress={() => navigation.navigate('PartnerApplication', { application: item })}>
                                            <Card borderWidth={1} marginBottom={10}>
                                                <FlexColumn gap={8}>
                                                    <CustomText fontFamily={stylesConfig.fontFamily[700]}>{item.partner_name}</CustomText>
                                                    <FlexWrap width={'100%'} gap={2}>
                                                        <CustomText size={stylesConfig.fontSize.text_sm}>{t('partners.partner_org_name') + ': '}</CustomText>
                                                        <CustomText size={stylesConfig.fontSize.text_sm} fontFamily={stylesConfig.fontFamily[500]}>{item.partner_org_name}</CustomText>
                                                    </FlexWrap>

                                                    <FlexWrap width={'100%'} gap={2}>
                                                        <CustomText size={stylesConfig.fontSize.text_sm}>{t('partners.bin') + ': '}</CustomText>
                                                        <CustomText size={stylesConfig.fontSize.text_sm} fontFamily={stylesConfig.fontFamily[500]}>{item.partner_bin}</CustomText>
                                                    </FlexWrap>
                                                </FlexColumn>
                                            </Card>
                                        </TouchableOpacity>
                                    ))
                                }
                            </ScrollView>
                            :
                            <Container alignItems={'center'} justifyContent={'center'}>
                                <CustomText fontFamily={stylesConfig.fontFamily[700]} textAlign={'center'}>{t('misc.no_applications')}</CustomText>
                            </Container>
                        }
                    </>
                }
            </DefaultLayout>
    );
}