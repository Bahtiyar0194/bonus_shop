import { Pressable, View, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useTranslation } from "react-i18next";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from '../store/slices/userSlice';
import axios from 'axios';
import Container from '../components/Container';
import { Loader } from '../components/Loader';
import CustomText from '../components/CustomText';
import { Card } from '../components/Card';
import { Avatar } from '../components/Avatar';
import stylesConfig from '../config/styles';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FlexWrap } from '../components/FlexWrap';
import { useTheme } from '../providers/ThemeProvider';
import { useIsFocused } from "@react-navigation/native";
import { CarouselSliderHorizontal } from '../components/CarouselSliderHorizontal';
import { FlexColumn } from '../components/FlexColumn';
import API_URL from "../config/api";
import { PressableLink } from '../components/PressableLink';
import QRCode from 'react-native-qrcode-svg';

export default function Home({ navigation }) {
    const isFocused = useIsFocused();
    const { colors, setScheme } = useTheme();
    const [loader, setLoader] = useState(false);
    const user = useSelector((state) => state.authUser.user);
    const { i18n, t } = useTranslation();
    const dispatch = useDispatch();

    const [services, setServices] = useState([]);
    const [products, setProducts] = useState([]);

    async function getCurrentLang() {
        let lang = await AsyncStorage.getItem('language');

        if (lang) {
            i18n.changeLanguage(lang);
            axios.defaults.headers.common['Accept-Language'] = lang;
        }
        else {
            i18n.changeLanguage(i18n.resolvedLanguage);
            axios.defaults.headers.common['Accept-Language'] = i18n.resolvedLanguage;
        }
    }

    async function getCurrentTheme() {
        let theme = await AsyncStorage.getItem('theme');

        if (theme) {
            setScheme(theme);
        }
    }

    async function getUser() {
        await axios.get('/auth/me')
            .then(response => {
                dispatch(authenticate(response.data.user));

                if (response.data.user.lang_id) {
                    AsyncStorage.setItem('language', response.data.user.lang_tag);
                    i18n.changeLanguage(response.data.user.lang_tag);
                    axios.defaults.headers.common['Accept-Language'] = response.data.user.lang_tag;
                }

                if (response.data.user.theme_id) {
                    AsyncStorage.setItem('theme', response.data.user.theme_slug);
                    setScheme(response.data.user.theme_slug);
                }
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status == 401) {
                        dispatch(authenticate([]));
                        removeToken();
                    }
                }
                else {
                    alert(t('errors.network_error'));
                }
            })
            .finally(() => {
                setLoader(false);
                fetchCategories();
            });
    }

    async function getToken() {
        let token = await AsyncStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        setTimeout(() => {
            getUser();
        }, 200);
    }

    async function removeToken() {
        await AsyncStorage.removeItem('token');
    }


    const fetchCategories = (category_id) => {
        setLoader(true);
        let url = category_id ? ('/categories/get/' + category_id) : '/categories/get';
        axios
            .get(url)
            .then(({ data }) => {
                setServices(data.services);
                setProducts(data.products);
            })
            .catch((err) => {
                alert(t('errors.network_error'));
            }).finally(() => {
                setLoader(false);
            })
    }

    const styles = StyleSheet.create({
        sliderItem: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignContent: 'space-between',
            padding: 10,
            width: 160,
            minHeight: 100,
            position: 'relative',
            backgroundColor: colors.active,
            borderRadius: 15,
            overflow: 'hidden'
        },
        sliderItemImage: {
            resizeMode: 'contain',
            width: 70,
            height: 70
        }
    });

    useEffect(() => {
        if (isFocused) {
            setLoader(true);
            getCurrentTheme().then(getCurrentLang().then(getToken()));
        }
    }, [isFocused]);

    return (
        loader
            ?
            <Loader />
            :
            <Container alignItems={'center'} justifyContent={'space-between'}>
                <Card borderWidth={1}>
                    <FlexWrap justifyContent={'space-between'} alignItems={'center'}>
                        <Pressable onPress={() => user?.user_id ? navigation.navigate('Dashboard') : navigation.navigate('Login')}>
                            <FlexWrap>
                                <Avatar avatar_file={user.avatar} />
                                <View>
                                    {
                                        user?.user_id
                                            ?
                                            <>
                                                <CustomText fontFamily={stylesConfig.fontFamily[500]}>{user.first_name ? (user.first_name + ' ' + user.last_name) : user.phone}</CustomText>
                                                <FlexWrap gap={1}>
                                                    <CustomText size={stylesConfig.fontSize.text_xs} color={colors.secondary}>{t('bonuses') + ': '}</CustomText>
                                                    <CustomText size={stylesConfig.fontSize.text_xs} color={colors.primary}>{user.bonus.toFixed(2)}</CustomText>
                                                </FlexWrap>
                                            </>
                                            :
                                            <CustomText size={stylesConfig.fontSize.text_sm} color={colors.secondary} fontFamily={stylesConfig.fontFamily[500]}>{t('auth.sign_in') + ' / ' + t('auth.sign_up')}</CustomText>
                                    }
                                </View>
                            </FlexWrap>
                        </Pressable>
                        <Pressable onPress={() => navigation.navigate('Settings')}>
                            <Ionicons name='settings-outline' size={24} color={colors.secondary} />
                        </Pressable>
                    </FlexWrap>
                </Card>


                <ScrollView>
                    <FlexColumn gap={15} flex={1}>
                        {services?.length > 0 &&
                            <>
                                <FlexWrap paddingTop={10} justifyContent={'space-between'} width={'100%'}>
                                    <CustomText fontFamily={stylesConfig.fontFamily[700]}>{t('categories.services')}</CustomText>
                                    {/* <PressableLink size={stylesConfig.fontSize.text_sm} color={colors.secondary} text={'Все услуги'} /> */}
                                </FlexWrap>
                                <CarouselSliderHorizontal>
                                    {services.map(item => (
                                        <TouchableOpacity key={item.category_id} activeOpacity={.8} onPress={() => item.childs.length > 0 ? navigation.navigate('CategoriesList', { title: item.category_name, category_id: item.category_id }) : navigation.navigate('ServicesList', { title: item.category_name, category_id: item.category_id })}>
                                            <View style={[styles.sliderItem, { backgroundColor: item.bg_color }]}>
                                                {
                                                    item.category_name && <CustomText color={item.bg_color ? '#212121' : colors.text} fontFamily={stylesConfig.fontFamily[500]} size={stylesConfig.fontSize.text_sm}>{item.category_name}</CustomText>
                                                }
                                                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-end' }}>
                                                    <Image style={styles.sliderItemImage} source={{ uri: API_URL + '/categories/get_image/' + item.image }} />
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </CarouselSliderHorizontal>
                            </>
                        }

                        {products?.length > 0 &&
                            <>
                                <FlexWrap paddingTop={10} justifyContent={'space-between'} width={'100%'}>
                                    <CustomText fontFamily={stylesConfig.fontFamily[700]}>{t('categories.products')}</CustomText>
                                    {/* <PressableLink size={stylesConfig.fontSize.text_sm} color={colors.secondary} text={'Все услуги'} /> */}
                                </FlexWrap>

                                <CarouselSliderHorizontal>
                                    {products.map(item => (
                                        <TouchableOpacity key={item.category_id} activeOpacity={.8} onPress={() => item.childs.length > 0 ? navigation.navigate('CategoriesList', { title: item.category_name, category_id: item.category_id }) : navigation.navigate('ServicesList', { title: item.category_name, category_id: item.category_id })}>
                                            <View style={[styles.sliderItem, { backgroundColor: item.bg_color }]}>
                                                {
                                                    item.category_name && <CustomText color={item.bg_color ? '#212121' : colors.text} fontFamily={stylesConfig.fontFamily[500]} size={stylesConfig.fontSize.text_sm}>{item.category_name}</CustomText>
                                                }
                                                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-end' }}>
                                                    <Image style={styles.sliderItemImage} source={{ uri: API_URL + '/categories/get_image/' + item.image }} />
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </CarouselSliderHorizontal>
                            </>
                        }

                        {user?.user_id &&
                            <FlexColumn>
                                <CustomText fontFamily={stylesConfig.fontFamily[700]}>{t('misc.for_business')}:</CustomText>
                                <PressableLink width={'100%'} text={t('partners.become_a_partner')} fontFamily={stylesConfig.fontFamily[700]} onPressHandle={() => navigation.navigate('BecomePartner')} />
                                <PressableLink width={'100%'} text={t('managers.become_a_manager')} fontFamily={stylesConfig.fontFamily[700]} onPressHandle={() => navigation.navigate('BecomeManager')} />
                            </FlexColumn>
                        }
                    </FlexColumn>

                    {/* <QRCode
                        size={150}
                        value="http://awesome.link.qr"
                    /> */}

                </ScrollView>

                <View style={{
                    width: 64,
                    height: 64,
                    borderRadius: 64,
                    position: 'relative',
                    borderWidth: 2,
                    borderColor: colors.border,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: colors.active
                }}>
                    <Pressable onPress={() => user?.user_id ? navigation.navigate('Scanner') : navigation.navigate('Login')}>
                        <Ionicons name='qr-code-outline' size={32} color={colors.primary} />
                    </Pressable>
                </View>
            </Container>
    );
}