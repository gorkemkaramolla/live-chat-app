import React, {useEffect} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import BottomNavigator from './BottomNavigator';
import {ROUTES} from '../constants';
const Drawer = createDrawerNavigator();
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
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
