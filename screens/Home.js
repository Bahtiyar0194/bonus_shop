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
import { Avatar } from '../components/Avatar';
import stylesConfig from '../config/styles';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FlexWrap } from '../components/FlexWrap';
import { useTheme } from '../providers/ThemeProvider';
import { useIsFocused } from "@react-navigation/native";
import { CarouselSliderHorizontal } from '../components/CarouselSliderHorizontal';
import { FlexColumn } from '../components/FlexColumn';
import API_URL from "../config/api";
import SITE_URL from '../config/site';
import { PressableLink } from '../components/PressableLink';
import { RoleProvider } from '../providers/RoleProvider';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { CustomModal } from '../components/CustomModal';
import { SectionList } from 'react-native';
import { ListItem } from '../components/ListItem';
import { CustomButton } from '../components/CustomButton';
import { Card } from '../components/Card';
import { ShareButton } from '../components/ShareButton';
import { ClipboardButton } from '../components/ClipboardButton';

export default function Home({ navigation }) {
    const isFocused = useIsFocused();
    const { colors, setScheme, dark } = useTheme();
    const [loader, setLoader] = useState(false);
    const user = useSelector((state) => state.authUser.user);
    const { i18n, t } = useTranslation();
    const dispatch = useDispatch();

    const [cities, setCities] = useState([]);
    const [stocks, setStocks] = useState([]);
    const [services, setServices] = useState([]);
    const [products, setProducts] = useState([]);
    const [detected_location, setDetectedLocation] = useState(null);
    const [locationModalVisible, setLocationModalVisible] = useState(false);

    const getCurrentLang = async () => {
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

    const getCurrentTheme = async () => {
        let theme = await AsyncStorage.getItem('theme');

        if (theme) {
            setScheme(theme);
        }
    }

    const getToken = async () => {
        let token = await AsyncStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        setTimeout(() => {
            getUser();
        }, 200);
    }

    const removeToken = async () => {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('user_id');
    }

    const getUser = async () => {
        await axios.get('/auth/me')
            .then(response => {
                dispatch(authenticate(response.data.user));
                AsyncStorage.setItem('user_id', ''+ response.data.user.user_id +'');

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
                getMyLocation();
                fetchCategories();
            });
    }

    const fetchStocks = async (location_id) => {
        let user_id = await AsyncStorage.getItem('user_id');
        setLoader(true);
        await axios
            .get('/stocks/get/' + location_id, { params: { user_id: user_id } })
            .then(({ data }) => {
                setStocks(data.stocks);
            })
            .catch((err) => {
                alert(t('errors.network_error'));
            }).finally(() => {
                setLoader(false);
            })
    }

    const fetchCategories = async (category_id) => {
        setLoader(true);
        let url = category_id ? ('/categories/get/' + category_id) : '/categories/get';
        await axios
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

    const getMyLocation = async () => {
        let current_location_id = await AsyncStorage.getItem('current_location_id');

        if (!current_location_id) {
            let { status } = await Location.requestForegroundPermissionsAsync();
            getCities();

            if (status !== 'granted') {
                setLocationModalVisible(true);
            }
            else {
                let location = await Location.getCurrentPositionAsync({});
                await axios.post('/cities/find_by_coordinates', {
                    latitude: parseInt(location.coords.latitude),
                    longitude: parseInt(location.coords.longitude)
                })
                    .then(response => {
                        if (response.data.city) {
                            setDetectedLocation(response.data.city);
                        }
                    }).catch(err => {
                        alert(t('errors.network_error'));
                    }).finally(() => {
                        setLocationModalVisible(true);
                    });
            }
        }
        else {
            fetchStocks(current_location_id);
        }
    };

    const changeLocation = async (select_value) => {
        await AsyncStorage.setItem('current_location_id', select_value.toString());

        if (user.user_id) {
            setLoader(true);
            await axios
                .post('/auth/change_location/' + select_value)
                .catch((err) => {
                    alert(t('errors.network_error'));
                }).finally(() => {
                    setLoader(false);
                })
        }

        setLocationModalVisible(false);
        fetchStocks(select_value);
    }

    const getCities = async () => {
        setLoader(true);

        await axios.get('/cities/get')
            .then(response => {
                setCities(response.data.cities);
            }).catch(err => {
                alert(t('errors.network_error'));
            }).finally(() => {
                setLoader(false);
            });
    }

    const styles = StyleSheet.create({
        sliderItem: {
            flexDirection: 'column',
            alignItems: 'center',
            gap: 10,
            minWidth: 80,
            padding: 10,
            minHeight: 50,
            position: 'relative',
            backgroundColor: colors.active,
            borderRadius: 10,
            overflow: 'hidden',
            borderWidth: dark ? 0 : 1,
            borderColor: colors.border
        }
    });

    const pickStockImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: false,
            selectionLimit: 1,
            base64: true,
            quality: 1
        });

        if (!result.canceled) {
            navigation.navigate('CreateStock', { image: result.assets[0].base64 });
        }
    };

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
            <>
                <Container justifyContent={'space-between'}>
                    <View style={{ width: '100%', backgroundColor: dark ? colors.active : colors.primary, borderBottomEndRadius: 10, borderBottomStartRadius: 10 }}>
                        <FlexColumn gap={20} padding={10}>
                            <FlexWrap width={'100%'} justifyContent={'space-between'} alignItems={'center'}>
                                <Image style={{ width: 70, height: 35 }} resizeMode='contain' source={require('../assets/logo.png')} />
                                <FlexWrap>
                                    <Pressable onPress={() => user?.user_id ? navigation.navigate('Dashboard') : navigation.navigate('Login')}>
                                        <Ionicons name='person' size={24} color={'#fff'} />
                                    </Pressable>
                                    <Pressable onPress={() => navigation.navigate('Settings')}>
                                        <Ionicons name='settings-outline' size={24} color={'#fff'} />
                                    </Pressable>
                                </FlexWrap>
                            </FlexWrap>
                        </FlexColumn>
                    </View>
                    <ScrollView fadingEdgeLength={100}>
                        <FlexColumn gap={15} flex={1}>
                            {(stocks.length > 0 || user?.current_role_id == 4) && <CarouselSliderHorizontal marginHorizontal={10}>
                                <RoleProvider roles={[4]}>
                                    <TouchableOpacity activeOpacity={.8} onPress={() => pickStockImage()}>
                                        <View style={{ width: 100, height: 150, padding: 2, borderRadius: 10, backgroundColor: colors.active, borderWidth: 2, borderStyle: 'dashed', borderColor: colors.primary, justifyContent: 'center', alignItems: 'center' }}>
                                            <Ionicons name='add-circle-outline' size={42} color={colors.primary} />
                                        </View>
                                    </TouchableOpacity>
                                </RoleProvider>
                                {stocks.map((item, index) => (
                                    <TouchableOpacity key={index} activeOpacity={.8} onPress={() => navigation.navigate('Stock', { sliderIndex: index, stocks: stocks })}>
                                        <View style={{ width: 100, height: 150, padding: 2, borderRadius: 10, borderWidth: 2, borderColor: item.my_view == 0 ? colors.primary : colors.active }}>
                                            <Image style={{ width: '100%', height: '100%', borderRadius: 7, resizeMode: 'cover' }} source={{ uri: API_URL + '/stocks/get_image/' + item.stock_id }} />
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </CarouselSliderHorizontal>}

                            {user.user_id &&
                                <FlexWrap paddingHorizontal={10}>
                                    <Card backgroundColor={colors.primary}>
                                        <Pressable onPress={() => navigation.navigate('Bonuses', { user: user })}>
                                            <FlexWrap alignItems={'center'} justifyContent={'space-between'}>
                                                <View>
                                                    <CustomText color={'#fff'} size={stylesConfig.fontSize.text_xl} fontFamily={stylesConfig.fontFamily[700]}>{user.current_role_name}</CustomText>
                                                    <FlexWrap gap={1}>
                                                        <CustomText color={'#fff'}>{t('bonuses.title') + ': '}</CustomText>
                                                        <CustomText color={'#fff'} fontFamily={stylesConfig.fontFamily[700]}>{user.bonuses.all_active_bonuses.toFixed(2)}</CustomText>
                                                    </FlexWrap>
                                                </View>
                                                <Ionicons name='chevron-forward' size={32} color={'#fff'} />
                                            </FlexWrap>
                                        </Pressable>
                                    </Card>
                                </FlexWrap>
                            }
                            <FlexWrap paddingHorizontal={10}>
                                <View style={{ width: '100%', padding: 10, borderRadius: 10, backgroundColor: colors.active, borderColor: colors.border, borderWidth: dark ? 0 : 1 }}>
                                    <Pressable onPress={() => navigation.navigate('SearchMap')}>
                                        <FlexWrap alignItems={'center'}>
                                            <Ionicons name='search-outline' size={24} color={colors.secondary} />
                                            <CustomText fontFamily={stylesConfig.fontFamily[500]} color={colors.secondary}>{t('partners.search_title')}</CustomText>
                                        </FlexWrap>
                                    </Pressable>
                                </View>
                            </FlexWrap>

                            {services?.length > 0 &&
                                <>
                                    <FlexWrap paddingHorizontal={10} justifyContent={'space-between'} width={'100%'}>
                                        <CustomText fontFamily={stylesConfig.fontFamily[700]}>{t('categories.services')}</CustomText>
                                        {/* <PressableLink size={stylesConfig.fontSize.text_sm} color={colors.secondary} text={'Все услуги'} /> */}
                                    </FlexWrap>

                                    <CarouselSliderHorizontal marginHorizontal={10}>
                                        {services.map(item => (
                                            <TouchableOpacity key={item.id} activeOpacity={.8} onPress={() => item.childs.length > 0 ? navigation.navigate('CategoriesList', { title: item.name, category_id: item.id }) : navigation.navigate('SearchMap', { search_query: item.name })}>
                                                <View style={styles.sliderItem}>
                                                    <Ionicons name={item.image + '-outline'} size={36} color={colors.primary} />
                                                    <CustomText fontFamily={stylesConfig.fontFamily[500]} size={stylesConfig.fontSize.text_xs}>{item.name}</CustomText>
                                                </View>
                                            </TouchableOpacity>
                                        ))}
                                    </CarouselSliderHorizontal>
                                </>
                            }

                            {products?.length > 0 &&
                                <>
                                    <FlexWrap paddingHorizontal={10} justifyContent={'space-between'} width={'100%'}>
                                        <CustomText fontFamily={stylesConfig.fontFamily[700]}>{t('categories.products')}</CustomText>
                                        {/* <PressableLink size={stylesConfig.fontSize.text_sm} color={colors.secondary} text={'Все услуги'} /> */}
                                    </FlexWrap>

                                    <CarouselSliderHorizontal marginHorizontal={10}>
                                        {products.map(item => (
                                            <TouchableOpacity key={item.category_id} activeOpacity={.8} onPress={() => item.childs.length > 0 ? navigation.navigate('CategoriesList', { title: item.category_name, category_id: item.category_id }) : navigation.navigate('ServicesList', { title: item.category_name, category_id: item.category_id })}>
                                                <View style={styles.sliderItem}>
                                                    <FlexWrap>
                                                        <Image style={styles.sliderItemImage} source={{ uri: API_URL + '/categories/get_image/' + item.image }} />

                                                        {
                                                            item.category_name && <CustomText fontFamily={stylesConfig.fontFamily[500]} size={stylesConfig.fontSize.text_xs}>{item.category_name}</CustomText>
                                                        }
                                                    </FlexWrap>
                                                </View>
                                            </TouchableOpacity>
                                        ))}
                                    </CarouselSliderHorizontal>
                                </>
                            }

                            {user?.user_id &&
                                <FlexColumn paddingHorizontal={10}>
                                    <CustomText fontFamily={stylesConfig.fontFamily[700]}>{t('misc.your_referral_link')}:</CustomText>
                                    <Card borderWidth={1}>
                                        <FlexWrap justifyContent={'space-between'}>
                                            <CustomText color={colors.secondary} fontFamily={stylesConfig.fontFamily[500]}>{SITE_URL}/auth/register/{user?.login}</CustomText>
                                            <FlexWrap>
                                                <ClipboardButton message={SITE_URL + '/auth/register/' + user.login}>
                                                    <Ionicons name='copy-outline' color={colors.text} size={24} />
                                                </ClipboardButton>
                                                <ShareButton message={SITE_URL + '/auth/register/' + user.login}>
                                                    <Ionicons name='share-social-outline' color={colors.text} size={24} />
                                                </ShareButton>
                                            </FlexWrap>
                                        </FlexWrap>
                                    </Card>
                                    <CustomText fontFamily={stylesConfig.fontFamily[700]}>{t('misc.for_business')}:</CustomText>
                                    <PressableLink width={'100%'} text={t('partners.become_a_partner')} fontFamily={stylesConfig.fontFamily[700]} onPressHandle={() => navigation.navigate('BecomePartner')} />
                                    <PressableLink width={'100%'} text={t('managers.become_a_manager')} fontFamily={stylesConfig.fontFamily[700]} onPressHandle={() => navigation.navigate('BecomeManager')} />
                                </FlexColumn>
                            }
                        </FlexColumn>
                    </ScrollView>

                    <View style={{ width: '100%', backgroundColor: colors.active, height: 64, paddingTop: 10, borderWidth: 0, borderTopEndRadius: 10, borderTopStartRadius: 10 }}>
                        <FlexWrap width={'100%'} justifyContent={'flex-end'} alignItems={'center'}>
                            <Pressable style={{ position: 'absolute', left: 10, top: -20 }} onPress={() => 
                            user?.user_id && (user?.current_role_id == 4 || user?.current_role_id == 5) ? navigation.navigate('CreateOperation') : user?.user_id && (user?.current_role_id == 1 || user?.current_role_id == 2 || user?.current_role_id == 3) ? navigation.navigate('Scanner') 
                            : navigation.navigate('Login')}>
                                <View style={{ width: 72, height: 72, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', borderRadius: 36, borderWidth: 5, borderColor: colors.active }}>
                                    <Ionicons name='qr-code-outline' size={32} color={'#fff'} />
                                </View>
                            </Pressable>
                            <FlexWrap width={'70%'} justifyContent={'space-between'} alignItems={'center'}>
                                <Pressable>
                                    <FlexColumn flexDirection={'column'} gap={2}>
                                        <Ionicons name='notifications-outline' size={26} color={colors.primary} />
                                        <CustomText fontFamily={stylesConfig.fontFamily[500]} size={stylesConfig.fontSize.text_xs}>{t('news.title')}</CustomText>
                                    </FlexColumn>
                                </Pressable>
                                <Pressable>
                                    <FlexColumn flexDirection={'column'} gap={2}>
                                        <Ionicons name='trophy-outline' size={26} color={colors.primary} />
                                        <CustomText fontFamily={stylesConfig.fontFamily[500]} size={stylesConfig.fontSize.text_xs}>{t('contests.title')}</CustomText>
                                    </FlexColumn>
                                </Pressable>
                                <Pressable>
                                    <FlexColumn flexDirection={'column'} gap={2}>
                                        <Ionicons name='help-circle-outline' size={26} color={colors.primary} />
                                        <CustomText fontFamily={stylesConfig.fontFamily[500]} size={stylesConfig.fontSize.text_xs}>{t('questions.title')}</CustomText>
                                    </FlexColumn>
                                </Pressable>
                            </FlexWrap>
                        </FlexWrap>
                    </View>

                    <CustomModal show={locationModalVisible} hide={() => setLocationModalVisible(false)} modal_title={t('location.choose_your_location')} hideCloseButton={true}>
                        {detected_location
                            ?
                            <View>
                                <FlexColumn>
                                    <CustomText fontFamily={stylesConfig.fontFamily[500]}>{t('location.your_location_is', { city: detected_location.name })}</CustomText>
                                    <FlexWrap gap={4}>
                                        <CustomButton borderColor={colors.primary} borderWidth={1} onPressHandle={() => changeLocation(detected_location.id)}>
                                            <CustomText color={'#fff'}>{t('misc.yes')}</CustomText>
                                        </CustomButton>
                                        <CustomButton color={colors.active} borderColor={colors.secondary} borderWidth={1} onPressHandle={() => setDetectedLocation(null)}>
                                            <CustomText color={colors.secondary}>{t('location.choose_another_city')}</CustomText>
                                        </CustomButton>
                                    </FlexWrap>
                                </FlexColumn>
                            </View>
                            :
                            <SectionList
                                sections={cities}
                                keyExtractor={(item, index) => item + index}
                                renderSectionHeader={({ section: { title } }) => (
                                    <ListItem last={true} key={title}>
                                        <CustomText fontFamily={stylesConfig.fontFamily[700]}>{title}</CustomText>
                                    </ListItem>
                                )}
                                renderItem={({ item }) => (
                                    <ListItem key={item.id} onPressHandler={() => changeLocation(item.id)}>
                                        <CustomText>{item.name}</CustomText>
                                    </ListItem>
                                )}
                            />
                        }
                    </CustomModal>
                </Container>
            </>
    );
}