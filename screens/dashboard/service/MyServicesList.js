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
import { CustomButton } from "../../../components/CustomButton";
import { TabsHeader } from "../../../components/TabsHeader";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function MyServicesList({ navigation }) {
    const { t } = useTranslation();
    const [loader, setLoader] = useState(false);
    const isFocused = useIsFocused();
    const [tab, setTab] = useState(0);

    const [services, setServices] = useState([]);
    const [applications, setApplications] = useState([]);

    const tabs = [
        {
            name: t('misc.all'),
            badge: null
        },
        {
            name: t('misc.on_inspection'),
            badge: applications.length
        }
    ];

    const fetchServices = () => {
        setLoader(true);
        axios
            .get('/services/my_services')
            .then(({ data }) => {
                setServices(data.services);
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
            fetchServices();
        }
    }, [isFocused]);

    return (
        loader
            ?
            <Loader />
            :
            <DefaultLayout title={t('categories.my_services')} navigation={navigation}>
                <TabsHeader tabs={tabs} tab={tab} setTab={setTab} />

                {tab === 0 &&
                    <>
                        {services.length > 0
                            ?
                            <ScrollView style={{ width: '100%', paddingTop: 10 }}>
                                {
                                    services.map(item => (
                                        <TouchableOpacity key={item.service_id} onPress={() => navigation.navigate('ServiceInfo', { title: t('categories.service_info'), service: item })}>
                                            <Card borderWidth={1} marginBottom={10}>
                                                <FlexColumn gap={8}>
                                                    <CustomText fontFamily={stylesConfig.fontFamily[700]}>{item.service_title}</CustomText>
                                                    <FlexWrap width={'100%'} gap={2}>
                                                        <CustomText size={stylesConfig.fontSize.text_sm}>{t('categories.service_description') + ': '}</CustomText>
                                                        <CustomText size={stylesConfig.fontSize.text_sm} fontFamily={stylesConfig.fontFamily[500]}>{item.service_description}</CustomText>
                                                    </FlexWrap>
                                                    <FlexWrap width={'100%'} gap={2}>
                                                        <CustomText size={stylesConfig.fontSize.text_sm}>{t('categories.category') + ': '}</CustomText>
                                                        <CustomText size={stylesConfig.fontSize.text_sm} fontFamily={stylesConfig.fontFamily[500]}>{item.category_name}</CustomText>
                                                    </FlexWrap>
                                                </FlexColumn>
                                            </Card>
                                        </TouchableOpacity>
                                    ))
                                }

                                <CustomButton onPressHandle={() => navigation.navigate('AddService')}>
                                    <Ionicons name='add' size={24} color={'#fff'} />
                                    <CustomText color={'#fff'}>{t('categories.add_a_service')}</CustomText>
                                </CustomButton>
                            </ScrollView>
                            :
                            <Container alignItems={'center'} justifyContent={'center'}>
                                <CustomText fontFamily={stylesConfig.fontFamily[700]} textAlign={'center'}>{t('categories.no_services')}</CustomText>
                                <CustomButton onPressHandle={() => navigation.navigate('AddService')}>
                                    <Ionicons name='add' size={24} color={'#fff'} />
                                    <CustomText color={'#fff'}>{t('categories.add_a_service')}</CustomText>
                                </CustomButton>
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
                                        <TouchableOpacity key={item.service_id} onPress={() => navigation.navigate('ServiceInfo', { title: t('categories.service_info'), service: item })}>
                                            <Card borderWidth={1} marginBottom={10}>
                                                <FlexColumn gap={8}>
                                                    <CustomText fontFamily={stylesConfig.fontFamily[700]}>{item.service_title}</CustomText>
                                                    <FlexWrap width={'100%'} gap={2}>
                                                        <CustomText size={stylesConfig.fontSize.text_sm}>{t('categories.service_description') + ': '}</CustomText>
                                                        <CustomText size={stylesConfig.fontSize.text_sm} fontFamily={stylesConfig.fontFamily[500]}>{item.service_description}</CustomText>
                                                    </FlexWrap>
                                                    <FlexWrap width={'100%'} gap={2}>
                                                        <CustomText size={stylesConfig.fontSize.text_sm}>{t('categories.category') + ': '}</CustomText>
                                                        <CustomText size={stylesConfig.fontSize.text_sm} fontFamily={stylesConfig.fontFamily[500]}>{item.category_name}</CustomText>
                                                    </FlexWrap>
                                                </FlexColumn>
                                            </Card>
                                        </TouchableOpacity>
                                    ))
                                }
                            </ScrollView>
                            :
                            <Container alignItems={'center'} justifyContent={'center'}>
                                <CustomText fontFamily={stylesConfig.fontFamily[700]} textAlign={'center'}>{t('categories.no_inspect_services')}</CustomText>
                            </Container>
                        }
                    </>
                }

            </DefaultLayout>
    );
}