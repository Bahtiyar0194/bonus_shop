import { View } from 'react-native';

export const FlexWrap = (props) => {
    return (
        <View style={{
            width: props.width,
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: props.alignItems || 'center',
            justifyContent: props.justifyContent || 'flex-start',
            gap: props.gap || 10,
            padding: props.padding || null,
            paddingTop: props.paddingTop || null,
            marginTop: props.marginTop || null,
            marginBottom: props.marginBottom || null,
            position: props.position || 'relative',
            top: props.top || null,
            right: props.right || null,
            bottom: props.bottom || null,
            left: props.left || null,
        }}>
            {props.children}
        </View>
    )
}