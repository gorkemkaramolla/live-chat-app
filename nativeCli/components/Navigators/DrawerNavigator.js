import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import BottomNavigator from './BottomNavigator';
import {ROUTES} from '../constants';
import ChatWebSocket from '../Screens/Home/Messages/MessageSending/ChatWebSocket';
const Drawer = createNativeStackNavigator();
const DrawerNavigator = ({route}) => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      useLegacyImplementation>
      <Drawer.Screen
        options={{
          headerShown: false,
        }}
        initialParams={route.params}
        name={ROUTES.BOTTOM}
        component={BottomNavigator}></Drawer.Screen>
      <Drawer.Screen
        options={{
          headerShown: false,
        }}
        initialParams={route.params}
        name={ROUTES.SENDMESSAGE}
        component={ChatWebSocket}></Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
