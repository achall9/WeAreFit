import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer, NavigatorScreenParams} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {useColorScheme} from 'react-native';
import Splash from 'screens/Splash';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {MainStack, MainStackParamList} from './MainStack';
import DetailsScreen from 'screens/DetailsScreen';
import {getDetailSharedElements} from 'screens/getDetailSharedElements';

export type RootStackParamList = {
  MainStack: undefined | NavigatorScreenParams<MainStackParamList>;
  DetailsScreen: {
    data: {
      id: string;
      image_url: string;
      iconName: string;
      title: string;
      description: string;
    };
  };
};

const Stack = createSharedElementStackNavigator<RootStackParamList>();

const Navigation = () => {
  const scheme = useColorScheme();
  const [isLoading, setIsLoading] = useState(true);
  const navigation = React.useRef<any>();

  useEffect(() => {
    const bootstrap = async () => {
      const openedAppCount: number = Number(await AsyncStorage.getItem('OPENED_APP'));
      AsyncStorage.setItem('OPENED_APP', openedAppCount ? (openedAppCount + 1).toString() : '1');

      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };

    bootstrap();
  }, []);

  if (isLoading) {
    return <Splash />;
  }

  const options = {
    headerBackTitleVisible: false,
    headerShown: false,
    cardStyleInterpolator: ({current: {progress}}) => {
      return {
        cardStyle: {
          opacity: progress,
        },
      };
    },
  };

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName={'MainStack'} screenOptions={{headerShown: false}}>
        <Stack.Screen name="MainStack" component={MainStack} options={{gestureEnabled: false}} />
        <Stack.Screen name="DetailsScreen" options={() => options} component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
