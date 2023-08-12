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
            backgroundColor: colors.inactive,
            padding: 15
        }
    });

    return (
        <NavigationContainer>
            <StatusBar backgroundColor={colors.inactive} style={dark ? 'light' : 'auto'} />
            <SafeAreaView style={styles.safeArea}>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}

                    initialRouteName="Home">

                    <Stack.Screen name="Home"
                        options={{ title: t('home.home_title') }}
                        component={Home}
                    />

                    <Stack.Screen name="Dashboard"
                        options={{ title: t('dashboard.title') }}
                        component={Dashboard}
                    />

                    <Stack.Screen name="Login"
                        options={{ title: t('auth.sign_in') }}
                        component={Login}
                    />

                    <Stack.Screen name="PasswordLogin"
                        options={{ title: t('auth.password_login_title') }}
                        component={PasswordLogin}
                    />

                    <Stack.Screen name="Activation"
                        options={{ title: t('auth.activation') }}
                        component={Activation}
                    />

                    <Stack.Screen name="SetPassword"
                        options={{ title: t('auth.creating_a_password') }}
                        component={SetPassword}
                    />

                    <Stack.Screen name="Registration"
                        options={{ title: t('auth.sign_up_title') }}
                        component={Registration}
                    />

                    <Stack.Screen name="Settings"
                        options={{ title: t('settings.settings_title') }}
                        component={Settings}
                    />

                    <Stack.Screen name="Scanner"
                        options={{ title: t('scanner.title') }}
                        component={Scanner}
                    />

                    <Stack.Screen name="CategoriesList"
                        options={{ title: t('categories.title') }}
                        component={CategoriesList}
                    />

                    <Stack.Screen name="ServicesList"
                        options={{ title: t('services.title') }}
                        component={ServicesList}
                    />

                    <Stack.Screen name="UserInfo"
                        options={{ title: t('user.info') }}
                        component={UserInfo}
                    />

                    <Stack.Screen name="BecomePartner"
                        options={{ title: t('partners.sign_up_title') }}
                        component={BecomePartner}
                    />

                    <Stack.Screen name="PartnersList"
                        options={{ title: t('partners.title') }}
                        component={PartnersList}
                    />

                    <Stack.Screen name="PartnerInfo"
                        options={{ title: t('partners.partner_info') }}
                        component={PartnerInfo}
                    />

                    <Stack.Screen name="PartnerApplication"
                        options={{ title: t('partners.application') }}
                        component={PartnerApplication}
                    />

                    <Stack.Screen name="BecomeManager"
                        options={{ title: t('managers.application') }}
                        component={BecomeManager}
                    />

                    <Stack.Screen name="ManagersList"
                        options={{ title: t('managers.title') }}
                        component={ManagersList}
                    />

                    <Stack.Screen name="ManagerApplication"
                        options={{ title: t('managers.application') }}
                        component={ManagerApplication}
                    />

                    <Stack.Screen name="OrganizationsList"
                        options={{ title: t('organizations.my_organizations') }}
                        component={OrganizationsList}
                    />

                    <Stack.Screen name="BranchesList"
                        options={{ title: t('branches.organization_branches') }}
                        component={BranchesList}
                    />

                    <Stack.Screen name="AddBranch"
                        options={{ title: t('branches.add_branch') }}
                        component={AddBranch}
                    />
                </Stack.Navigator>
            </SafeAreaView>
        </NavigationContainer>
    );
}