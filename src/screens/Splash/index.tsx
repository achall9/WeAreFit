import {Box} from 'native-base';
import React from 'react';
import {StatusBar} from 'react-native';
import Label from 'components/Label';
const Splash = () => {
  return (
    <Box flex={1}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent />
      <Box flex={1} alignItems="center" justifyContent="center">
        <Label m="4" sz="large" color="black">
          Anything else?
        </Label>
      </Box>
    </Box>
  );
};

export default Splash;
