import { useEffect, useState } from 'react';
import { Camera, CameraType } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useWindowDimensions } from "react-native";
import { View, ImageBackground } from 'react-native';
import { CustomButton } from '../components/CustomButton';
import CustomText from '../components/CustomText';
import { useTranslation } from "react-i18next";
import { FlexWrap } from '../components/FlexWrap';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Card } from '../components/Card';
import stylesConfig from '../config/styles';
import { Loader } from '../components/Loader';
import { FlexColumn } from '../components/FlexColumn';
import { PressableLink } from '../components/PressableLink';
import { useTheme } from '../providers/ThemeProvider';
import axios from 'axios';
import CenterLayout from '../layouts/CenterLayout';

export default function Scanner({ navigation }) {
  const [scanned, setScanned] = useState(false);
  const [loader, setLoader] = useState(false);
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [type, setType] = useState(CameraType.back);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [hasPermission, setHasPermission] = useState(null);
  const { width } = useWindowDimensions();
  const height = Math.round((width * 4) / 3);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    getBarCodeScannerPermissions();
  }, []);

  const toggleCameraType = () => {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setLoader(true);
    axios
      .post('/operations/scan/' + data)
      .then((response) => {
        setScanned(true);
        setLoader(false);
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status == 404) {
            alert(t('qr_code_not_found'));
          }
        }
        else {
          alert(t('errors.network_error'));
        }
      }).finally(() => {
        setLoader(false);
      });
  };

  return (
    <CenterLayout alignItems={'center'} title={t('scanner.title')} navigation={navigation}>
      {
        hasPermission === null
          ?
          <Card>
            <CustomText>{t('scanner.requesting_permission')}</CustomText>
          </Card>
          :
          hasPermission === false
            ?
            <Card>
              <CustomText textAlign={'center'}>{t('scanner.no_access_to_camera')}</CustomText>
            </Card>
            :
            <>
              {loader === true ?
                <Loader text={t('scanner.please_wait')} />
                :
                scanned === true ?
                  <FlexColumn justifyContent={'center'}>
                    <View style={{ width: '100%', alignItems: 'center' }}>
                      <Ionicons name='checkmark-circle-outline' size={72} color={colors.primary} />
                    </View>
                    <CustomText fontFamily={stylesConfig.fontFamily[500]} size={stylesConfig.fontSize.text_xl} textAlign={'center'}>{t('operations.success_title')}</CustomText>
                    <CustomText fontFamily={stylesConfig.fontFamily[500]} textAlign={'center'}>{t('operations.success_description')}</CustomText>
                    <PressableLink text={t('home.to_main_page')} onPressHandle={() => navigation.navigate('Home')} />
                  </FlexColumn>
                  :
                  <View style={{ width: '100%', overflow: 'hidden', borderRadius: 10 }}>
                    <Camera
                      barCodeScannerSettings={{
                        barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
                      }}
                      onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                      ratio="4:3"
                      style={{ height: height, width: "100%", position: "relative" }}
                      type={type}
                      flashMode={flashMode ? Camera.Constants.FlashMode.torch : Camera.Constants.FlashMode.off}
                    >
                      <ImageBackground style={{ flex: 1, zIndex: 1, justifyContent: 'center', alignItems: 'center', position: 'relative' }} source={require('../assets/images/scanner/scanner_bg.png')} resizeMode='cover'>
                        <CustomText position={'absolute'} top={'10%'} fontFamily={stylesConfig.fontFamily[500]} color={'#fff'}>{t('scanner.scan_the_qr_code')}</CustomText>
                        <FlexWrap justifyContent={'space-between'} width={'100%'} position={'absolute'} left={0} bottom={1} padding={20}>
                          <CustomButton borderRadius={24} onPressHandle={() => toggleCameraType()}>
                            <Ionicons name='camera-reverse-outline' size={24} color={'#fff'} />
                          </CustomButton>
                          {type === 'back' &&
                            <CustomButton borderRadius={24} onPressHandle={() => setFlashMode(!flashMode)}>
                              {flashMode
                                ?
                                <Ionicons name='flash-outline' size={24} color={'#fff'} />
                                :
                                <Ionicons name='flash-off-outline' size={24} color={'#fff'} />
                              }
                            </CustomButton>
                          }
                        </FlexWrap>
                      </ImageBackground>
                    </Camera>
                  </View>
              }
            </>
      }
    </CenterLayout>
  );
}