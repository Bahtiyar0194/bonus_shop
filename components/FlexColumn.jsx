import { View } from 'react-native';

export const FlexColumn = (props) => {
    return (
        <View style={{
            flex: props.flex || 0,
            flexDirection: props.flexDirection || 'row',
            flexWrap: 'wrap',
            width: props.width || '100%',
            alignItems: props.alignItems || 'center',
            alignContent: props.alignContent || 'flex-start',
            justifyContent: props.justifyContent || 'flex-start',
            gap: props.gap || 10,
            padding: props.padding || null,
            paddingVertical: props.paddingVertical || null,
            marginTop: props.marginTop,
            marginBottom: props.marginBottom,
            position: props.position || 'relative',
            top: props.top || null,
            right: props.right || null,
            bottom: props.bottom || null,
            left: props.left || null
        }}>
            {props.children}
        </View>
    )
}