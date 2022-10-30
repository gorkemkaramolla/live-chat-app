import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {ROUTES} from '../constants';
import Login from '../Screens/Auth/Login';
import Register from '../Screens/Auth/Register';
import DrawerNavigator from './DrawerNavigator';
const Stack = createNativeStackNavigator();
const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.Login}
      screenOptions={{
        headerStyle: {
          backgroundColor: '#9B59B6',
        },
        headerTintColor: 'white',
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen name={ROUTES.LOGIN} component={Login} options={{}} />
      <Stack.Screen name={ROUTES.REGISTER} component={Register} options={{}} />

      <Stack.Screen
        name={ROUTES.DRAWER}
        component={DrawerNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
export default AuthNavigator;
