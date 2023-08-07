import { useState } from 'react';
import { View, Modal, StyleSheet, SectionList, TouchableOpacity } from 'react-native';
import { Pressable } from 'react-native';
import CustomText from './CustomText';
import { useTheme } from '../providers/ThemeProvider';
import stylesConfig from '../config/styles';
import Ionicons from '@expo/vector-icons/Ionicons';

export const SelectModal = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const { colors } = useTheme();

    const setSelectValue = (select_value, placeholder_value) => {
        props.setSelectValue(select_value);
        props.setPlaceholder(placeholder_value);

        if(props.setCoordinates){
            props.setCoordinates(select_value);
        }
        setModalVisible(false);
    }

    const styles = StyleSheet.create({
        modal: {
            width: '100%',
            height: '100%',
            backgroundColor: colors.active
        },

        modal_header: {
            paddingVertical: 20,
            paddingHorizontal: 15,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: colors.primary
        },

        modalButtonWrap: {
            position: 'relative',
            backgroundColor: colors.inactive,
            borderRadius: 10,
            width: '100%',
            borderWidth: 1,
            borderColor: colors.secondary,
            paddingVertical: 16,
            paddingLeft: props.icon ? 44 : 10,
            fontFamily: stylesConfig.fontFamily[500],
            fontSize: stylesConfig.fontSize.text_base,
            color: colors.text
        },

        sectionHeader: {
            backgroundColor: colors.inactive,
            padding: 15,
            borderBottomWidth: 1,
            borderColor: colors.border
        },

        sectionItem: {
            padding: 15,
            borderBottomWidth: 1,
            borderColor: colors.border
        },

        icon: {
            position: 'absolute',
            top: 12,
            left: 10
        },

        chevron: {
            position: 'absolute',
            top: 16,
            right: 10
        }
    });

    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modal}>
                    <View style={styles.modal_header}>
                        <CustomText color={'#fff'} fontFamily={stylesConfig.fontFamily[700]}>{props.header_title}</CustomText>
                        <Pressable onPress={() => setModalVisible(!modalVisible)}>
                            <Ionicons name='close-outline' size={28} color={'#fff'} />
                        </Pressable>
                    </View>
                    <SectionList
                        sections={props.data}
                        keyExtractor={(item, index) => item + index}

                        renderSectionHeader={({ section: { title } }) => (
                            <View style={styles.sectionHeader}>
                                <CustomText fontFamily={stylesConfig.fontFamily[700]}>{title}</CustomText>
                            </View>
                        )}

                        renderItem={({ item }) => (
                            <TouchableOpacity activeOpacity={.4} onPress={() => setSelectValue(item.id, item.name)} style={styles.sectionItem}>
                                <CustomText color={props.select_value == item.id ? colors.primary : colors.text} fontFamily={props.select_value == item.id && stylesConfig.fontFamily[500]}>{item.name}</CustomText>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </Modal>
            <Pressable style={styles.modalButtonWrap} onPress={() => setModalVisible(!modalVisible)}>
                <CustomText
                    backgroundColor={colors.inactive}
                    paddingHorizontal={4}
                    position={'absolute'}
                    top={-12}
                    left={10}
                    fontFamily={stylesConfig.fontFamily[500]}
                    size={stylesConfig.fontSize.text_sm}
                    color={props.label_error ? colors.danger : colors.text}
                >
                    {props.label_error ? props.label_error : props.modal_label}
                </CustomText>

                <CustomText color={colors.secondary} fontFamily={stylesConfig.fontFamily[500]}>{props.placeholder}</CustomText>

                {props.icon &&
                    <View style={styles.icon}>
                        <Ionicons name={props.icon} size={24} color={colors.text} />
                    </View>
                }

                <View style={styles.chevron}>
                    <Ionicons name='chevron-down-outline' size={18} color={colors.text} />
                </View>
            </Pressable>
        </>
    )
}