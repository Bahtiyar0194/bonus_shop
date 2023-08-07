import { Provider } from 'react-redux';
import { store } from './store/store';
import { I18nextProvider } from "react-i18next";
import { ThemeProvider } from './providers/ThemeProvider';
import i18n from "./i18n";
import Navigation from "./Navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import axios from "axios";
import { useFonts } from 'expo-font';
import API_URL from './config/api';

export default function App() {
    let [fontsLoaded] = useFonts({
        "Montserrat-Light": require('./assets/fonts/montserrat/Montserrat-Light.ttf'),
        "Montserrat-Regular": require('./assets/fonts/montserrat/Montserrat-Regular.ttf'),
        "Montserrat-Medium": require('./assets/fonts/montserrat/Montserrat-Medium.ttf'),
        "Montserrat-Bold": require('./assets/fonts/montserrat/Montserrat-Bold.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    axios.defaults.baseURL = API_URL;
    axios.defaults.headers.common['Accept'] = 'application/json';
    axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';

    return (
        <I18nextProvider i18n={i18n}>
            <Provider store={store}>
                <ThemeProvider>
                    <SafeAreaProvider>
                        <Navigation />
                    </SafeAreaProvider>
                </ThemeProvider>
            </Provider>
        </I18nextProvider>
    )
}