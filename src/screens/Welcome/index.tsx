import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Box, StatusBar} from 'native-base';
import React from 'react';
import {RootStackParamList} from 'navigation';

const Welcome = () => {
  console.log('---------------------------------------------------------------');
  return (
    <Box testID="welcome" flex={1} bg="primary.300" justifyContent="flex-end">
      <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent />
    </Box>
  );
};

export default Welcome;
