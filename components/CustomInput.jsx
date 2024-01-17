import { StyleSheet, View, TextInput, Pressable, TouchableOpacity, SectionList } from 'react-native';
import stylesConfig from '../config/styles';
import { TextInputMask } from 'react-native-masked-text';
import { useState } from 'react';
import { useTheme } from '../providers/ThemeProvider';
import CustomText from './CustomText';
import { CustomButton } from './CustomButton';
import Ionicons from '@expo/vector-icons/Ionicons';
import { CustomModal } from './CustomModal';
import { FlexWrap } from './FlexWrap';
import { ListItem } from './ListItem';
import { useTranslation } from "react-i18next";

export const CustomInput = ({
    input_label,
    input_type,
    input_mode,
    multiline,
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
    selected_values,
    setSelectedValues,
    onChangeHandler,
    fontSize,
    width,
    borderWidth,
    flex
}) => {
    const { colors } = useTheme();
    const { t } = useTranslation();

    const [password_is_visible, setPasswordIsVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selected_all_values, setSelectedAllValues] = useState(false);


    const changeSelectValue = (select_value, placeholder_value) => {
        setSelectValue({
            id: select_value,
            name: placeholder_value
        });

        if (onChangeHandler) {
            onChangeHandler(select_value);
        }
        setModalVisible(false);
    }

    const toggleSelectedValues = (select_value, placeholder_value) => {
        if (!selected_values.find(item => item.id === select_value)) {
            setSelectedValues((selected_values) => [...selected_values, {
                id: select_value,
                name: placeholder_value
            }]);
        }
        else {
            let newArr = selected_values.filter(function (item) {
                return item.id !== select_value;
            });
            setSelectedValues(newArr);
        }
    }

    const toggleAllValues = (select_type) => {
        setSelectedValues([]);
        setSelectedAllValues(!selected_all_values);

        if (!selected_all_values) {
            if (select_type === 'multiple_select') {
                for (let index = 0; index < data.length; index++) {
                    setSelectedValues((selected_values) => [...selected_values, data[index]]);
                }
            }
            else if (select_type === 'multiple_group_select') {
                for (let index = 0; index < data.length; index++) {
                    for (let i = 0; i < data[index].data.length; i++) {
                        setSelectedValues((selected_values) => [...selected_values, data[index].data[i]]);
                    }
                }
            }
        }
    }

    const styles = StyleSheet.create({
        inputWrap: {
            flex: flex,
            minHeight: multiline === true ? 100 : null,
            position: 'relative',
            backgroundColor: colors.inactive,
            borderRadius: 10,
            width: width || '100%',
            borderWidth: borderWidth === 0 ? 0 : 1,
            borderColor: colors.border
        },

        selfInput: {
            paddingVertical: 8,
            paddingLeft: icon ? 44 : 8,
            paddingRight: icon ? 44 : null,
            fontFamily: stylesConfig.fontFamily[500],
            fontSize: fontSize || stylesConfig.fontSize.text_base,
            color: colors.secondary
        },

        icon: {
            position: 'absolute',
            top: 10,
            left: 10
        },

        eye: {
            position: 'absolute',
            top: 10,
            right: 10
        },

        chevron: {
            position: 'absolute',
            top: 12,
            right: 10
        }
    });

    return (
        <View style={styles.inputWrap}>
            {input_label && <CustomText
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
            </CustomText>}


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
                        (input_type === 'select' || input_type === 'group_select' || input_type === 'multiple_select' || input_type === 'multiple_group_select')
                            ?
                            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.selfInput}>
                                <CustomText paddingVertical={5} fontFamily={stylesConfig.fontFamily[500]} color={colors.secondary}>
                                    {
                                        ((input_type === 'select' || input_type === 'group_select') && select_value)
                                            ?
                                            select_value.name
                                            :
                                            ((input_type === 'multiple_select' || input_type === 'multiple_group_select') && selected_values.length > 0)
                                                ?
                                                selected_values.map(i => i.name).join(', ')
                                                :
                                                placeholder
                                    }
                                </CustomText>
                            </TouchableOpacity>
                            :
                            <TextInput
                                style={styles.selfInput}
                                inputMode={input_mode}
                                multiline={multiline}
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
                    <Ionicons name={icon} size={24} color={colors.secondary} />
                </View>
            }

            {input_type === 'password' &&
                <Pressable style={styles.eye} onPress={() => setPasswordIsVisible(!password_is_visible)}>
                    {
                        password_is_visible
                            ?
                            <Ionicons name='eye-outline' size={24} color={colors.secondary} />
                            :
                            <Ionicons name='eye-off-outline' size={24} color={colors.secondary} />
                    }
                </Pressable>
            }

            {(input_type === 'select' || input_type === 'group_select' || input_type === 'multiple_select' || input_type === 'multiple_group_select') &&
                <>
                    <View style={styles.chevron}>
                        <Ionicons name='chevron-down-outline' size={18} color={colors.secondary} />
                    </View>
                    <CustomModal show={modalVisible} hide={() => setModalVisible(false)} modal_title={modal_title}>

                        {input_type === 'select' && data.map((item, index) => (
                            <ListItem key={item.id} last={(index + 1) === data.length} onPressHandler={() => changeSelectValue(item.id, item.name)}>
                                <CustomText color={select_value?.id == item.id ? colors.primary : colors.text} fontFamily={select_value?.id == item.id && stylesConfig.fontFamily[500]}>{item.name}</CustomText>
                            </ListItem>
                        ))}

                        {input_type === 'group_select' &&
                            <SectionList
                                sections={data}
                                keyExtractor={(item, index) => item + index}
                                renderSectionHeader={({ section: { title } }) => (
                                    <ListItem last={true} key={title}>
                                        <CustomText fontFamily={stylesConfig.fontFamily[700]}>{title}</CustomText>
                                    </ListItem>
                                )}
                                renderItem={({ item }) => (
                                    <ListItem key={item.id} onPressHandler={() => changeSelectValue(item.id, item.name)}>
                                        <CustomText color={select_value?.id == item.id ? colors.primary : colors.text} fontFamily={select_value?.id == item.id && stylesConfig.fontFamily[500]}>{item.name}</CustomText>
                                    </ListItem>
                                )}
                            />
                        }


                        {input_type === 'multiple_select' &&
                            <>
                                <ListItem onPressHandler={() => toggleAllValues('multiple_select')}>
                                    <FlexWrap gap={5}>
                                        {
                                            selected_all_values
                                                ?
                                                <Ionicons name='checkmark-circle-outline' size={24} color={colors.primary} />
                                                :
                                                <Ionicons name='ellipse-outline' size={24} color={colors.secondary} />
                                        }
                                        <CustomText color={selected_all_values && colors.primary} fontFamily={stylesConfig.fontFamily[700]}>{t('misc.select_all')}</CustomText>
                                    </FlexWrap>
                                </ListItem>
                                {data.map((item, index) => (
                                    <ListItem key={item.id} last={(index + 1) === data.length} onPressHandler={() => toggleSelectedValues(item.id, item.name)}>
                                        <FlexWrap gap={5}>
                                            {
                                                selected_values.find(i => i.id === item.id)
                                                    ?
                                                    <Ionicons name='checkmark-circle-outline' size={24} color={colors.primary} />
                                                    :
                                                    <Ionicons name='ellipse-outline' size={24} color={colors.secondary} />
                                            }
                                            <CustomText color={selected_values.find(i => i.id === item.id) ? colors.primary : colors.text} fontFamily={selected_values.find(i => i.id === item.id) && stylesConfig.fontFamily[500]}>{item.name}</CustomText>
                                        </FlexWrap>
                                    </ListItem>
                                ))}
                                {selected_values.length > 0 &&
                                    <CustomButton width={'100%'} marginTop={20} onPressHandle={() => setModalVisible(false)}>
                                        <Ionicons name='checkbox-outline' size={24} color={'#fff'} />
                                        <CustomText color={'#fff'} fontFamily={stylesConfig.fontFamily[500]}>{t('misc.done')}</CustomText>
                                    </CustomButton>
                                }
                            </>
                        }


                        {input_type === 'multiple_group_select' &&
                            <>
                                <ListItem onPressHandler={() => toggleAllValues('multiple_group_select')}>
                                    <FlexWrap gap={5}>
                                        {
                                            selected_all_values
                                                ?
                                                <Ionicons name='checkmark-circle-outline' size={24} color={colors.primary} />
                                                :
                                                <Ionicons name='ellipse-outline' size={24} color={colors.secondary} />
                                        }
                                        <CustomText color={selected_all_values && colors.primary} fontFamily={stylesConfig.fontFamily[700]}>{t('misc.select_all')}</CustomText>
                                    </FlexWrap>
                                </ListItem>
                                <SectionList
                                    sections={data}
                                    keyExtractor={(item, index) => item + index}
                                    renderSectionHeader={({ section: { title } }) => (
                                        <ListItem key={title}>
                                            <CustomText fontFamily={stylesConfig.fontFamily[700]}>{title}</CustomText>
                                        </ListItem>
                                    )}
                                    style={{ marginBottom: 20 }}
                                    renderItem={({ item }) => (
                                        <ListItem key={item.id} onPressHandler={() => toggleSelectedValues(item.id, item.name)}>
                                            <FlexWrap gap={5}>
                                                {
                                                    selected_values.find(i => i.id === item.id)
                                                        ?
                                                        <Ionicons name='checkmark-circle-outline' size={24} color={colors.primary} />
                                                        :
                                                        <Ionicons name='ellipse-outline' size={24} color={colors.secondary} />
                                                }
                                                <CustomText color={selected_values.find(i => i.id === item.id) ? colors.primary : colors.text} fontFamily={selected_values.find(i => i.id === item.id) && stylesConfig.fontFamily[500]}>{item.name}</CustomText>
                                            </FlexWrap>
                                        </ListItem>
                                    )}
                                />
                                {selected_values.length > 0 &&
                                    <CustomButton width={'100%'} onPressHandle={() => setModalVisible(false)}>
                                        <Ionicons name='checkbox-outline' size={24} color={'#fff'} />
                                        <CustomText color={'#fff'} fontFamily={stylesConfig.fontFamily[500]}>{t('misc.done')}</CustomText>
                                    </CustomButton>
                                }
                            </>
                        }
                    </CustomModal>
                </>
            }
        </View>
    )
}