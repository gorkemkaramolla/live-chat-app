import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {ROUTES} from '../constants';
import Login from '../Screens/Auth/Login';
import Register from '../Screens/Auth/Register';
import DrawerNavigator from './DrawerNavigator';
import SearchAndFind from '../Screens/Home/Feed/SearchAndFind';
import CommentToPost from '../Screens/Home/Posts/Comments/CommentToPost';
const Stack = createNativeStackNavigator();
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState, useEffect} from 'react';
const getUserId = async () => {
  const userId = await AsyncStorage.getItem('@current_user_id');
  if (userId === null || userId === '' || userId === undefined) {
    return false;
  } else {
    return true;
  }
};
const AuthNavigator = () => {
  const [userId, setUserId] = useState(false);
  useEffect(() => {
    getUserId().then(res => {
      console.debug(res);
      setUserId(res);
    });
  }, []);
  if (userId) {
    return (
      <Stack.Navigator
        initialRouteName={ROUTES.HOME}
        screenOptions={{
          headerStyle: {
            backgroundColor: 'red',
          },
          headerShown: false,
          headerTintColor: 'black',
          headerBackTitleVisible: false,
        }}>
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
  } else {
    return (
      <Stack.Navigator
        initialRouteName={ROUTES.LOGIN}
        screenOptions={{
          headerStyle: {
            backgroundColor: 'red',
          },
          headerShown: false,
          headerTintColor: 'black',
          headerBackTitleVisible: false,
        }}>
        <Stack.Screen name={ROUTES.LOGIN} component={Login} options={{}} />
        <Stack.Screen
          name={ROUTES.REGISTER}
          component={Register}
          options={{}}
        />
        <Stack.Screen
          name={ROUTES.DRAWER}
          component={DrawerNavigator}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    );
  }
};

export default AuthNavigator;
