import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {ROUTES} from '../constants';
import Login from '../Screens/Auth/Login';
import Register from '../Screens/Auth/Register';
import DrawerNavigator from './DrawerNavigator';
import SearchAndFind from '../Screens/Home/Feed/SearchAndFind';
import CommentToPost from '../Screens/Home/Posts/Comments/CommentToPost';
const Stack = createNativeStackNavigator();
const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.Login}
      screenOptions={{
        headerStyle: {
          backgroundColor: 'red',
        },
        headerShown: false,
        headerTintColor: 'black',
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
      <Stack.Screen
        name={ROUTES.SEARCH}
        component={SearchAndFind}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={ROUTES.MAKECOMMENT}
        component={CommentToPost}></Stack.Screen>
    </Stack.Navigator>
  );
};
export default AuthNavigator;
