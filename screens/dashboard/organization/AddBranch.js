import { useTranslation } from "react-i18next";
import { useState, useEffect, useRef } from 'react';
import { Loader } from "../../../components/Loader";
import DefaultLayout from "../../../layouts/DefaultLayout";
import { CustomInput } from '../../../components/CustomInput';
import { CustomButton } from '../../../components/CustomButton';
import { SelectModal } from "../../../components/SelectModal";
import axios from 'axios';
import stylesConfig from '../../../config/styles';
import CustomText from '../../../components/CustomText';
import { FlexColumn } from "../../../components/FlexColumn";
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Pressable, ScrollView, View } from "react-native";
import { useTheme } from "../../../providers/ThemeProvider";
import MapView from 'react-native-maps';
import { Marker } from "react-native-maps";
import * as Location from 'expo-location';


export default function AddBranch({ navigation }) {
    const { t } = useTranslation();
    const { colors } = useTheme();

    const [cities, setCities] = useState([]);

    const [address, setAddress] = useState('');
    const [branch_phone, setBranchPhone] = useState('');
    const [branch_phone_additional, setBranchPhoneAdditional] = useState('');

    const [city, setCity] = useState('');
    const [city_name, setCityName] = useState(t('user.choose_a_city'));

    const [loader, setLoader] = useState(false);
    const [error, setError] = useState([]);

    const map = useRef(null);

    const [location, setLocation] = useState(null);
    const [myLocation, setMyLocation] = useState(false);

    const changeLocation = async (coordinates) => {
        setLocation(coordinates);
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
        getCityByCoordinates(coordinates.latitude, coordinates.longitude);
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

    const getCityByCoordinates = async (latitude, longitude) => {
        await axios.post('/cities/find_by_coordinates', {
            latitude: parseInt(latitude),
            longitude: parseInt(longitude)
        })
            .then(response => {
                if (response.data.city) {
                    setCity(response.data.city.city_id);
                    setCityName(response.data.city.city_name);
                }
                else {
                    setCity('');
                    setCityName(t('user.choose_a_city'));
                }
            }).catch(err => {
                alert(t('errors.network_error'));
            });
    }

    const getCoordinatesByCity = async (city_id) => {
        await axios.post('/cities/find_coordinates_by_city/' + city_id)
            .then(response => {
                if (response.data.city) {
                    setLocation({
                        latitude: parseFloat(response.data.city.latitude),
                        longitude: parseFloat(response.data.city.longitude),
                        latitudeDelta: 0.02,
                        longitudeDelta: 0.02,
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
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
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

    const registrationSubmit = async () => {
        setLoader(true);
        const form_data = new FormData();
        form_data.append('address', address);
        form_data.append('phone', phone);
        form_data.append('city', city);

        let token = await AsyncStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

        await axios.post('/partners/submit_application', form_data)
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
        getMyLocation();
    }, []);

    return (
        loader
            ?
            <Loader />
            :
            <DefaultLayout title={t('branches.add_a_branch')} navigation={navigation}>
                {
                    <ScrollView style={{ width: '100%' }}>
                        <FlexColumn gap={20} paddingVertical={15}>
                            <SelectModal data={cities} modal_label={t('user.city')} header_title={t('user.choose_a_city')} label_error={error.city} select_value={city} setSelectValue={setCity} placeholder={city_name} setPlaceholder={setCityName} setCoordinates={getCoordinatesByCity} icon={'business-outline'} />
                            <CustomInput input_label={t('misc.address')} input_value={address} setInputValue={setAddress} label_error={error.address} icon={'location-outline'}></CustomInput>
                            <View style={{ width: '100%', overflow: 'hidden', borderRadius: 10, position: 'relative', borderWidth: 1, borderColor: colors.border }}>
                                {myLocation === true &&
                                
                                    <Pressable onPress={() => setMyLocation(false)} style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        backgroundColor: '#00000099',
                                        zIndex: 1
                                    }}>
                                        <CustomText color={'#fff'}></CustomText>
                                    </Pressable>}

                                {location &&
                                    <MapView
                                        ref={map}
                                        onPress={(e) => changeLocation(e.nativeEvent.coordinate)}
                                        initialRegion={location}
                                        style={{ width: '100%', height: 300 }}
                                    >
                                        <Marker draggable={true} coordinate={location} pinColor={colors.primary} />
                                    </MapView>
                                }
                            </View>


                            <CustomText>{location?.latitude}</CustomText>
                            <CustomText>{location?.longitude}</CustomText>

                            <CustomInput input_label={t('auth.phone')} input_type={'phone'} input_mode={'numeric'} placeholder={'+7 (___) ___-____'} input_value={branch_phone} setInputValue={setBranchPhone} label_error={error.branch_phone} icon={'call-outline'}></CustomInput>
                            <CustomInput input_label={t('auth.phone_additional')} input_type={'phone'} input_mode={'numeric'} placeholder={'+7 (___) ___-____'} input_value={branch_phone_additional} setInputValue={setBranchPhoneAdditional} label_error={error.branch_phone_additional} icon={'call-outline'}></CustomInput>


                            <CustomButton width={'100%'} onPressHandle={() => registrationSubmit()}>
                                <Ionicons name='checkbox-outline' size={24} color={'#fff'} />
                                <CustomText color={'#fff'} fontFamily={stylesConfig.fontFamily[500]}>{t('partners.submit_application')}</CustomText>
                            </CustomButton>
                        </FlexColumn>
                    </ScrollView>
                }
            </DefaultLayout>
    );
}