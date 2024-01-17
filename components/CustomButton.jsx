import { Badge } from './Badge';
import { useTheme } from '../providers/ThemeProvider';
import { TouchableOpacity } from 'react-native';

export const CustomButton = (props) => {
    const { colors } = useTheme();
    return (
        <TouchableOpacity
            activeOpacity={.4}
            style={{
                flex: props.flex,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 5,
                backgroundColor: props.color || colors.primary,
                borderWidth: props.borderWidth || null,
                borderColor: props.borderColor || null,
                borderRadius: props.borderRadius || 10,
                paddingVertical: 8,
                paddingHorizontal: 10,
                marginTop: props.marginTop,
                height: props.height,
                width: props.width,
                position: props.position || 'relative',
                top: props.top || null,
                left: props.left || null
            }}
            onPress={props.onPressHandle}>
            {props.children}

            {props.badge > 0 &&
                <Badge badge={props.badge} />
            }
        </TouchableOpacity>
    )
}