import {useCallback, useEffect} from 'react';
import {BackHandler} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import {RootStackParamList} from 'navigation';

export const useBackHandler = () => {
  const {goBack} = useNavigation<NavigationProp<RootStackParamList>>();

  const onBack = useCallback(() => {
    goBack();
    return true;
  }, [goBack]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onBack);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBack);
    };
  }, [onBack]);

  return null;
};
