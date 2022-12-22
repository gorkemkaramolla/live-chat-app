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
import {useState, useEffect, useMemo} from 'react';
import {View, Text} from 'react-native';

const AuthNavigator = () => {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  async function loadName() {
    try {
      const name = await AsyncStorage.getItem('@current_user_id');
      console.debug(name);

      setUserId(name);
    } catch (e) {
      console.error('Failed to load name.');
    }
  }
  useEffect(() => {}, []);
  useEffect(() => {
    setLoading(true);

    loadName();
    setLoading(true);
  }, [userId]);

  if (loading) {
    return (
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: 'red',
          },

          headerShown: false,
          headerTintColor: 'black',
          headerBackTitleVisible: false,
        }}>
        {!userId && (
          <Stack.Screen name={ROUTES.LOGIN} component={Login} options={{}} />
        )}
        <Stack.Screen
          name={ROUTES.DRAWER}
          component={DrawerNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={ROUTES.REGISTER}
          component={Register}
          options={{}}
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
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
};
export default AuthNavigator;
