import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Welcome from 'screens/Welcome';
import Settings from 'screens/Settings';

export type TabStackParamList = {
  Welcome: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<TabStackParamList>();

export const TabStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Welcome" component={Welcome} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};
