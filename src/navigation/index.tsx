import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {useColorScheme} from 'react-native';
import Splash from 'screens/Splash';
import Welcome from 'screens/Welcome';
import DetailsScreen from 'screens/DetailsScreen';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

export type RootStackParamList = {
  DetailsScreen: {
    data: {
      id: string;
      image_url: string;
      iconName: string;
      title: string;
      description: string;
    };
  };
  Welcome: undefined;
};

const Stack = createSharedElementStackNavigator<RootStackParamList>();

const options = {
  headerBackTitleVisible: false,
  cardStyleInterpolator: ({current: {progress}}) => {
    return {
      cardStyle: {
        opacity: progress,
      },
    };
  },
};
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

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName={'Welcome'} screenOptions={{headerShown: false}}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="DetailsScreen" options={() => options} component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
