import { Pressable, Alert } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { useTranslation } from "react-i18next";

export const ClipboardButton = (props) => {

    const { t } = useTranslation();

    const copyToClipboard = async () => {
        Alert.alert(t('misc.copied_to_clipboard'), props.message, [
            { text: t('misc.accepted'), onPress: () => console.log('OK Pressed') },
        ]);
        await Clipboard.setStringAsync(props.message);
    };

    return (
        <Pressable onPress={() => copyToClipboard()}>
            {props.children}
        </Pressable>
    )
}