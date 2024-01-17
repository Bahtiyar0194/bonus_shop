import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import DefaultLayout from "../layouts/DefaultLayout";
import { ScrollView } from "react-native";
import { Loader } from "../components/Loader";
import axios from "axios";
import { ListItem } from "../components/ListItem";
import CustomText from "../components/CustomText";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from "../providers/ThemeProvider";
import { FlexWrap } from "../components/FlexWrap";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function CategoriesList({ navigation, route }) {
    const { t } = useTranslation();
    const [loader, setLoader] = useState(false);
    const [categories, setCategories] = useState([]);
    const { colors } = useTheme();

    const fetchCategories = async (category_id) => {
        setLoader(true);
        let city_id = await AsyncStorage.getItem('current_location_id');

        axios
            .get('/categories/get/' + category_id, { params: { city_id: city_id } })
            .then(({ data }) => {
                setCategories(data.categories);
            })
            .catch((err) => {
                alert(t('errors.network_error'));
            }).finally(() => {
                setLoader(false);
            });
    }

    useEffect(() => {
        fetchCategories(route.params.category_id);
    }, [route]);

    return (
        loader
            ?
            <Loader />
            :
            <DefaultLayout title={route.params.title} navigation={navigation}>
                <ScrollView style={{ width: '100%' }}>
                    {categories.map(item => (
                        <ListItem key={item.id} badge={item.services} onPressHandler={() => item.childs.length > 0 ? navigation.navigate('CategoriesList', { title: item.name, category_id: item.id }) : navigation.navigate('SearchMap', { search_query: item.name })}>
                            <FlexWrap>
                                <Ionicons name={item.image + '-outline'} size={24} color={colors.primary} />
                                <CustomText>{item.name}</CustomText>
                            </FlexWrap>
                        </ListItem>
                    ))}
                </ScrollView>
            </DefaultLayout>
    );
}