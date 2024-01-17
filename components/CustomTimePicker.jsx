import { useState } from 'react';
import { Pressable, Platform, StyleSheet, View } from 'react-native';
import CustomText from './CustomText';
import { useTheme } from '../providers/ThemeProvider';
import stylesConfig from '../config/styles';

import DateTimePicker from '@react-native-community/datetimepicker';

const CustomTimePicker = (props) => {
  const { colors } = useTheme();
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [time, setTime] = useState(new Date(new Date().setHours(props.time_type === 'work_begin' ? props.item.work_begin : props.item.work_end, 0)));

  const styles = StyleSheet.create({
    inputWrap: {
      flex: 1,
      position: 'relative',
      backgroundColor: colors.active,
      borderRadius: 10,
      width: '100%',
      borderWidth: 1,
      borderColor: props.weekend === false ? colors.secondary : colors.border
    },

    textInput: {
      paddingVertical: 10,
      paddingLeft: 10,
      fontFamily: stylesConfig.fontFamily[500],
      fontSize: stylesConfig.fontSize.text_base
    },
  });

  const showPicker = () => {
    setIsPickerShow(true);
  };

  const changeTime = (event, value) => {
    setTime(value);

    if (props.week_days.length > 0) {
      let newState = props.week_days.map(obj => {
        if (obj.week_day_id === props.item.week_day_id) {
          if (props.time_type == 'work_begin') {
            return { ...obj, work_begin: value.getHours() };
          }
          else if (props.time_type == 'work_end') {
            return { ...obj, work_end: value.getHours() };
          }
        }
        return obj;
      });

      props.setWeekDays(newState);
    }

    if (Platform.OS === 'android') {
      setIsPickerShow(false);
    }
  };

  return (
    <>
      <Pressable style={styles.inputWrap} onPress={() => showPicker()}>
        <View style={styles.textInput}>
          <CustomText>{(time.getHours() < 10) && <>0</>}{time.getHours()} : {(time.getMinutes() < 10) && <>0</>}{time.getMinutes()}</CustomText>
        </View>
      </Pressable>

      {isPickerShow && (
        <DateTimePicker
          value={time}
          mode={'time'}
          minuteInterval={0}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          is24Hour={true}
          onChange={changeTime}
        />
      )}
    </>
  );
};

export default CustomTimePicker;