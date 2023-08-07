import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import DefaultLayout from "../../layouts/DefaultLayout";
import { ScrollView } from "react-native";
import CustomText from "../../components/CustomText";
import stylesConfig from "../../config/styles";
import { FlexWrap } from "../../components/FlexWrap";
import { FlexColumn } from "../../components/FlexColumn";
import { useIsFocused } from "@react-navigation/native";
import { Loader } from "../../components/Loader";
import axios from "axios";

export default function UserInfo({ navigation, route }) {
    const { t } = useTranslation();
    const [loader, setLoader] = useState(false);
    const isFocused = useIsFocused();
    const [user, setUser] = useState(null);

    const fetchUser = (user_id) => {
        setLoader(true);
        axios
            .get('/users/' + user_id)
            .then(({ data }) => {
                setUser(data.user);
            })
            .catch((err) => {
                alert(t('errors.network_error'));
            }).finally(() => {
                setLoader(false);
            });
    }

    useEffect(() => {
        if (isFocused) {
            fetchUser(route.params.user_id);
        }
    }, [isFocused]);

    return (
        loader
        ?
        <Loader />
        :
        <DefaultLayout title={t('user.user_info')} navigation={navigation}>
            <ScrollView style={{ width: '100%', paddingTop: 10 }}>
                <FlexColumn marginBottom={20} gap={15}>
                    <CustomText size={stylesConfig.fontSize.text_xl} fontFamily={stylesConfig.fontFamily[700]}>{user?.last_name} {user?.first_name}</CustomText>

                    <FlexWrap width={'100%'} gap={2}>
                        <CustomText size={stylesConfig.fontSize.text_sm}>{t('user.city') + ': '}</CustomText>
                        <CustomText size={stylesConfig.fontSize.text_sm} fontFamily={stylesConfig.fontFamily[700]}>{user?.city_name}</CustomText>
                    </FlexWrap>

                    <FlexWrap width={'100%'} gap={2}>
                        <CustomText size={stylesConfig.fontSize.text_sm}>{t('auth.phone') + ': '}</CustomText>
                        <CustomText size={stylesConfig.fontSize.text_sm} fontFamily={stylesConfig.fontFamily[700]}>{user?.phone}</CustomText>
                    </FlexWrap>

                    <FlexWrap width={'100%'} gap={2}>
                        <CustomText size={stylesConfig.fontSize.text_sm}>{t('auth.email') + ': '}</CustomText>
                        <CustomText size={stylesConfig.fontSize.text_sm} fontFamily={stylesConfig.fontFamily[700]}>{user?.email}</CustomText>
                    </FlexWrap>

                    <FlexWrap width={'100%'} gap={2}>
                        <CustomText size={stylesConfig.fontSize.text_sm}>{t('user.iin') + ': '}</CustomText>
                        <CustomText size={stylesConfig.fontSize.text_sm} fontFamily={stylesConfig.fontFamily[700]}>{user?.iin}</CustomText>
                    </FlexWrap>

                    <FlexWrap width={'100%'} gap={2}>
                        <CustomText size={stylesConfig.fontSize.text_sm}>{t('misc.created_at') + ': '}</CustomText>
                        <CustomText size={stylesConfig.fontSize.text_sm} fontFamily={stylesConfig.fontFamily[700]}>{new Date(user?.created_at).toLocaleString()}</CustomText>
                    </FlexWrap>
                </FlexColumn>
            </ScrollView>
        </DefaultLayout>
    );
}