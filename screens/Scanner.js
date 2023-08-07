import { useEffect, useState } from 'react';
import { Camera, CameraType } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useWindowDimensions } from "react-native";
import DefaultLayout from '../layouts/DefaultLayout';
import { View, ImageBackground } from 'react-native';
import { CustomButton } from '../components/CustomButton';
import CustomText from '../components/CustomText';
import { useTranslation } from "react-i18next";
import { FlexWrap } from '../components/FlexWrap';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Card } from '../components/Card';
import stylesConfig from '../config/styles';
import { Loader } from '../components/Loader';

export default function Scanner({ navigation }) {
  const [loader, setLoader] = useState();
  const { t } = useTranslation();
  const [type, setType] = useState(CameraType.back);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
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
    setScanned(true);
    setLoader(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  return (
    <DefaultLayout justifyContent={'center'} title={t('scanner.title')} navigation={navigation}>
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
              <View style={{ width: '100%', overflow: 'hidden', borderRadius: 10 }}>
                <Camera
                  barCodeScannerSettings={{
                    barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
                  }}
                  onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                  ratio="4:3"
                  style={{ height: height, width: "100%" }}
                  type={type}
                  flashMode={flashMode ? Camera.Constants.FlashMode.torch : Camera.Constants.FlashMode.off}
                >
                  {!scanned
                    ?
                    <ImageBackground style={{ flex: 1, justifyContent: 'center', alignItems: 'center', position: 'relative' }} source={require('../assets/images/scanner/scanner_bg.png')} resizeMode='cover'>
                      <CustomText position={'absolute'} top={'10%'} fontFamily={stylesConfig.fontFamily[500]} color={'#fff'}>{t('scanner.scan_the_qr_code')}</CustomText>
                      <FlexWrap justifyContent={'space-between'} width={'100%'} position={'absolute'} left={0} bottom={1} padding={20}>
                        <CustomButton borderRadius={24} onPressHandle={toggleCameraType}>
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
                    :
                    <Loader text={t('scanner.please_wait')} />
                    // <CustomButton onPressHandle={() => setScanned(false)}>
                    //   <CustomText color={'#fff'}>Scan again</CustomText>
                    // </CustomButton>
                  }
                </Camera>
              </View>
            </>
      }
    </DefaultLayout>
  );
}