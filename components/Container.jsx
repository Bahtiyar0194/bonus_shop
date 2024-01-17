import { View, StyleSheet } from 'react-native';
import { useTheme } from '../providers/ThemeProvider';

export default function Container(props) {

    const { colors } = useTheme();
    
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            width: '100%',
            height: '100%',
            position: 'relative',
            justifyContent: props.justifyContent || 'flex-start',
            alignItems: props.alignItems || 'baseline',
            alignContent: props.alignContent || 'flex-start',
            backgroundColor: colors.inactive,
            gap: 10,
            padding: props.padding,
            paddingTop: props.paddingTop,
            paddingVertical: props.paddingVertical
        }
    });

    return (
        <View style={styles.container}>
            {props.children}
        </View>
    )
}