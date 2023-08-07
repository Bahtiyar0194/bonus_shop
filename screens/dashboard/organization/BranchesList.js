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

export default function BranchesList({ navigation }) {
    const { t } = useTranslation();
    const [loader, setLoader] = useState(false);
    const isFocused = useIsFocused();

    const [branches, setBranches] = useState([]);

    const fetchBranches = () => {
        setLoader(true);
        axios
            .get('/partners/my_branches')
            .then(({ data }) => {
                setBranches(data.branches);
            })
            .catch((err) => {
                alert(t('errors.network_error'));
            }).finally(() => {
                setLoader(false);
            });
    }

    useEffect(() => {
        if (isFocused) {
            //fetchBranches();
        }
    }, [isFocused]);

    return (
        loader
            ?
            <Loader />
            :
            <DefaultLayout title={t('branches.title')} navigation={navigation}>
                {branches.length > 0
                    ?
                    <ScrollView style={{ width: '100%', paddingTop: 10 }}>
                        {/* {
                            branches.map(item => (
                                <TouchableOpacity key={item.branch_id} onPress={() => navigation.navigate('BranchInfo', { title: t('branches.branch_info'), branch: item })}>
                                    <Card borderWidth={1} marginBottom={10}>
                                        <FlexColumn gap={8}>
                                            <CustomText fontFamily={stylesConfig.fontFamily[700]}>{item.branch_address}</CustomText>
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
                        } */}
                    </ScrollView>
                    :
                    <Container alignItems={'center'} justifyContent={'center'}>
                        <CustomText fontFamily={stylesConfig.fontFamily[700]} textAlign={'center'}>{t('branches.no_branches')}</CustomText>
                        <CustomButton onPressHandle={() => navigation.navigate('AddBranch')}>
                            <CustomText>{t('branches.add_a_branch')}</CustomText>
                        </CustomButton>
                    </Container>
                }
            </DefaultLayout>
    );
}