import { StyleSheet, View, TextInput, Pressable, TouchableOpacity, SectionList } from 'react-native';
import stylesConfig from '../config/styles';
import { TextInputMask } from 'react-native-masked-text';
import { useState } from 'react';
import { useTheme } from '../providers/ThemeProvider';
import CustomText from './CustomText';
import Ionicons from '@expo/vector-icons/Ionicons';
import { CustomModal } from './CustomModal';

export const CustomInput = ({
    input_label,
    input_type,
    input_mode,
    input_value,
    placeholder,
    setInputValue,
    label_error,
    icon,
    maxLength,
    modal_title,
    data,
    select_value,
    setSelectValue,
    setPlaceholder,
    setCoordinates
}) => {
    const { colors } = useTheme();
    const [password_is_visible, setPasswordIsVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const changeSelectValue = (select_value, placeholder_value) => {
        setSelectValue(select_value);
        setPlaceholder(placeholder_value);

        if (setCoordinates) {
            setCoordinates(select_value);
        }
        setModalVisible(false);
    }

    const styles = StyleSheet.create({
        inputWrap: {
            position: 'relative',
            backgroundColor: colors.inactive,
            borderRadius: 10,
            width: '100%',
            borderWidth: 1,
            borderColor: colors.secondary
        },

        selfInput: {
            paddingVertical: 10,
            paddingLeft: icon ? 44 : 10,
            fontFamily: stylesConfig.fontFamily[500],
            fontSize: stylesConfig.fontSize.text_base,
            color: colors.text
        },

        icon: {
            position: 'absolute',
            top: 12,
            left: 10
        },

        eye: {
            position: 'absolute',
            top: 12,
            right: 10
        },

        chevron: {
            position: 'absolute',
            top: 16,
            right: 10
        },

        sectionItem: {
            paddingVertical: 15,
            borderBottomWidth: 1,
            borderColor: colors.border
        }
    });

    return (
        <View style={styles.inputWrap}>
            <CustomText
                backgroundColor={colors.inactive}
                paddingHorizontal={4}
                position={'absolute'}
                top={-12}
                left={10}
                fontFamily={stylesConfig.fontFamily[500]}
                size={stylesConfig.fontSize.text_sm}
                color={label_error ? colors.danger : colors.text}
            >
                {label_error ? label_error : input_label}
            </CustomText>

            {
                input_type === 'phone'
                    ?
                    <TextInputMask
                        type={'custom'}
                        inputMode={input_mode}
                        options={{
                            /**
                             * mask: (String | required | default '')
                             * the mask pattern
                             * 9 - accept digit.
                             * A - accept alpha.
                             * S - accept alphanumeric.
                             * * - accept all, EXCEPT white space.
                            */
                            mask: '+7 (799) 999-9999'
                        }}
                        value={input_value}
                        onChangeText={text => {
                            setInputValue(text);
                        }}
                        placeholder={placeholder}
                        placeholderTextColor={colors.secondary}
                        cursorColor={colors.primary}
                        style={styles.selfInput}
                    />
                    :
                    input_type === 'password'
                        ?
                        <TextInput
                            style={styles.selfInput}
                            inputMode={input_mode}
                            placeholder={placeholder}
                            placeholderTextColor={colors.secondary}
                            onChangeText={e => setInputValue(e)}
                            defaultValue={input_value}
                            cursorColor={colors.primary}
                            secureTextEntry={!password_is_visible}
                        />
                        :
                        input_type === 'select'
                            ?
                            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.selfInput}>
                                <CustomText paddingVertical={5} fontFamily={stylesConfig.fontFamily[500]} color={colors.secondary}>{placeholder}</CustomText>
                            </TouchableOpacity>
                            :
                            <TextInput
                                style={styles.selfInput}
                                inputMode={input_mode}
                                placeholder={placeholder}
                                placeholderTextColor={colors.secondary}
                                onChangeText={e => setInputValue(e)}
                                defaultValue={input_value}
                                cursorColor={colors.primary}
                                maxLength={maxLength}
                            />
            }

            {icon &&
                <View style={styles.icon}>
                    <Ionicons name={icon} size={24} color={colors.text} />
                </View>
            }

            {input_type === 'password' &&
                <Pressable style={styles.eye} onPress={() => setPasswordIsVisible(!password_is_visible)}>
                    {
                        password_is_visible
                            ?
                            <Ionicons name='eye-outline' size={24} color={colors.text} />
                            :
                            <Ionicons name='eye-off-outline' size={24} color={colors.text} />
                    }
                </Pressable>
            }

            {input_type === 'select' &&
                <>
                    <View style={styles.chevron}>
                        <Ionicons name='chevron-down-outline' size={18} color={colors.text} />
                    </View>
                    <CustomModal show={modalVisible} hide={() => setModalVisible(false)} modal_title={modal_title}>
                        <SectionList
                            sections={data}
                            keyExtractor={(item, index) => item + index}
                            renderSectionHeader={({ section: { title } }) => (
                                <View style={styles.sectionItem}>
                                    <CustomText fontFamily={stylesConfig.fontFamily[700]}>{title}</CustomText>
                                </View>
                            )}
                            renderItem={({ item }) => (
                                <TouchableOpacity activeOpacity={.4} onPress={() => changeSelectValue(item.id, item.name)} style={styles.sectionItem}>
                                    <CustomText color={select_value == item.id ? colors.primary : colors.text} fontFamily={select_value == item.id && stylesConfig.fontFamily[500]}>{item.name}</CustomText>
                                </TouchableOpacity>
                            )}
                        />
                    </CustomModal>
                </>
            }
        </View>
    )
}