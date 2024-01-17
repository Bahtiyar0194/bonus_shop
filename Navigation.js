import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import Home from "./screens/Home";
import Dashboard from './screens/dashboard/Dashboard';
import Login from "./screens/auth/Login";
import Activation from './screens/auth/Activation';
import SetPassword from './screens/auth/SetPassword';
import Registration from './screens/auth/Registration';
import PasswordLogin from './screens/auth/PasswordLogin';
import Settings from "./screens/Settings";
import Scanner from "./screens/Scanner";
import CategoriesList from './screens/CategoriesList';
import ServicesList from './screens/ServicesList';
import MyServicesList from './screens/dashboard/service/MyServicesList';
import AddService from './screens/dashboard/service/AddService';
import UserInfo from './screens/dashboard/UserInfo';
import BecomePartner from './screens/partners/BecomePartner';
import PartnersList from './screens/dashboard/admin/PartnersList';
import PartnerInfo from './screens/dashboard/admin/PartnerInfo';
import PartnerApplication from './screens/dashboard/admin/PartnerApllication';
import BecomeManager from './screens/managers/BecomeManager';
import ManagersList from './screens/dashboard/admin/ManagersList';
import ManagerApplication from './screens/dashboard/admin/ManagerApllication';
import OrganizationsList from './screens/dashboard/organization/OrganizationsList';
import BranchesList from './screens/dashboard/organization/BranchesList';
import AddBranch from './screens/dashboard/organization/AddBranch';
import BranchInfo from './screens/dashboard/organization/BranchInfo';
import CreateOperation from './screens/dashboard/staff/CreateOperation';
import Stock from './screens/stock/Stock';
import CreateStock from './screens/stock/CreateStock';
import SearchMap from './screens/SearchMap';
import FullImageSlider from './screens/FullImageSlider';
import Bonuses from './screens/dashboard/Bonuses';

import { useTranslation } from "react-i18next";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from './providers/ThemeProvider';

const Stack = createNativeStackNavigator();

export default function Navigation() {
    const { colors, dark } = useTheme();
    const { t } = useTranslation();

    const styles = StyleSheet.create({
        safeArea: {
            height: '100%',
            width: '100%',
            backgroundColor: colors.inactive
        }
    });

    return (
        <NavigationContainer>
            <StatusBar backgroundColor={dark ? colors.active : colors.primary} style={'light'} />
            <SafeAreaView style={styles.safeArea}>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}

                    initialRouteName="Home">

                    <Stack.Screen name="Home"
                        component={Home}
                    />

                    <Stack.Screen name="Dashboard"
                        component={Dashboard}
                    />

                    <Stack.Screen name="Login"
                        component={Login}
                    />

                    <Stack.Screen name="PasswordLogin"
                        component={PasswordLogin}
                    />

                    <Stack.Screen name="Activation"
                        component={Activation}
                    />

                    <Stack.Screen name="SetPassword"
                        component={SetPassword}
                    />

                    <Stack.Screen name="Registration"
                        component={Registration}
                    />

                    <Stack.Screen name="Settings"
                        component={Settings}
                    />

                    <Stack.Screen name="Scanner"
                        component={Scanner}
                    />

                    <Stack.Screen name="CategoriesList"
                        component={CategoriesList}
                    />

                    <Stack.Screen name="ServicesList"
                        component={ServicesList}
                    />

                    <Stack.Screen name="UserInfo"
                        component={UserInfo}
                    />

                    <Stack.Screen name="BecomePartner"
                        component={BecomePartner}
                    />

                    <Stack.Screen name="PartnersList"
                        component={PartnersList}
                    />

                    <Stack.Screen name="PartnerInfo"
                        component={PartnerInfo}
                    />

                    <Stack.Screen name="PartnerApplication"
                        component={PartnerApplication}
                    />

                    <Stack.Screen name="BecomeManager"
                        component={BecomeManager}
                    />

                    <Stack.Screen name="ManagersList"
                        options={{ title: t('managers.title') }}
                        component={ManagersList}
                    />

                    <Stack.Screen name="ManagerApplication"
                        component={ManagerApplication}
                    />

                    <Stack.Screen name="OrganizationsList"
                        component={OrganizationsList}
                    />

                    <Stack.Screen name="BranchesList"
                        component={BranchesList}
                    />

                    <Stack.Screen name="AddBranch"
                        component={AddBranch}
                    />

                    <Stack.Screen name="BranchInfo"
                        component={BranchInfo}
                    />

                    <Stack.Screen name="CreateOperation"
                        component={CreateOperation}
                    />

                    <Stack.Screen name="Stock"
                        component={Stock}
                    />


                    <Stack.Screen name="CreateStock"
                        component={CreateStock}
                    />

                    <Stack.Screen name="SearchMap"
                        component={SearchMap}
                    />

                    <Stack.Screen name="FullImageSlider"
                        component={FullImageSlider}
                    />

                    <Stack.Screen name="MyServicesList"
                        component={MyServicesList}
                    />

                    <Stack.Screen name="AddService"
                        component={AddService}
                    />

                    <Stack.Screen name="Bonuses"
                        component={Bonuses}
                    />
                </Stack.Navigator>
            </SafeAreaView>
        </NavigationContainer>
    );
}