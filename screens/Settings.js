import { useState } from "react";
import { useTranslation } from "react-i18next";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import DefaultLayout from "../layouts/DefaultLayout";
import CustomText from "../components/CustomText";
import { Loader } from "../components/Loader";
import { Image, ScrollView, View } from "react-native";
import { FlexWrap } from "../components/FlexWrap";
import { CustomButton } from "../components/CustomButton";
import { useTheme } from "../providers/ThemeProvider";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from '../store/slices/userSlice';

export default function Settings({ navigation }) {
    const [loader, setLoader] = useState(false);
    const { i18n, t } = useTranslation();
    const { supportedLangs } = i18n.services.resourceStore.data;
    const dispatch = useDispatch();
    const user = useSelector((state) => state.authUser.user);
    const themes = ['light', 'dark'];

    const { dark, colors, setScheme } = useTheme();


    const getMe = async () => {
        await axios.get('auth/me')
            .then(response => {
                dispatch(authenticate(response.data.user));
            });
    };

    const changeLanguage = async (code) => {
        try {
            await AsyncStorage.setItem('language', code);
            axios.defaults.headers.common['Accept-Language'] = code;

            if (user.user_id) {
                axios.post('auth/change_language/' + code)
                    .then(response => {
                        getMe();
                    });
            }
        }
        catch (error) {
            alert('Language change error');
        }

        i18n.changeLanguage(code);
    }

    const changeTheme = async (theme) => {
        try {
            await AsyncStorage.setItem('theme', theme);

            if (user.user_id) {
                axios.post('auth/change_theme/' + theme)
                    .then(response => {
                        getMe();
                    });
            }
        } catch (error) {
            alert('Theme change error');
        }
        setScheme(theme);
    }

    return (
        loader
            ?
            <Loader />
            :
            <DefaultLayout title={t('settings.settings_title')} navigation={navigation}>
                <ScrollView>
                    <View style={{ marginBottom: 20 }}>
                        <CustomText marginBottom={10}>{t('settings.app_language') + ':'}</CustomText>
                        <FlexWrap>
                            {supportedLangs.map(lang => (
                                <CustomButton
                                    key={lang.code}
                                    color={colors.active}
                                    borderWidth={1}
                                    borderColor={i18n.resolvedLanguage === lang.code ? colors.primary : colors.border}
                                    onPressHandle={() => changeLanguage(lang.code)}>
                                    <Image style={{ width: 18, height: 14, borderWidth: 1, borderColor: colors.border }} source={
                                        lang.code === 'ru'
                                            ?
                                            require('../assets/images/flags/ru.png')
                                            :
                                            require('../assets/images/flags/kk.png')
                                    } />
                                    <CustomText>
                                        {lang.locale}
                                    </CustomText>
                                </CustomButton>
                            ))}
                        </FlexWrap>
                    </View>

                    <View style={{ marginBottom: 20 }}>
                        <CustomText marginBottom={10}>{t('settings.app_theme') + ':'}</CustomText>
                        <FlexWrap>
                            {themes.map(theme => (
                                <CustomButton
                                    key={theme}
                                    color={colors.active}
                                    borderWidth={1}
                                    borderColor={theme === 'dark' && dark && colors.primary || theme === 'light' && !dark && colors.primary || colors.border}
                                    onPressHandle={() => changeTheme(theme)}>
                                    {theme === 'light'
                                        ?
                                        <Ionicons name='sunny-outline' size={18} color={colors.text} />
                                        :
                                        <Ionicons name='moon-outline' size={18} color={colors.text} />
                                    }
                                    <CustomText>
                                        {t('settings.themes.' + theme)}
                                    </CustomText>
                                </CustomButton>
                            ))}
                        </FlexWrap>
                    </View>
                </ScrollView>
            </DefaultLayout>
    );
}