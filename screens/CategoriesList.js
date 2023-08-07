import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import DefaultLayout from "../layouts/DefaultLayout";
import { StyleSheet, ScrollView } from "react-native";
import { useTheme } from "../providers/ThemeProvider";
import { Loader } from "../components/Loader";
import axios from "axios";
import { ListItem } from "../components/ListItem";

export default function CategoriesList({ navigation, route }) {
    const { t } = useTranslation();
    const { colors } = useTheme();
    const [loader, setLoader] = useState(false);
    const [categories, setCategories] = useState([]);

    const fetchCategories = (category_id) => {
        setLoader(true);
        axios
            .get('/categories/get/' + category_id)
            .then(({ data }) => {
                setCategories(data.categories);
            })
            .catch((err) => {
                alert(t('errors.network_error'));
            }).finally(() => {
                setLoader(false);
            })
    }

    const styles = StyleSheet.create({
        sectionItem: {
            paddingVertical: 20,
            borderBottomWidth: 1,
            borderColor: colors.border
        }
    });

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
                        <ListItem key={item.category_id} text={item.category_name} onPressHandler={() => item.childs.length > 0 ? navigation.navigate('CategoriesList', { title: item.category_name, category_id: item.category_id }) : navigation.navigate('ServicesList', { title: item.category_name, category_id: item.category_id })} />
                    ))}
                </ScrollView>
            </DefaultLayout>
    );
}