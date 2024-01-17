import { useTranslation } from "react-i18next";
import { useTheme } from "../../providers/ThemeProvider";
import DefaultLayout from "../../layouts/DefaultLayout";
import { Image } from "react-native";
import { useState, useEffect } from "react";
import { Loader } from "../../components/Loader";
import axios from "axios";
import { CustomInput } from "../../components/CustomInput";
import { FlexColumn } from "../../components/FlexColumn";
import { CustomButton } from "../../components/CustomButton";
import CustomText from "../../components/CustomText";
import Ionicons from '@expo/vector-icons/Ionicons';
import stylesConfig from "../../config/styles";

export default function CreateStock({ route, navigation }) {
    const { colors } = useTheme();
    const { t } = useTranslation();

    const [organizations, setOrganizations] = useState([]);
    const [organization, setOrganization] = useState('');

    const [cities, setCities] = useState([]);

    const [coverage, setCoverage] = useState([]);

    const [loader, setLoader] = useState(false);
    const [error, setError] = useState([]);

    const publishStock = async () => {
        setLoader(true);
        const form_data = new FormData();
        form_data.append('organization_id', organization.id);
        form_data.append('stock_type_id', 1);
        form_data.append('coverage', JSON.stringify(coverage));
        form_data.append('file', route.params.image);

        await axios.post('/stocks/create', form_data)
            .then(response => {
                navigation.navigate('Home');
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

    useEffect(() => {
        getCities();
        fetchOrganizations();
    }, []);

    return (
        loader
            ?
            <Loader />
            :
            <DefaultLayout title={t('stock.create')} navigation={navigation}>
                <FlexColumn gap={20}>
                    <Image style={{ width: '100%', height: 400, resizeMode: 'cover', borderRadius: 10 }} source={{ uri: `data:image/png;base64,${route.params.image}` }} />
                    <CustomInput input_label={t('organizations.organization')} input_type={'select'} label_error={error.organization_id} placeholder={t('organizations.choose_an_organization')} icon={'briefcase-outline'} modal_title={t('organizations.choose_an_organization')} data={organizations} select_value={organization} setSelectValue={setOrganization} />
                    <CustomInput input_label={t('stock.coverage')} input_type={'multiple_group_select'} label_error={error.coverage} placeholder={t('user.choose_a_city')} icon={'map-outline'} modal_title={t('stock.select_coverage')} data={cities} selected_values={coverage} setSelectedValues={setCoverage} />
                    <CustomButton width={'100%'} onPressHandle={() => publishStock()}>
                        <Ionicons name='checkbox-outline' size={24} color={'#fff'} />
                        <CustomText color={'#fff'} fontFamily={stylesConfig.fontFamily[500]}>{t('misc.to_publish')}</CustomText>
                    </CustomButton>
                </FlexColumn>
            </DefaultLayout>
    );
}