import { useState } from 'react';
import MapView from 'react-native-maps';
import { Marker } from "react-native-maps";
import { useTheme } from '../../../providers/ThemeProvider';
import { View, Image } from 'react-native';
import { Card } from '../../../components/Card';
import CustomText from '../../../components/CustomText';
import stylesConfig from '../../../config/styles';
import { CarouselSliderHorizontal } from '../../../components/CarouselSliderHorizontal';
import API_URL from '../../../config/api';
import { FlexColumn } from '../../../components/FlexColumn';
import { FlexWrap } from '../../../components/FlexWrap';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function BranchInfo({ navigation, route }) {
    const branch = route.params.branch;
    const mapCustomStyle = [{ "elementType": "geometry", "stylers": [{ "color": "#242f3e" }] }, { "elementType": "labels.text.fill", "stylers": [{ "color": "#746855" }] }, { "elementType": "labels.text.stroke", "stylers": [{ "color": "#242f3e" }] }, { "featureType": "administrative.locality", "elementType": "labels.text.fill", "stylers": [{ "color": "#d59563" }] }, { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [{ "color": "#d59563" }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#263c3f" }] }, { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [{ "color": "#6b9a76" }] }, { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#38414e" }] }, { "featureType": "road", "elementType": "geometry.stroke", "stylers": [{ "color": "#212a37" }] }, { "featureType": "road", "elementType": "labels.text.fill", "stylers": [{ "color": "#9ca5b3" }] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#746855" }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#1f2835" }] }, { "featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [{ "color": "#f3d19c" }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#2f3948" }] }, { "featureType": "transit.station", "elementType": "labels.text.fill", "stylers": [{ "color": "#d59563" }] }, { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#17263c" }] }, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "color": "#515c6d" }] }, { "featureType": "water", "elementType": "labels.text.stroke", "stylers": [{ "color": "#17263c" }] }]

    const [location, setLocation] = useState({
        latitude: parseFloat(branch.latitude),
        longitude: parseFloat(branch.longitude),
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });

    const { colors, dark } = useTheme();

    return (
        <View style={{ width: '100%', height: '100%', position: "relative" }}>
            <View style={{ padding: 10, position: 'absolute', bottom: 0, zIndex: 1, width: '100%' }}>
                <FlexColumn>
                    {branch.images.length > 0 &&
                        <CarouselSliderHorizontal>
                            {branch.images.map((item, index) => (
                                <Image key={index} style={{ resizeMode: 'cover', width: 80, height: 80, borderRadius: 10 }} source={{ uri: API_URL + '/branches/get_image/' + item.file_name }} />
                            ))}
                        </CarouselSliderHorizontal>
                    }
                        <Card borderWidth={1}>
                            <FlexColumn>
                                <View style={{ width: '100%' }}>
                                    <CustomText size={stylesConfig.fontSize.text_lg} fontFamily={stylesConfig.fontFamily[500]}>{branch.partner_name}</CustomText>
                                </View>
                                <FlexWrap width={'100%'} gap={4}>
                                    <Ionicons color={colors.text} name='business-outline' size={14} />
                                    <CustomText size={stylesConfig.fontSize.text_sm} fontFamily={stylesConfig.fontFamily[500]}>{branch.street} {branch.house}</CustomText>
                                </FlexWrap>
                                <FlexWrap width={'100%'} gap={4}>
                                    <Ionicons color={colors.text} name='call-outline' size={14} />
                                    <CustomText size={stylesConfig.fontSize.text_sm} fontFamily={stylesConfig.fontFamily[500]}>{branch.branch_phone}</CustomText>
                                </FlexWrap>
                                <FlexWrap width={'100%'} gap={4}>
                                    <Ionicons color={colors.text} name='call-outline' size={14} />
                                    <CustomText size={stylesConfig.fontSize.text_sm} fontFamily={stylesConfig.fontFamily[500]}>{branch.branch_phone_additional}</CustomText>
                                </FlexWrap>
                            </FlexColumn>
                        </Card>
                </FlexColumn>
            </View>
            <MapView
                initialRegion={location}
                style={{ width: '100%', height: '100%' }}
                customMapStyle={dark === true ? mapCustomStyle : null}
            >
                <Marker coordinate={location} pinColor={colors.primary} />
            </MapView>
        </View>
    );
}