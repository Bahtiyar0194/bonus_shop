import { useTranslation } from "react-i18next";
import { useState, useEffect, useRef } from 'react';
import { Loader } from "../../../components/Loader";
import DefaultLayout from "../../../layouts/DefaultLayout";
import { CustomInput } from '../../../components/CustomInput';
import { CustomButton } from '../../../components/CustomButton';
import axios from 'axios';
import stylesConfig from '../../../config/styles';
import CustomText from '../../../components/CustomText';
import { FlexColumn } from "../../../components/FlexColumn";
import { ListItem } from "../../../components/ListItem";
import { PressableLink } from "../../../components/PressableLink";
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image, ScrollView, View } from "react-native";
import { useTheme } from "../../../providers/ThemeProvider";
import MapView from 'react-native-maps';
import { Marker } from "react-native-maps";
import * as Location from 'expo-location';
import { WorkRegulationItem } from "../../../components/WorkRegulationItem";
import { Card } from "../../../components/Card";
import * as ImagePicker from 'expo-image-picker';
import { CarouselSliderHorizontal } from "../../../components/CarouselSliderHorizontal";

export default function AddBranch({ navigation }) {
    const { t } = useTranslation();
    const { colors } = useTheme();

    const [finish, setFinish] = useState(false);

    const map = useRef(null);

    const [location, setLocation] = useState(null);
    const [myLocation, setMyLocation] = useState(false);
    const [specifyLocation, setSpecifyLocation] = useState(false);

    const [organizations, setOrganizations] = useState([]);
    const [organization, setOrganization] = useState('');

    const images_limit_number = 8;

    const [cities, setCities] = useState([]);
    const [week_days, setWeekDays] = useState([]);
    const [images, setImages] = useState([]);

    const [street, setStreet] = useState('');
    const [house, setHouse] = useState('');
    const [branch_phone, setBranchPhone] = useState('');
    const [branch_phone_additional, setBranchPhoneAdditional] = useState('');

    const [city, setCity] = useState('');

    const [loader, setLoader] = useState(false);
    const [error, setError] = useState([]);

    const changeLocation = async (coordinates) => {
        setLocation({
            latitude: parseFloat(coordinates.latitude),
            longitude: parseFloat(coordinates.longitude),
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        });
        if (map.current) {
            map.current.animateCamera(
                {
                    center: {
                        latitude: coordinates.latitude,
                        longitude: coordinates.longitude
                    }
                },
                5000
            );
        }
        //getCityByCoordinates(coordinates.latitude, coordinates.longitude);
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

    const getWeekDays = async () => {
        setLoader(true);

        await axios.get('/days/get_days_of_week')
            .then(response => {
                setWeekDays(response.data.week_days);
            }).catch(err => {
                alert(t('errors.network_error'));
            }).finally(() => {
                setLoader(false);
            });
    }

    const getCityByCoordinates = async (latitude, longitude) => {
        await axios.post('/cities/find_by_coordinates', {
            latitude: parseInt(latitude),
            longitude: parseInt(longitude)
        })
            .then(response => {
                if (response.data.city) {
                    setCity(response.data.city);
                }
                else {
                    setCity('');
                }
            }).catch(err => {
                alert(t('errors.network_error'));
            });
    }

    const getCoordinatesByCity = async (city_id) => {
        await axios.post('/cities/find_coordinates_by_city/' + city_id)
            .then(response => {
                if (response.data.city) {
                    setMyLocation(false);
                    setSpecifyLocation(true);
                    setLocation({
                        latitude: parseFloat(response.data.city.latitude),
                        longitude: parseFloat(response.data.city.longitude),
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    });
                    if (map.current) {
                        map.current.animateCamera(
                            {
                                center: {
                                    latitude: parseFloat(response.data.city.latitude),
                                    longitude: parseFloat(response.data.city.longitude)
                                }
                            },
                            5000
                        );
                    }
                }
            }).catch(err => {
                alert(t('errors.network_error'));
            });
    }

    const getMyLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            alert('Permission to access location was denied');
        }
        else {
            let location = await Location.getCurrentPositionAsync({});
            setMyLocation(true);
            setLocation({
                latitude: parseFloat(location.coords.latitude),
                longitude: parseFloat(location.coords.longitude),
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            });
            if (map.current) {
                map.current.animateCamera(
                    {
                        center: {
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude
                        }
                    },
                    5000
                );
            }

            getCityByCoordinates(location.coords.latitude, location.coords.longitude);
        }
    };

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            selectionLimit: images_limit_number,
            base64: true,
            quality: 1
        });

        if (!result.canceled) {
            setImages(result.assets);
        }
    };

    const fetchOrganizations = () => {
        setLoader(true);
        axios
            .get('/partners/my_organizations')
            .then(({ data }) => {
                setOrganizations(data.organizations);
            })
            .catch((err) => {
                alert(t('errors.network_error'));
            }).finally(() => {
                setLoader(false);
            });
    }

    const addBranch = async () => {
        setLoader(true);
        const form_data = new FormData();
        form_data.append('organization_id', organization.id);
        form_data.append('street', street);
        form_data.append('house', house);
        form_data.append('phone', branch_phone);
        form_data.append('phone_additional', branch_phone_additional);
        form_data.append('city', city.id);
        form_data.append('latitude', location.latitude);
        form_data.append('longitude', location.longitude);
        form_data.append('regulation', JSON.stringify(week_days));
        form_data.append('images', JSON.stringify(images));

        let token = await AsyncStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

        await axios.post('/branches/add', form_data)
            .then(response => {
                setError([]);
                setFinish(true);
            }).catch(err => {
                if (err.response) {
                    if (err.response.status == 422) {
                        setError(err.response.data.data);
                    }
                    else if (err.response.status == 401) {
                        alert(t('errors.not_logged_in'));
                    }
                }
            }).finally(() => {
                setLoader(false);
            });
    }

    useEffect(() => {
        getCities();
        getWeekDays();
        getMyLocation();
        fetchOrganizations();
    }, []);

    return (
        loader
            ?
            <Loader />
            :
            <DefaultLayout title={t('branches.add_a_branch')} navigation={navigation}>
                {
                    finish === true
                        ?
                        <FlexColumn justifyContent={'center'}>
                            <View style={{ width: '100%', alignItems: 'center' }}>
                                <Ionicons name='checkmark-circle-outline' size={72} color={colors.primary} />
                            </View>
                            <CustomText fontFamily={stylesConfig.fontFamily[500]} size={stylesConfig.fontSize.text_xl} textAlign={'center'}>{t('partners.application_accepted_title')}</CustomText>
                            <CustomText fontFamily={stylesConfig.fontFamily[500]} textAlign={'center'}>{t('partners.application_accepted_description')}</CustomText>
                            <PressableLink text={t('home.to_main_page')} onPressHandle={() => navigation.navigate('Home')} />
                        </FlexColumn>
                        :
                        <ScrollView style={{ width: '100%' }}>
                            <FlexColumn gap={20} paddingVertical={15}>
                                <CustomInput input_label={t('organizations.title')} input_type={'select'} label_error={error.organization_id} placeholder={t('organizations.choose_an_organization')} icon={'briefcase-outline'} modal_title={t('organizations.choose_an_organization')} data={organizations} select_value={organization} setSelectValue={setOrganization} />
                                {location &&
                                    <View style={{ width: '100%', overflow: 'hidden', borderRadius: 10, position: 'relative', borderWidth: 1, borderColor: colors.border }}>
                                        {(myLocation || specifyLocation) &&
                                            <View style={{
                                                flex: 1,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                right: 0,
                                                bottom: 0,
                                                padding: 10,
                                                backgroundColor: '#00000099',
                                                zIndex: 1
                                            }}>
                                                <CustomText marginBottom={10} textAlign={'center'} fontFamily={stylesConfig.fontFamily[500]} color={'#fff'}>{myLocation === true ? t('branches.attention_1') : t('branches.attention_2', { city: city.name })}</CustomText>
                                                <CustomButton onPressHandle={() => myLocation === true ? setMyLocation(false) : setSpecifyLocation(false)}>
                                                    <CustomText fontFamily={stylesConfig.fontFamily[500]} color={'#fff'}>{t('misc.accepted')}</CustomText>
                                                </CustomButton>
                                            </View>}


                                        <MapView
                                            ref={map}
                                            onPress={(e) => changeLocation(e.nativeEvent.coordinate)}
                                            initialRegion={location}
                                            style={{ width: '100%', height: 300 }}
                                            userInterfaceStyle="light"
                                        >
                                            <Marker draggable onDragEnd={(e) => changeLocation(e.nativeEvent.coordinate)} coordinate={location} pinColor={colors.primary} />
                                        </MapView>
                                    </View>
                                }

                                <CustomInput input_label={t('user.city')} input_type={'group_select'} label_error={error.city} placeholder={t('user.choose_a_city')} icon={'business-outline'} modal_title={t('user.choose_a_city')} data={cities} select_value={city} setSelectValue={setCity} onChangeHandler={getCoordinatesByCity} />
                                <CustomInput input_label={t('misc.street')} input_value={street} setInputValue={setStreet} label_error={error.street} icon={'trail-sign-outline'}></CustomInput>
                                <CustomInput input_label={t('misc.house')} input_mode={'numeric'} input_value={house} setInputValue={setHouse} label_error={error.house} icon={'business-outline'}></CustomInput>
                                <CustomInput input_label={t('auth.phone')} input_type={'phone'} input_mode={'numeric'} placeholder={'+7 (___) ___-____'} input_value={branch_phone} setInputValue={setBranchPhone} label_error={error.phone} icon={'call-outline'}></CustomInput>
                                <CustomInput input_label={t('auth.phone_additional')} input_type={'phone'} input_mode={'numeric'} placeholder={'+7 (___) ___-____'} input_value={branch_phone_additional} setInputValue={setBranchPhoneAdditional} label_error={error.phone_additional} icon={'call-outline'}></CustomInput>

                                <Card borderWidth={1}>
                                    <FlexColumn gap={20}>
                                        <View style={{ width: '100%' }}>
                                            {images.length > 0
                                                ?
                                                <CustomText>{t('misc.selected_photos_count', { number: images.length, max_number: images_limit_number })}</CustomText>
                                                :
                                                <View style={{ width: '100%', alignItems: 'center' }}>
                                                    <Ionicons color={colors.text} name='camera-outline' size={48} />
                                                    <CustomText color={error.images && colors.danger} fontFamily={stylesConfig.fontFamily[500]} textAlign={"center"}>{t('misc.select_branch_photos')}</CustomText>
                                                </View>
                                            }
                                        </View>

                                        {images.length > 0 &&
                                            <CarouselSliderHorizontal>
                                                {images?.map((item, index) => (
                                                    <Image key={index} style={{ resizeMode: 'cover', width: 150, height: 100, borderRadius: 10 }} source={{ uri: item.uri }} />
                                                ))}
                                            </CarouselSliderHorizontal>
                                        }
                                        <View style={{ width: '100%' }}>
                                            <CustomButton onPressHandle={() => pickImage()}>
                                                <CustomText color={'#fff'}>{t('misc.select')}</CustomText>
                                            </CustomButton>
                                        </View>
                                    </FlexColumn>
                                </Card>

                                <Card borderWidth={1}>
                                    <CustomText fontFamily={stylesConfig.fontFamily[700]}>{t('misc.work_regulations')}</CustomText>
                                    {week_days.map(item => (
                                        <ListItem key={item.week_day_id} last={item.week_day_id === week_days.length} activeOpacity={1}>
                                            <View style={{ width: '100%' }}>
                                                <CustomText marginBottom={15} fontFamily={stylesConfig.fontFamily[500]}>{item.week_day_name}</CustomText>
                                                <WorkRegulationItem item={item} week_days={week_days} setWeekDays={setWeekDays} />
                                            </View>
                                        </ListItem>
                                    ))}
                                </Card>

                                <CustomButton width={'100%'} onPressHandle={() => addBranch()}>
                                    <Ionicons name='checkbox-outline' size={24} color={'#fff'} />
                                    <CustomText color={'#fff'} fontFamily={stylesConfig.fontFamily[500]}>{t('misc.submit_for_review')}</CustomText>
                                </CustomButton>
                            </FlexColumn>
                        </ScrollView>
                }
            </DefaultLayout>
    );
}