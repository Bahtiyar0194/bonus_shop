import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import DefaultLayout from "../layouts/DefaultLayout";
import CustomText from '../components/CustomText';
import { ScrollView, TouchableOpacity } from "react-native";
import { useTheme } from "../providers/ThemeProvider";
import { Loader } from "../components/Loader";
import axios from "axios";
import stylesConfig from "../config/styles";
import { Card } from "../components/Card";

export default function ServicesList({ navigation, route }) {
    const { t } = useTranslation();
    const { colors } = useTheme();
    const [loader, setLoader] = useState(false);
    const [services, setServices] = useState([]);

    const fetchServices = () => {
        setLoader(true);
        axios
            .get('/services/get/', {
                'category_id': route.params.category_id
            })
            .then(({ data }) => {
                setServices(data.services);
            })
            .catch((err) => {
                alert(t('errors.network_error'));
            }).finally(() => {
                setLoader(false);
            })
    }

    useEffect(() => {
        fetchServices(route.params.category_id);
    }, [route]);

    return (
        loader
            ?
            <Loader />
            :
            <DefaultLayout title={''} navigation={navigation}>
                <ScrollView style={{ width: '100%', paddingVertical: 15 }}>
                    {services.map(item => (
                        <TouchableOpacity key={item.service_id} activeOpacity={.8} onPress={() => alert(item.service_id)}>
                            <Card>
                                <CustomText marginBottom={3}>{item.service_title}</CustomText>
                                <CustomText size={stylesConfig.fontSize.text_xs}>{item.service_description}</CustomText>
                            </Card>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </DefaultLayout>
    );
}