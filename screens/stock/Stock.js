import { useTranslation } from "react-i18next";
import { useRef, useEffect, useState } from 'react';
import stylesConfig from '../../config/styles';
import CustomText from '../../components/CustomText';
import { useTheme } from "../../providers/ThemeProvider";
import { Image, ImageBackground, ScrollView, View, Dimensions, Pressable, Share } from "react-native";
import { FlexWrap } from "../../components/FlexWrap";
import API_URL from "../../config/api";
import SITE_URL from "../../config/site";
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';
import { useSelector } from "react-redux";
import { LinearGradient } from 'expo-linear-gradient';
import { Loader } from "../../components/Loader";


export default function Stock({ route, navigation }) {
    const { colors } = useTheme();
    const { t } = useTranslation();
    const [loader, setLoader] = useState(false);

    const user = useSelector((state) => state.authUser.user);

    const stocks = route.params.stocks;

    const scrollSlider = useRef(null);

    const { width } = Dimensions.get('window');
    const height = '100%';

    const changeSlider = (direction, index, stock_id) => {
        if (direction === 'prev') {
            scrollSlider.current.scrollTo({ x: (width * (index - 1)) });
            viewStock(stock_id);
        }
        else {
            if (stocks.length > (index + 1)) {
                scrollSlider.current.scrollTo({ x: (width * (index + 1)) });
                viewStock(stock_id);
            }
            else {
                navigation.navigate('Home');
            }
        }
    }

    const viewStock = async (stock_id) => {
        await axios.post('/stocks/view/' + stock_id)
            .then(response => {
                console.log('stock ' + stock_id + ' view successful');
            }).catch(err => {
                console.log('stock ' + stock_id + ' view error');
            });
    }

    const shareStock = async (stock_id) => {
        setLoader(true);
        await axios.post('/stocks/share/' + stock_id)
            .then(response => {
                try {
                    const result = Share.share({
                        message: SITE_URL + '/stock/' + response.data.stock_hash
                    });

                    if (result.action === Share.sharedAction) {
                        if (result.activityType) {

                        } else {

                        }
                    } else if (result.action === Share.dismissedAction) {

                    }
                } catch (error) {
                    Alert.alert(error.message);
                }
            }).catch(err => {
                console.log(err.response);
            }).finally(() => {
                setLoader(false);
            });
    }

    useEffect(() => {
        scrollSlider.current.scrollTo({ x: (width * (route.params.sliderIndex)), animated: false });
        viewStock(stocks[route.params.sliderIndex].stock_id)
    }, []);

    return (
        loader
        ?
        <Loader />
        :
        <View>
            <ScrollView
                ref={scrollSlider}
                pagingEnabled
                horizontal
                backgroundColor={colors.inactive}
                style={{ width: width, height: height }}
                showsHorizontalScrollIndicator={false}
                onScrollEndDrag={(event) => {
                    viewStock(stocks[Math.round(event.nativeEvent.contentOffset.x / width)].stock_id)
                }}
            >
                {stocks.map((item, index) => (
                    <View key={index} style={{ position: 'relative' }}>
                        <ImageBackground style={{ position: 'absolute', width: '100%', height: '100%' }} source={{ uri: API_URL + '/stocks/get_image/' + item.stock_id }} blurRadius={20}>
                            <View style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0 0 0 / 0.1)', }}></View>
                        </ImageBackground>

                        <Pressable style={{ position: 'absolute', top: 0, width: (index === 0) ? '100%' : '50%', height: height, zIndex: 1, opacity: 0.5 }} onPress={() => changeSlider((index === 0) ? 'next' : 'prev', index, item.stock_id)} />

                        {(index > 0) &&
                            <Pressable style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: height, zIndex: 1, opacity: 0.5 }} onPress={() => changeSlider('next', index, item.stock_id)} />
                        }

                        <Image style={{ width: width, height: height, resizeMode: 'contain' }} source={{ uri: API_URL + '/stocks/get_image/' + item.stock_id }} />

                        <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} style={{ position: 'absolute', bottom: 0, zIndex: 2, width: '100%', paddingBottom: 15, paddingTop: 30, paddingHorizontal: 15 }}>
                            <FlexWrap justifyContent={'space-between'}>
                                <FlexWrap>
                                    <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center' }}>
                                        <CustomText color={'#fff'} fontFamily={stylesConfig.fontFamily[500]} size={stylesConfig.fontSize.text_2xl}>{item.partner_name.substring(0, 1)}</CustomText>
                                    </View>
                                    <CustomText color={'#fff'} size={stylesConfig.fontSize.text_xl} fontFamily={stylesConfig.fontFamily[500]}>{item.partner_name}</CustomText>
                                </FlexWrap>
                                {user?.user_id &&
                                    <FlexWrap gap={15}>
                                        <FlexWrap gap={5}>
                                            <Ionicons name='eye-outline' color={'#fff'} size={24} />
                                            <CustomText color={'#fff'} fontFamily={stylesConfig.fontFamily[500]} size={stylesConfig.fontSize.text_xl} >{item.views}</CustomText>
                                        </FlexWrap>
                                        <Pressable onPress={() => shareStock(item.stock_id)}>
                                            <Ionicons name='share-social-outline' color={'#fff'} size={24} />
                                        </Pressable>
                                    </FlexWrap>
                                }
                            </FlexWrap>
                        </LinearGradient>

                    </View>
                ))}
            </ScrollView>
        </View>
    );
}