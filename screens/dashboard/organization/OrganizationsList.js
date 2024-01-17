import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import DefaultLayout from "../../../layouts/DefaultLayout";
import { ScrollView, TouchableOpacity } from "react-native";
import { Loader } from "../../../components/Loader";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import { Card } from "../../../components/Card";
import CustomText from "../../../components/CustomText";
import stylesConfig from "../../../config/styles";
import { FlexWrap } from "../../../components/FlexWrap";
import { FlexColumn } from "../../../components/FlexColumn";
import Container from "../../../components/Container";

export default function OrganizationsList({ navigation }) {
    const { t } = useTranslation();
    const [loader, setLoader] = useState(false);
    const isFocused = useIsFocused();

    const [organizations, setOrganizations] = useState([]);

    const fetchOrganizations = () => {
        setLoader(true);
        axios
            .get('/partners/my_organizations')
            .then(({ data }) => {
                setOrganizations(data.organizations);
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
            fetchOrganizations();
        }
    }, [isFocused]);

    return (
        loader
            ?
            <Loader />
            :
            <DefaultLayout title={t('organizations.my_organizations')} navigation={navigation}>
                {organizations.length > 0
                    ?
                    <ScrollView style={{ width: '100%', paddingTop: 10 }}>
                        {
                            organizations.map(item => (
                                <TouchableOpacity key={item.id} onPress={() => navigation.navigate('PartnerInfo', { title: t('organizations.organization_info'), partner: item })}>
                                    <Card borderWidth={1} marginBottom={10}>
                                        <FlexColumn gap={8}>
                                            <CustomText fontFamily={stylesConfig.fontFamily[700]}>{item.name}</CustomText>
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
                        <CustomText fontFamily={stylesConfig.fontFamily[700]} textAlign={'center'}>{t('organizations.no_organizations')}</CustomText>
                    </Container>
                }
            </DefaultLayout>
    );
}