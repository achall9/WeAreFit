import {Box, Image} from 'native-base';
import React from 'react';
import {StatusBar} from 'react-native';
import Label from 'components/Label';

import {Images} from 'config';

const Splash = () => {
  return (
    <Box flex={1}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent />
      {/* <ImageBackground source={Images.splash} style={{flex: 1}}> */}
      <Box flex={1} alignItems="center" justifyContent="center">
        {/* <Image source={Images.whiteLogo} width={100} height={100} alt="logo" /> */}
        <Label m="4" sz="large" color="black">
          Anything else?
        </Label>
      </Box>
      {/* </ImageBackground> */}
    </Box>
  );
};

export default Splash;
