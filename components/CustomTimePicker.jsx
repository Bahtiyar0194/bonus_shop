import { useState } from 'react';
import { Pressable, Platform, StyleSheet, View } from 'react-native';
import CustomText from './CustomText';
import { useTheme } from '../providers/ThemeProvider';
import stylesConfig from '../config/styles';

import DateTimePicker from '@react-native-community/datetimepicker';

const CustomTimePicker = () => {
  const { colors } = useTheme();
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [time, setTime] = useState(new Date(Date.now()));

  const styles = StyleSheet.create({
    inputWrap: {
      flex: 1,
      position: 'relative',
      backgroundColor: colors.active,
      borderRadius: 10,
      width: '100%',
      borderWidth: 1,
      borderColor: colors.secondary
    },
    textInput: {
      paddingVertical: 10,
      paddingLeft: 10,
      fontFamily: stylesConfig.fontFamily[500],
      fontSize: stylesConfig.fontSize.text_base,
      color: colors.text
    },
  });

  const showPicker = () => {
    setIsPickerShow(true);
  };

  const changeTime = (event, value) => {
    setTime(value);
    if (Platform.OS === 'android') {
      setIsPickerShow(false);
    }
  };

  return (
    <>
      <Pressable style={styles.inputWrap} onPress={showPicker}>
        <View style={styles.textInput}>
          <CustomText>{time.getHours()} : {time.getMinutes()}</CustomText>
        </View>
      </Pressable>

      {isPickerShow && (
        <DateTimePicker
          value={time}
          mode={'time'}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          is24Hour={true}
          onChange={changeTime}
        />
      )}
    </>
  );
};

export default CustomTimePicker;