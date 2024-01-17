import { Share, Alert, Pressable } from "react-native";

export const ShareButton = (props) => {

    const onShare = async () => {
        try {
            const result = await Share.share({
                message: props.message
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    
                } else {

                }
            } else if (result.action === Share.dismissedAction) {

            }
        } catch (error) {
            Alert.alert(error.message);
        }
    };

    return (
        <Pressable onPress={() => onShare()}>
            {props.children}
        </Pressable>
    )
}