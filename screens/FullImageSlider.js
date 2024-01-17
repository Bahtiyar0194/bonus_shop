import { useRef, useEffect } from 'react';
import { Image, ScrollView, View, Dimensions } from "react-native";
import API_URL from '../config/api';
import DefaultLayout from "../layouts/DefaultLayout";
import { useTranslation } from 'react-i18next';
import { useTheme } from '../providers/ThemeProvider';

export default function FullImageSlider({ route, navigation }) {
    const images = route.params.images;
    const { t } = useTranslation();

    const scrollSlider = useRef(null);
    const { colors } = useTheme();

    const { width } = Dimensions.get('window');
    const height = '100%';

    useEffect(() => {
        scrollSlider.current.scrollTo({ x: (width * (route.params.sliderIndex)), animated: true })
    }, []);

    return (
        <View style={{ width: '100%', height: '100%', backgroundColor: colors.active, overflow: 'hidden' }}>
            <ScrollView
                ref={scrollSlider}
                pagingEnabled
                horizontal
                style={{ width: width, height: height }}
                showsHorizontalScrollIndicator={false}>
                {images.map((item, index) => (
                    <Image key={index} style={{ width: width, height: height, resizeMode: 'contain' }} source={{ uri: API_URL + route.params.url + item.file_name }} />
                ))}
            </ScrollView>
        </View>
    );
}