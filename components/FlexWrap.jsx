import { View } from 'react-native';

export const FlexWrap = (props) => {
    return (
        <View style={{
            flex: props.flex,
            width: props.width,
            flexDirection: 'row',
            flexWrap: props.flexWrap ||  'wrap',
            alignItems: props.alignItems || 'center',
            justifyContent: props.justifyContent || 'flex-start',
            gap: props.gap || 10,
            padding: props.padding || null,
            paddingHorizontal: props.paddingHorizontal || null,
            paddingTop: props.paddingTop || null,
            marginTop: props.marginTop || null,
            marginBottom: props.marginBottom || null,
            position: props.position || 'relative',
            top: props.top || null,
            right: props.right || null,
            bottom: props.bottom || null,
            left: props.left || null,
            zIndex: props.zIndex || null
        }}>
            {props.children}
        </View>
    )
}