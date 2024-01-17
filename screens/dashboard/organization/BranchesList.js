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

export default function BranchesList({ navigation }) {
    const { t } = useTranslation();
    const [loader, setLoader] = useState(false);
    const isFocused = useIsFocused();
    const [tab, setTab] = useState(0);

    const [branches, setBranches] = useState([]);
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

    const fetchBranches = () => {
        setLoader(true);
        axios
            .get('/branches/my_branches')
            .then(({ data }) => {
                setBranches(data.branches);
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
            fetchBranches();
        }
    }, [isFocused]);

    return (
        loader
            ?
            <Loader />
            :
            <DefaultLayout title={t('branches.title')} navigation={navigation}>
                <TabsHeader tabs={tabs} tab={tab} setTab={setTab} />

                {tab === 0 &&
                    <>
                        {branches.length > 0
                            ?
                            <ScrollView style={{ width: '100%', paddingTop: 10 }}>
                                {
                                    branches.map(item => (
                                        <TouchableOpacity key={item.branch_id} onPress={() => navigation.navigate('BranchInfo', { title: t('branches.branch_info'), branch: item })}>
                                            <Card borderWidth={1} marginBottom={10}>
                                                <FlexColumn gap={8}>
                                                    <CustomText fontFamily={stylesConfig.fontFamily[700]}>{item.street} {item.house}</CustomText>
                                                    <FlexWrap width={'100%'} gap={2}>
                                                        <CustomText size={stylesConfig.fontSize.text_sm}>{t('user.city') + ': '}</CustomText>
                                                        <CustomText size={stylesConfig.fontSize.text_sm} fontFamily={stylesConfig.fontFamily[500]}>{item.city_name}</CustomText>
                                                    </FlexWrap>
                                                </FlexColumn>
                                            </Card>
                                        </TouchableOpacity>
                                    ))
                                }

                                <CustomButton onPressHandle={() => navigation.navigate('AddBranch')}>
                                <Ionicons name='add' size={24} color={'#fff'} />
                                    <CustomText color={'#fff'}>{t('branches.add_a_branch')}</CustomText>
                                </CustomButton>
                            </ScrollView>
                            :
                            <Container alignItems={'center'} justifyContent={'center'}>
                                <CustomText fontFamily={stylesConfig.fontFamily[700]} textAlign={'center'}>{t('branches.no_branches')}</CustomText>
                                <CustomButton onPressHandle={() => navigation.navigate('AddBranch')}>
                                <Ionicons name='add' size={24} color={'#fff'} />
                                    <CustomText color={'#fff'}>{t('branches.add_a_branch')}</CustomText>
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
                                        <TouchableOpacity key={item.branch_id} onPress={() => navigation.navigate('BranchInfo', { title: t('branches.branch_info'), branch: item })}>
                                            <Card borderWidth={1} marginBottom={10}>
                                                <FlexColumn gap={8}>
                                                    <CustomText fontFamily={stylesConfig.fontFamily[700]}>{item.partner_name}</CustomText>
                                                    <FlexWrap width={'100%'} gap={2}>
                                                        <CustomText size={stylesConfig.fontSize.text_sm}>{t('user.address') + ': '}</CustomText>
                                                        <CustomText size={stylesConfig.fontSize.text_sm} fontFamily={stylesConfig.fontFamily[500]}>{item.street} {item.house}</CustomText>
                                                    </FlexWrap>

                                                    <FlexWrap width={'100%'} gap={2}>
                                                        <CustomText size={stylesConfig.fontSize.text_sm}>{t('user.city') + ': '}</CustomText>
                                                        <CustomText size={stylesConfig.fontSize.text_sm} fontFamily={stylesConfig.fontFamily[500]}>{item.city_name}</CustomText>
                                                    </FlexWrap>
                                                </FlexColumn>
                                            </Card>
                                        </TouchableOpacity>
                                    ))
                                }
                            </ScrollView>
                            :
                            <Container alignItems={'center'} justifyContent={'center'}>
                                <CustomText fontFamily={stylesConfig.fontFamily[700]} textAlign={'center'}>{t('branches.no_inspect_branches')}</CustomText>
                            </Container>
                        }
                    </>
                }

            </DefaultLayout>
    );
}