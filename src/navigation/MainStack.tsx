import React from 'react';
import {NavigatorScreenParams} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {TabStack, TabStackParamList} from './TabStack';

export type MainStackParamList = {
  TabStack: NavigatorScreenParams<TabStackParamList>;
};

const Stack = createStackNavigator<MainStackParamList>();

export const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: 'black',
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen name="TabStack" component={TabStack} options={{headerShown: false}} />
    </Stack.Navigator>
  );
};
