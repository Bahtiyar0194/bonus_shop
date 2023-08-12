import { TouchableOpacity, StyleSheet } from "react-native";
import { FlexWrap } from "./FlexWrap";
import CustomText from "./CustomText";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from "../providers/ThemeProvider";
import { Badge } from "./Badge";

export const ListItem = (props) => {
    const { colors } = useTheme();

    const styles = StyleSheet.create({
        listItem: {
            paddingTop: props.paddingTop || 15,
            paddingBottom: props.paddingBottom || 15,
            borderBottomWidth: 1,
            borderColor: colors.border
        }
    });

    return (
        <TouchableOpacity activeOpacity={.4} style={styles.listItem} onPress={props.onPressHandler}>
            <FlexWrap justifyContent={'space-between'}>
                {props.children}
                <FlexWrap>
                    {props.badge > 0 &&
                        <Badge badge={props.badge} />
                    }
                    {props.chevron === true &&
                        <Ionicons name='chevron-forward-outline' size={18} color={colors.secondary} />
                    }
                </FlexWrap>
            </FlexWrap>
        </TouchableOpacity>
    )
}