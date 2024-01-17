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

export default function AddService({ navigation }) {
    const { t } = useTranslation();
    const { colors } = useTheme();

    const [finish, setFinish] = useState(false);

    const [organizations, setOrganizations] = useState([]);
    const [organization, setOrganization] = useState('');

    const [branches, setBranches] = useState([]);
    const [coverage, setCoverage] = useState([]);

    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');

    const [service_title, setServiceTitle] = useState('');
    const [service_description, setServiceDescription] = useState('');

    const [loader, setLoader] = useState(false);
    const [error, setError] = useState([]);


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

    const fetchBranches = (organization_id) => {
        setLoader(true);
        axios
            .get('/branches/organization/' + organization_id)
            .then(({ data }) => {
                setBranches(data);
            })
            .catch((err) => {
                alert(t('errors.network_error'));
            }).finally(() => {
                setLoader(false);
            })
    }

    const fetchCategories = (category_id) => {
        setLoader(true);
        let url = category_id ? ('/categories/get/' + category_id) : '/categories/get';
        axios
            .get(url)
            .then(({ data }) => {
                setCategories(data.services);
            })
            .catch((err) => {
                alert(t('errors.network_error'));
            }).finally(() => {
                setLoader(false);
            })
    }

    const addService = async () => {
        setLoader(true);
        const form_data = new FormData();
        form_data.append('organization_id', organization.id);
        form_data.append('service_title', service_title);
        form_data.append('service_description', service_description);
        form_data.append('category_id', category.id);
        form_data.append('coverage', JSON.stringify(coverage));

        await axios.post('/services/add', form_data)
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
        fetchOrganizations();
        fetchCategories();
    }, []);

    return (
        loader
            ?
            <Loader />
            :
            <DefaultLayout title={t('categories.add_a_service')} navigation={navigation}>
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
                                <CustomInput input_label={t('organizations.title')} input_type={'select'} label_error={error.organization_id} placeholder={t('organizations.choose_an_organization')} icon={'briefcase-outline'} modal_title={t('organizations.choose_an_organization')} data={organizations} select_value={organization} setSelectValue={setOrganization} onChangeHandler={fetchBranches} />
                                <CustomInput input_label={t('categories.category')} input_type={'select'} label_error={error.category_id} placeholder={t('categories.choose_a_category')} icon={'briefcase-outline'} modal_title={t('categories.choose_a_category')} data={categories} select_value={category} setSelectValue={setCategory} />
                                {organization && <CustomInput input_label={t('stock.coverage')} input_type={'multiple_select'} label_error={error.coverage} placeholder={t('branches.choose_a_branch')} icon={'map-outline'} modal_title={t('categories.service_is_available_in')} data={branches} selected_values={coverage} setSelectedValues={setCoverage} />}
                                <CustomInput input_label={t('categories.service_title')} input_value={service_title} setInputValue={setServiceTitle} label_error={error.service_title} icon={'pricetags-outline'}></CustomInput>
                                <CustomInput input_label={t('categories.service_description')} multiline={true} input_value={service_description} setInputValue={setServiceDescription} label_error={error.service_description} icon={'list-outline'}></CustomInput>
                                <CustomButton width={'100%'} onPressHandle={() => addService()}>
                                    <Ionicons name='checkbox-outline' size={24} color={'#fff'} />
                                    <CustomText color={'#fff'} fontFamily={stylesConfig.fontFamily[500]}>{t('misc.submit_for_review')}</CustomText>
                                </CustomButton>
                            </FlexColumn>
                        </ScrollView>
                }
            </DefaultLayout>
    );
}