import AsyncStorage from '@react-native-async-storage/async-storage';
import {DefaultTheme, NavigationContainer, NavigatorScreenParams} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {useColorScheme} from 'react-native';
import Splash from 'screens/Splash';
import Welcome from 'screens/Welcome';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

export type RootStackParamList = {
  Welcome: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const Navigation = () => {
  const scheme = useColorScheme();
  const [isLoading, setIsLoading] = useState(true);
  const navigation = React.useRef<any>();

  useEffect(() => {
    const bootstrap = async () => {
      //track opened app count for engagement events like review requests
      const openedAppCount: number = Number(await AsyncStorage.getItem('OPENED_APP'));
      AsyncStorage.setItem('OPENED_APP', openedAppCount ? (openedAppCount + 1).toString() : '1');

      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };

    bootstrap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    // We haven't finished checking for the token yet
    return <Splash />;
  }

  return (
    <NavigationContainer ref={navigation} theme={scheme === 'dark' ? theme : theme}>
      <Stack.Navigator initialRouteName={'Welcome'} screenOptions={{headerShown: false}}>
        <Stack.Screen name="Welcome" component={Welcome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
