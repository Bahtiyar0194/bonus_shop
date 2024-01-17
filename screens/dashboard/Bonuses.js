import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import DefaultLayout from "../../layouts/DefaultLayout";
import CustomText from "../../components/CustomText";
import { Loader } from "../../components/Loader";
import { ScrollView, View } from "react-native";
import { FlexWrap } from "../../components/FlexWrap";
import { CustomButton } from "../../components/CustomButton";
import { Card } from "../../components/Card";
import { useTheme } from "../../providers/ThemeProvider";
import { FlexColumn } from "../../components/FlexColumn";
import stylesConfig from "../../config/styles";
import { CountUp } from "use-count-up";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable } from "react-native";
import { CustomModal } from "../../components/CustomModal";

export default function Bonuses({ navigation, route }) {
    const { t } = useTranslation();
    const user = route.params.user;
    const bonuses = user.bonuses;

    const [modalVisible, setModalVisible] = useState(null);

    const { colors } = useTheme();

    const blocks = [
        {
            title: t('bonuses.title'),
            number: bonuses.all_active_bonuses,
            icon: 'wallet-outline',
            decimalPlaces: 0,
            description: t('bonuses.bonus_description')
        },
        {
            title: t('bonuses.personal_bonus'),
            number: bonuses.my_bonuses,
            icon: 'wallet-outline',
            decimalPlaces: 0,
            description: t('bonuses.personal_bonus_description')
        },
        {
            title: t('bonuses.referral_bonus'),
            number: bonuses.superior_client_bonuses,
            icon: 'git-merge-outline',
            decimalPlaces: 0,
            description: t('bonuses.referral_bonus_description')
        },
        {
            title: t('bonuses.manager_bonus'),
            number: bonuses.manager_bonuses,
            icon: 'ribbon-outline',
            decimalPlaces: 0,
            description: t('bonuses.manager_bonus_description')
        },
        {
            title: t('bonuses.number_of_invited_clients'),
            number: user.clients_count,
            icon: 'people-outline',
            decimalPlaces: 0,
            description: t('bonuses.invited_clients_description')
        },
        {
            title: t('bonuses.number_of_invited_partners'),
            number: user.partners_count,
            icon: 'briefcase-outline',
            decimalPlaces: 0,
            description: t('bonuses.invited_partners_description')
        }
    ]

    return (
        <DefaultLayout title={t('bonuses.title')} navigation={navigation}>
            <ScrollView>
                <FlexColumn marginTop={10} gap={10}>
                    {blocks.map((item, index) => (
                        <Card key={index + 1} borderWidth={1}>
                            <Pressable onPress={() => setModalVisible(index + 1)}>
                                <FlexWrap gap={15}>
                                    <Ionicons name={item.icon} size={42} color={colors.primary} />
                                    <FlexColumn flex={1} flexDirection={'column'} alignItems={'baseline'} gap={2}>
                                        <CustomText fontFamily={stylesConfig.fontFamily[500]}>{item.title}:</CustomText>
                                        <CustomText size={stylesConfig.fontSize.text_2xl} fontFamily={stylesConfig.fontFamily[700]}>
                                            <CountUp decimalPlaces={item.decimalPlaces} isCounting end={item.number} duration={2.5} />
                                        </CustomText>
                                    </FlexColumn>
                                    <Ionicons name='help-circle-outline' size={26} color={colors.secondary} />
                                </FlexWrap>
                            </Pressable>
                        </Card>
                    ))}
                </FlexColumn>
            </ScrollView>

            {blocks.map((item, index) => (
                <CustomModal key={index + 1} show={modalVisible === index + 1} hide={() => setModalVisible(null)} modal_title={item.title}>
                    <CustomText>{item.description}</CustomText>
                </CustomModal>
            ))}
        </DefaultLayout>
    );
}