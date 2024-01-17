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
import { TabsHeader } from "../../../components/TabsHeader";

export default function ManagerApplicationsList({ navigation }) {
    const { t } = useTranslation();
    const [loader, setLoader] = useState(false);
    const [tab, setTab] = useState(0);
    const isFocused = useIsFocused();

    const [managers, setManagers] = useState([]);
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

    const fetchManagers = () => {
        setLoader(true);
        axios
            .get('/managers/get')
            .then(({ data }) => {
                setManagers(data.managers);
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
            fetchManagers();
        }
    }, [isFocused]);

    return (
        loader
            ?
            <Loader />
            :
            <DefaultLayout title={t('managers.title')} navigation={navigation}>
                <TabsHeader tabs={tabs} tab={tab} setTab={setTab} />

                {tab === 0 &&
                    <>
                        {managers.length > 0
                            ?
                            <ScrollView style={{ width: '100%', paddingTop: 10 }}>
                                {
                                    managers.map(item => (
                                        <TouchableOpacity key={item.user_id} onPress={() => navigation.navigate('UserInfo', { user_id: item.user_id })}>
                                            <Card borderWidth={1} marginBottom={10}>
                                                <FlexColumn gap={8}>
                                                    <CustomText fontFamily={stylesConfig.fontFamily[700]}>{item.last_name} {item.first_name}</CustomText>
                                                    <FlexWrap width={'100%'} gap={2}>
                                                        <CustomText size={stylesConfig.fontSize.text_sm}>{t('user.city') + ': '}</CustomText>
                                                        <CustomText size={stylesConfig.fontSize.text_sm} fontFamily={stylesConfig.fontFamily[500]}>{item.city_name}</CustomText>
                                                    </FlexWrap>

                                                    <FlexWrap width={'100%'} gap={2}>
                                                        <CustomText size={stylesConfig.fontSize.text_sm}>{t('misc.created_at') + ': '}</CustomText>
                                                        <CustomText size={stylesConfig.fontSize.text_sm} fontFamily={stylesConfig.fontFamily[500]}>{new Date(item.created_at).toLocaleString()}</CustomText>
                                                    </FlexWrap>
                                                </FlexColumn>
                                            </Card>
                                        </TouchableOpacity>
                                    ))
                                }
                            </ScrollView>
                            :
                            <Container alignItems={'center'} justifyContent={'center'}>
                                <CustomText fontFamily={stylesConfig.fontFamily[700]} textAlign={'center'}>{t('managers.no_managers')}</CustomText>
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
                                        <TouchableOpacity key={item.user_id} onPress={() => navigation.navigate('ManagerApplication', { application: item })}>
                                            <Card borderWidth={1} marginBottom={10}>
                                                <FlexColumn gap={8}>
                                                    <CustomText fontFamily={stylesConfig.fontFamily[700]}>{item.last_name} {item.first_name}</CustomText>
                                                    <FlexWrap width={'100%'} gap={2}>
                                                        <CustomText size={stylesConfig.fontSize.text_sm}>{t('user.city') + ': '}</CustomText>
                                                        <CustomText size={stylesConfig.fontSize.text_sm} fontFamily={stylesConfig.fontFamily[500]}>{item.city_name}</CustomText>
                                                    </FlexWrap>

                                                    <FlexWrap width={'100%'} gap={2}>
                                                        <CustomText size={stylesConfig.fontSize.text_sm}>{t('misc.created_at') + ': '}</CustomText>
                                                        <CustomText size={stylesConfig.fontSize.text_sm} fontFamily={stylesConfig.fontFamily[500]}>{new Date(item.created_at).toLocaleString()}</CustomText>
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