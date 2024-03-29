import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import DefaultLayout from "../../layouts/DefaultLayout";
import CustomText from "../../components/CustomText";
import { Loader } from "../../components/Loader";
import { ScrollView, View } from "react-native";
import { FlexWrap } from "../../components/FlexWrap";
import { CustomButton } from "../../components/CustomButton";
import { Card } from "../../components/Card";
import { useTheme } from "../../providers/ThemeProvider";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from '../../store/slices/userSlice';
import stylesConfig from "../../config/styles";
import { FlexColumn } from "../../components/FlexColumn";
import { ListItem } from "../../components/ListItem";
import { useIsFocused } from "@react-navigation/native";
import { RoleProvider } from "../../providers/RoleProvider";
import { Pressable } from "react-native";

export default function Dashboard({ navigation }) {
    const [loader, setLoader] = useState(false);
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.authUser.user);
    const isFocused = useIsFocused();

    const { colors } = useTheme();

    const [partner_applications, setPartnerApplications] = useState(false);
    const [manager_applications, setManagerApplications] = useState(false);

    const getMe = async () => {
        setLoader(true);
        await axios.get('auth/me')
            .then(response => {
                dispatch(authenticate(response.data.user));
                setLoader(false);
            });
    };

    const changeUserMode = async (role_type_id) => {
        await axios.post('auth/change_mode/' + role_type_id)
            .then(response => {
                getMe();
            }).catch(err => {
                alert('Mode change error');
            });
    }

    const fetchPartnerApplications = () => {
        setLoader(true);
        axios
            .get('/partners/get')
            .then(({ data }) => {
                setPartnerApplications(data.applications);
            })
            .catch((err) => {
                alert(t('errors.network_error'));
            }).finally(() => {
                setLoader(false);
            });
    }

    const fetchManagerApplications = () => {
        setLoader(true);
        axios
            .get('/managers/get')
            .then(({ data }) => {
                setManagerApplications(data.applications);
            })
            .catch((err) => {
                alert(t('errors.network_error'));
            }).finally(() => {
                setLoader(false);
            });
    }

    const signOut = async () => {
        setLoader(true);
        try {
            removeToken();
        } catch (error) {
            alert('Sign out error');
        }
        dispatch(authenticate([]));
        await axios.post('auth/logout')
            .then(response => {
                navigation.navigate('Home');
            }).catch(err => {
                navigation.navigate('Home');
            });
    }

    async function removeToken() {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('user_id');
    }

    useEffect(() => {
        if (isFocused) {
            setLoader(true);
            fetchPartnerApplications();
            fetchManagerApplications();
        }
    }, [isFocused]);

    return (
        loader
            ?
            <Loader />
            :
            <DefaultLayout title={t('dashboard.title')} navigation={navigation}>
                <ScrollView>
                    <FlexColumn marginTop={10} gap={20}>
                        <Card backgroundColor={colors.primary} borderWidth={null}>
                            <Pressable onPress={() => navigation.navigate('Bonuses', { user: user })}>
                                <CustomText color={'#fff'} size={stylesConfig.fontSize.text_xl} fontFamily={stylesConfig.fontFamily[700]}>{user.last_name + ' ' + user.first_name}</CustomText>
                                <FlexWrap gap={1}>
                                    <CustomText color={'#fff'}>{t('bonuses.title') + ': '}</CustomText>
                                    <CustomText color={'#fff'} fontFamily={stylesConfig.fontFamily[700]}>{user.bonuses.all_active_bonuses.toFixed(2)}</CustomText>
                                </FlexWrap>
                            </Pressable>
                        </Card>

                        {user.roles.length > 1 &&
                            <View style={{ width: '100%' }}>
                                <CustomText marginBottom={10} fontFamily={stylesConfig.fontFamily[700]}>{t('user.current_mode') + ':'}</CustomText>
                                <FlexWrap>
                                    {user?.roles.map(role => (
                                        <CustomButton
                                            color={colors.active}
                                            key={role.role_type_id}
                                            borderWidth={1}
                                            borderColor={user.current_role_id === role.role_type_id ? colors.primary : colors.border}
                                            onPressHandle={() => user.current_role_id !== role.role_type_id ? changeUserMode(role.role_type_id) : null}>
                                            <Ionicons name='person-outline' size={18} color={colors.text} />
                                            <CustomText>
                                                {role.user_role_type_name}
                                            </CustomText>
                                        </CustomButton>
                                    ))}
                                </FlexWrap>
                            </View>
                        }

                        <RoleProvider roles={[3]}>
                            <View style={{ width: '100%' }}>
                                <CustomText fontFamily={stylesConfig.fontFamily[700]}>{t('partners_and_managers')}</CustomText>

                                <ListItem chevron={true} badge={partner_applications.length} onPressHandler={() => navigation.navigate('PartnersList')}>
                                    <CustomText>{t('partners.title')}</CustomText>
                                </ListItem>
                                <ListItem chevron={true} badge={manager_applications.length} onPressHandler={() => navigation.navigate('ManagersList')}>
                                    <CustomText>{t('managers.title')}</CustomText>
                                </ListItem>
                            </View>
                        </RoleProvider>

                        <RoleProvider roles={[4]}>
                            <View style={{ width: '100%' }}>
                                <CustomText fontFamily={stylesConfig.fontFamily[700]}>{t('organizations_branches_staff')}</CustomText>
                                <ListItem chevron={true} onPressHandler={() => navigation.navigate('OrganizationsList')}>
                                    <CustomText>{t('organizations.title')}</CustomText>
                                </ListItem>
                                <ListItem chevron={true} onPressHandler={() => navigation.navigate('BranchesList')}>
                                    <CustomText>{t('branches.title')}</CustomText>
                                </ListItem>
                                <ListItem chevron={true} onPressHandler={() => navigation.navigate('StaffList')}>
                                    <CustomText>{t('staff.title')}</CustomText>
                                </ListItem>
                            </View>

                            <View style={{ width: '100%' }}>
                                <CustomText fontFamily={stylesConfig.fontFamily[700]}>{t('categories.services_and_products')}</CustomText>
                                <ListItem chevron={true} onPressHandler={() => navigation.navigate('MyServicesList')}>
                                    <CustomText>{t('categories.services')}</CustomText>
                                </ListItem>
                            </View>
                        </RoleProvider>

                        <RoleProvider roles={[4, 5]}>
                            <View style={{ width: '100%' }}>
                                <CustomText fontFamily={stylesConfig.fontFamily[700]}>{t('operations_title')}</CustomText>
                                <ListItem chevron={true} onPressHandler={() => navigation.navigate('CreateOperation')}>
                                    <CustomText>{t('operations.new_operation')}</CustomText>
                                </ListItem>
                                <ListItem chevron={true} onPressHandler={() => navigation.navigate('OperationsList')}>
                                    <CustomText>{t('operations.title')}</CustomText>
                                </ListItem>
                            </View>
                        </RoleProvider>

                        <View style={{ width: '100%' }}>
                            <CustomText fontFamily={stylesConfig.fontFamily[700]} marginBottom={10}>{t('auth.account_settings') + ':'}</CustomText>
                            <FlexWrap>
                                <CustomButton
                                    color={colors.active}
                                    borderWidth={1}
                                    borderColor={colors.border}
                                    onPressHandle={() => signOut()}>
                                    <Ionicons name='log-out-outline' size={18} color={colors.text} />
                                    <CustomText>
                                        {t('auth.sign_out')}
                                    </CustomText>
                                </CustomButton>
                            </FlexWrap>
                        </View>

                    </FlexColumn>
                </ScrollView>
            </DefaultLayout>
    );
}