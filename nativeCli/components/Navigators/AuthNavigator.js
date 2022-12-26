import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {ROUTES} from '../constants';
import Login from '../Screens/Auth/Login';
import Register from '../Screens/Auth/Register';
import DrawerNavigator from './DrawerNavigator';
import CommentToPost from '../Screens/Home/Posts/Comments/CommentToPost';
const Stack = createNativeStackNavigator();
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState, useEffect, useMemo} from 'react';
import {View, Text} from 'react-native';

const AuthNavigator = () => {
  const [userId, setUserId] = useState(loadName());
  const [loading, setLoading] = useState(false);
  async function loadName() {
    try {
      const res = await AsyncStorage.getItem('@current_user_id');
      setUserId(res);
    } catch (e) {
      console.error('Failed to load name.');
    }
  }
  async function main() {
    setLoading(true);

    await loadName();
    setLoading(true);
  }

  useEffect(() => {
    main();
  }, []);
  const params = {backgroundColor: '#F0F8FF'};
  return (
    <Stack.Navigator
      initialRouteName={userId === null ? ROUTES.LOGIN : ROUTES.DRAWER}
      screenOptions={{
        headerShown: false,
        statusBar: 'light',
        headerTintColor: 'black',
        headerBackTitleVisible: false,
        headerStyle: {backgroundColor: 'red'},
        cardStyle: {backgroundColor: 'red'},
      }}>
      <Stack.Screen
        initialParams={params}
        name={ROUTES.DRAWER}
        component={DrawerNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name={ROUTES.LOGIN} component={Login} options={{}} />

      <Stack.Screen name={ROUTES.REGISTER} component={Register} options={{}} />

      <Stack.Screen
        initialParams={params}
        name={ROUTES.MAKECOMMENT}
        component={CommentToPost}></Stack.Screen>
    </Stack.Navigator>
  );
};
export default AuthNavigator;
