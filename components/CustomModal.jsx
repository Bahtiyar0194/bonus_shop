import { View, Modal, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '../providers/ThemeProvider';
import stylesConfig from '../config/styles';
import Ionicons from '@expo/vector-icons/Ionicons';
import CustomText from './CustomText';
import { FlexWrap } from './FlexWrap';

export const CustomModal = ({ show, hide, modal_title, hideCloseButton, children }) => {
    const { colors } = useTheme();

    const styles = StyleSheet.create({
        modalWrapper: {
            position: 'relative',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0 0 0 / 0.7)',
            padding: 15,
            justifyContent: 'center',
            alignItems: 'center'
        },

        modal: {
            position: 'relative',
            width: '100%',
            maxHeight: '90%',
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 10,
            backgroundColor: colors.active,
            padding: 15
        },

        modalHeader: {
            marginBottom: 15
        }
    });

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={show}
        >
            <View style={styles.modalWrapper}>
                <View style={styles.modal}>
                    <View style={styles.modalHeader}>
                        <FlexWrap flexWrap={'nowrap'} alignItems={'flex-start'} justifyContent={'space-between'}>
                            <CustomText size={stylesConfig.fontSize.text_lg} fontFamily={stylesConfig.fontFamily[700]}>{modal_title}</CustomText>
                            {!hideCloseButton && <Pressable onPress={() => hide()}>
                                <Ionicons name='close-outline' size={24} color={colors.text} />
                            </Pressable>}
                        </FlexWrap>
                    </View>
                    {children}
                </View>
            </View>
        </Modal>
    )
}