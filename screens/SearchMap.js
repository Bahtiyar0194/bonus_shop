import { useState, useEffect, useRef } from 'react';
import { useSelector } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from "react-native-maps";
import { useTheme } from '../providers/ThemeProvider';
import { View, Image, Dimensions } from 'react-native';
import CustomText from '../components/CustomText';
import stylesConfig from '../config/styles';
import { CarouselSliderHorizontal } from '../components/CarouselSliderHorizontal';
import API_URL from '../config/api';
import { FlexColumn } from '../components/FlexColumn';
import { FlexWrap } from '../components/FlexWrap';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';
import { CustomInput } from '../components/CustomInput';
import { useTranslation } from 'react-i18next';
import { Pressable } from 'react-native';
import { CustomModal } from '../components/CustomModal';
import { SectionList } from 'react-native';
import { ListItem } from '../components/ListItem';
import * as Location from 'expo-location';
import * as Linking from 'expo-linking';
import { CustomButton } from '../components/CustomButton';
import { TouchableOpacity } from 'react-native';
import { useDebouncedCallback } from 'use-debounce';
import { ScrollView } from 'react-native';
import { Card } from '../components/Card';
import { FlatList } from 'react-native';

export default function SearchMap({ navigation, route }) {
    const user = useSelector((state) => state.authUser.user);
    const mapCustomStyle = [{ "elementType": "geometry", "stylers": [{ "color": "#242f3e" }] }, { "elementType": "labels.text.fill", "stylers": [{ "color": "#746855" }] }, { "elementType": "labels.text.stroke", "stylers": [{ "color": "#242f3e" }] }, { "featureType": "administrative.locality", "elementType": "labels.text.fill", "stylers": [{ "color": "#d59563" }] }, { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [{ "color": "#d59563" }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#263c3f" }] }, { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [{ "color": "#6b9a76" }] }, { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#38414e" }] }, { "featureType": "road", "elementType": "geometry.stroke", "stylers": [{ "color": "#212a37" }] }, { "featureType": "road", "elementType": "labels.text.fill", "stylers": [{ "color": "#9ca5b3" }] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#746855" }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#1f2835" }] }, { "featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [{ "color": "#f3d19c" }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#2f3948" }] }, { "featureType": "transit.station", "elementType": "labels.text.fill", "stylers": [{ "color": "#d59563" }] }, { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#17263c" }] }, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "color": "#515c6d" }] }, { "featureType": "water", "elementType": "labels.text.stroke", "stylers": [{ "color": "#17263c" }] }]
    const map = useRef(null);

    const [city, setCity] = useState('');
    const [cities, setCities] = useState([]);
    const [branches, setBranches] = useState([]);
    const [branch, setBranch] = useState(null);
    const [locationModalVisible, setLocationModalVisible] = useState(false);
    const [phoneModalVisible, setPhoneModalVisible] = useState(false);
    const [subCategoriesModalVisible, setSubCategoriesModalVisible] = useState(false);

    const [search_query, setSearchQuery] = useState(route.params?.search_query || '');

    const [categories, setCategories] = useState([]);
    const [sub_categories, setSubCategories] = useState([]);


    const { t } = useTranslation();

    const [location, setLocation] = useState({
        latitude: 1,
        longitude: 1,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2,
    });

    const { colors, dark } = useTheme();

    const getBranches = async (city_id) => {
        const form_data = new FormData();
        form_data.append('city_id', city_id);
        form_data.append('search_query', search_query);

        await axios.post('/services/get', form_data)
            .then(response => {
                setBranches(response.data.services);
            }).catch(err => {
                alert(t('errors.network_error'));
            });
    }

    const debounced = useDebouncedCallback((value) => { setSearchQuery(value) }, 500);

    const getMyLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status === 'granted') {
            let location = await Location.getCurrentPositionAsync({});

            if (map.current) {
                map.current.animateCamera(
                    {
                        center: {
                            latitude: parseFloat(location.coords.latitude),
                            longitude: parseFloat(location.coords.longitude),
                            latitudeDelta: 1,
                            longitudeDelta: 1
                        },
                        zoom: 18,
                        altitude: 18
                    },
                    15000
                );
            }
        }

    };

    const getCity = async (city_id) => {
        let current_location_id;
        if (city_id) {
            current_location_id = city_id;
        }
        else {
            current_location_id = await AsyncStorage.getItem('current_location_id');

            if (user.current_location_id) {
                current_location_id = user.current_location_id;
            }
        }


        await axios.get('/cities/get/' + current_location_id)
            .then(response => {
                setCity(response.data.city);

                setLocation({
                    latitude: parseFloat(response.data.city.latitude),
                    longitude: parseFloat(response.data.city.longitude),
                    latitudeDelta: 0.2,
                    longitudeDelta: 0.2,
                });

                if (map.current) {
                    map.current.animateCamera(
                        {
                            center: {
                                latitude: parseFloat(response.data.city.latitude),
                                longitude: parseFloat(response.data.city.longitude),
                                latitudeDelta: 0.1,
                                longitudeDelta: 0.1
                            }
                        },
                        15000
                    );
                }
                getBranches(current_location_id);
            }).catch(err => {
                alert(t('errors.network_error'));
            });
    }

    const getCities = async () => {
        await axios.get('/cities/get')
            .then(response => {
                setCities(response.data.cities);
            }).catch(err => {
                alert(t('errors.network_error'));
            });
    }

    const changeLocation = async (select_value) => {
        await AsyncStorage.setItem('current_location_id', select_value.toString());
        if (user.user_id) {
            await axios
                .post('auth/change_location/' + select_value)
                .catch((err) => {
                    alert(t('errors.network_error'));
                });
        }

        getCity(select_value);

        setLocationModalVisible(false);
    }

    const fetchCategories = (category_id) => {
        let url = category_id ? ('/categories/get/' + category_id) : '/categories/get';
        axios
            .get(url)
            .then(({ data }) => {
                setCategories(data.services);
            })
            .catch((err) => {
                alert(t('errors.network_error'));
            });
    }

    const getSubCategories = (childs) => {
        setSubCategories(childs);
        setSubCategoriesModalVisible(true);
    }

    const selectSubCategory = (name) => {
        setSubCategoriesModalVisible(false);
        setSearchQuery(name);
    }

    useEffect(() => {
        getCity();
        getCities();
        fetchCategories();
    }, []);

    useEffect(() => {
        getBranches(city.id);
    }, [search_query]);

    return (
        <View style={{ width: '100%', height: '100%', position: "relative" }}>
            <View style={{ position: 'absolute', bottom: 0, zIndex: 2 }}>
                {branch && <>
                    {branch.images.length > 0 &&
                        <CarouselSliderHorizontal marginHorizontal={15}>
                            {branch.images.map((item, index) => (
                                <TouchableOpacity key={index} activeOpacity={.8} onPress={() => navigation.navigate('FullImageSlider', { sliderIndex: index, images: branch.images, url: '/branches/get_image/' })}>
                                    <Image style={{ resizeMode: 'cover', width: 80, height: 80, borderRadius: 10 }} source={{ uri: API_URL + '/branches/get_image/' + item.file_name }} />
                                </TouchableOpacity>
                            ))}
                        </CarouselSliderHorizontal>
                    }
                </>}
                <View style={{ width: '100%', marginTop: 10, backgroundColor: colors.active, borderTopEndRadius: 15, borderTopStartRadius: 15 }}>
                    <FlexColumn flexDirection={'column'} alignItems={'flex-start'} paddingVertical={15}>
                        {!branch &&
                            <>
                                <FlexWrap paddingHorizontal={15} width={'100%'} alignItems={'center'}>
                                    <CustomInput flex={1} borderWidth={dark ? 0 : 1} placeholder={t('misc.search')} input_value={search_query} setInputValue={debounced} icon={'search-outline'}></CustomInput>
                                    <Pressable onPress={() => setLocationModalVisible(true)}>
                                        <Ionicons name='location-outline' size={26} color={colors.secondary} />
                                    </Pressable>
                                </FlexWrap>
                                <CarouselSliderHorizontal marginHorizontal={15}>
                                    {categories.map(item => (
                                        <Pressable key={item.id} onPress={() => item.childs.length > 0 ? getSubCategories(item.childs) : setSearchQuery(item.name)} style={{ backgroundColor: colors.inactive, borderColor: search_query === item.name ? colors.primary : (dark ? colors.inactive : colors.border), borderWidth: 1, padding: 8, borderRadius: 10 }}>
                                            <FlexWrap gap={4}>
                                                <Ionicons name={item.image + '-outline'} size={18} color={colors.primary} />
                                                <CustomText size={stylesConfig.fontSize.text_xs} fontFamily={stylesConfig.fontFamily[500]}>{item.name}</CustomText>
                                            </FlexWrap>
                                        </Pressable>
                                    ))}
                                </CarouselSliderHorizontal>
                            </>
                        }

                        {branch ?
                            <FlexColumn paddingHorizontal={15} gap={10}>
                                <FlexWrap gap={10}>
                                    <Pressable
                                        style={{
                                            width: 30,
                                            height: 30,
                                            backgroundColor: colors.active,
                                            borderWidth: 1,
                                            borderColor: colors.border,
                                            borderRadius: 15,
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                        onPress={() => setBranch(null)}>
                                        <Ionicons name='arrow-back-outline' size={24} color={colors.secondary} />
                                    </Pressable>
                                    <CustomText flex={1} size={stylesConfig.fontSize.text_lg} fontFamily={stylesConfig.fontFamily[700]}>
                                        {branch.partner_name}
                                    </CustomText>
                                </FlexWrap>

                                <Card backgroundColor={colors.inactive} borderWidth={1}>
                                    <FlexWrap width={'100%'} gap={4}>
                                        <Ionicons color={colors.primary} name='location-outline' size={22} />
                                        <CustomText fontFamily={stylesConfig.fontFamily[500]}>{branch.city_name}, {branch.street} {branch.house}</CustomText>
                                    </FlexWrap>
                                </Card>

                                <Card backgroundColor={colors.inactive} borderWidth={1}>
                                    <FlexWrap width={'100%'} gap={4}>
                                        <Ionicons color={colors.primary} name={branch.image + '-outline'} size={22} />
                                        <CustomText fontFamily={stylesConfig.fontFamily[500]}>{branch.category_name}</CustomText>
                                    </FlexWrap>

                                    <FlexWrap width={'100%'} gap={4}>
                                        <Ionicons color={colors.primary} name={'list-outline'} size={22} />
                                        <CustomText fontFamily={stylesConfig.fontFamily[500]}>{branch.service_description}</CustomText>
                                    </FlexWrap>
                                </Card>

                                <FlexWrap width={'100%'} gap={8}>
                                    <CustomButton onPressHandle={() => Linking.openURL('geo:' + branch.latitude + ',' + branch.longitude + '')}>
                                        <Ionicons color={'#fff'} name='location' size={24} />
                                        <CustomText color={'#fff'} fontFamily={stylesConfig.fontFamily[500]}>{t('location.build_a_route')}</CustomText>
                                    </CustomButton>

                                    <CustomButton color={colors.active} borderColor={colors.primary} borderWidth={1} onPressHandle={() => setPhoneModalVisible(true)}>
                                        <Ionicons color={colors.primary} name='call' size={24} />
                                        <CustomText color={colors.primary} fontFamily={stylesConfig.fontFamily[500]}>{t('misc.call')}</CustomText>
                                    </CustomButton>
                                </FlexWrap>
                            </FlexColumn>
                            :
                            branches.length > 0 && search_query &&
                            <View style={{ paddingHorizontal: 15, width: '100%' }}>
                                <FlexColumn flexDirection={'column'} alignItems={'flex-start'}>
                                    <CustomText>{t('branches.found_objects', { count: branches.length })}</CustomText>
                                    <ScrollView style={{ maxHeight: 280, width: '100%' }}>
                                        {branches.map((item, index) => (
                                            <Card marginBottom={branches.length != (index + 1) ? 10 : 0} backgroundColor={colors.inactive} borderWidth={1} key={index}>
                                                <Pressable onPress={() => setBranch(item)}>
                                                    <FlexColumn gap={5} flexDirection={'column'} alignItems={'flex-start'}>
                                                        {item.images.length > 0 &&
                                                            <CarouselSliderHorizontal>
                                                                {item.images.map((item, index) => (
                                                                    <Image key={index} style={{ resizeMode: 'cover', width: 80, height: 80, borderRadius: 10 }} source={{ uri: API_URL + '/branches/get_image/' + item.file_name }} />
                                                                ))}
                                                            </CarouselSliderHorizontal>
                                                        }
                                                        <CustomText fontFamily={stylesConfig.fontFamily[700]}>{item.partner_name}</CustomText>
                                                        <CustomText color={colors.secondary} fontFamily={stylesConfig.fontFamily[200]} size={stylesConfig.fontSize.text_xs}>{item.category_name}</CustomText>
                                                    </FlexColumn>
                                                </Pressable>
                                            </Card>
                                        ))}
                                    </ScrollView>
                                </FlexColumn>
                            </View>
                        }
                    </FlexColumn>
                </View>
            </View>

            <Pressable onPress={() => getMyLocation()} style={{ position: 'absolute', zIndex: 1, right: 10, bottom: '50%', width: 48, height: 48, backgroundColor: colors.active, borderRadius: 24, justifyContent: 'center', alignItems: 'center' }}>
                <Ionicons name='locate-outline' size={24} color={colors.text} />
            </Pressable>

            <MapView
                ref={map}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                showsMyLocationButton={false}
                initialRegion={location}
                style={{ width: '100%', height: '100%' }}
                customMapStyle={dark === true ? mapCustomStyle : null}
                onPress={() => setBranch(null)}
            >
                {branches?.map((item, index) => (
                    <Marker key={index} coordinate={{
                        latitude: parseFloat(item.latitude),
                        longitude: parseFloat(item.longitude),
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                        onPress={() => setBranch(item)}
                        pinColor={colors.primary}
                        title={item.partner_name} />
                ))}
            </MapView>


            <CustomModal show={locationModalVisible} hide={() => setLocationModalVisible(false)} modal_title={t('location.choose_your_location')}>
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
                            <CustomText color={city?.id == item.id ? colors.primary : colors.text} fontFamily={city?.id == item.id && stylesConfig.fontFamily[500]}>{item.name}</CustomText>
                        </ListItem>
                    )}
                />
            </CustomModal>

            <CustomModal show={phoneModalVisible} hide={() => setPhoneModalVisible(false)} modal_title={t('misc.contact_details')}>
                <ListItem first={true} last={!branch?.branch_phone_additional} onPressHandler={() => Linking.openURL('tel:' + branch?.branch_phone)}>
                    <FlexWrap>
                        <Ionicons color={colors.primary} name='call' size={22} />
                        <CustomText fontFamily={stylesConfig.fontFamily[500]}>{branch?.branch_phone}</CustomText>
                    </FlexWrap>
                </ListItem>
                {branch?.branch_phone_additional &&
                    <ListItem last={true} onPressHandler={() => Linking.openURL('tel:' + branch?.branch_phone_additional)}>
                        <FlexWrap>
                            <Ionicons color={colors.primary} name='call' size={22} />
                            <CustomText fontFamily={stylesConfig.fontFamily[500]}>{branch?.branch_phone_additional}</CustomText>
                        </FlexWrap>
                    </ListItem>
                }
            </CustomModal>

            <CustomModal show={subCategoriesModalVisible} hide={() => setSubCategoriesModalVisible(false)} modal_title={t('categories.choose_a_category')}>
                <FlatList
                    data={sub_categories}
                    renderItem={({ item, index }) =>
                        <ListItem last={sub_categories.length === (index + 1)} key={item.id} badge={item.services} onPressHandler={() => selectSubCategory(item.name)}>
                            <FlexWrap>
                                <Ionicons name={item.image + '-outline'} size={24} color={colors.primary} />
                                <CustomText>{item.name}</CustomText>
                            </FlexWrap>
                        </ListItem>
                    }
                />
            </CustomModal>
        </View>
    );
}