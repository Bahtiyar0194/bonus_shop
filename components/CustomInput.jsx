import { StyleSheet, View, TextInput, Pressable } from 'react-native';
import stylesConfig from '../config/styles';
import { TextInputMask } from 'react-native-masked-text';
import { useState } from 'react';
import { useTheme } from '../providers/ThemeProvider';
import CustomText from './CustomText';
import Ionicons from '@expo/vector-icons/Ionicons';

export const CustomInput = ({ input_label, input_type, input_mode, input_value, placeholder, setInputValue, label_error, icon, maxLength }) => {
    const { colors } = useTheme();
    const [is_visible, setIsVisible] = useState(false);

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
                            secureTextEntry={!is_visible}
                        />
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
                <Pressable style={styles.eye} onPress={() => setIsVisible(!is_visible)}>
                    {
                        is_visible
                            ?
                            <Ionicons name='eye-outline' size={24} color={colors.text} />
                            :
                            <Ionicons name='eye-off-outline' size={24} color={colors.text} />
                    }
                </Pressable>
            }

            {input_type === 'select' &&
                <View style={styles.chevron}>
                    <Ionicons name='chevron-down-outline' size={18} color={colors.text} />
                </View>
            }
        </View>
    )
}