import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {StyleSheet} from 'react-native';
import Profile from '../Screens/Home/Profile';
import Settings from '../Screens/Home/Settings';
import Post from '../Screens/Home/Post';
import {ROUTES} from '../constants';

import Message from '../Screens/Home/Message';
import Home from '../Screens/Home/Home';
const BottomTabs = createMaterialTopTabNavigator();

const BottomNavigator = () => {
  return (
    <BottomTabs.Navigator
      style={styles.bottomTabs}
      tabBarPosition={'bottom'}
      screenOptions={{
        swipeEnabled: true,
        tabBarStyle: {
          tabBarButtonColor: 'red',
        },
        tabBarActiveTintColor: '#007aff',
        tabBarIndicatorStyle: {},
        tabBarPressColor: 'green',
        tabBarShowLabel: false,
        tabBarInactiveTintColor: 'pink',
      }}>
      <BottomTabs.Screen
        options={{
          headerShown: false,
          title: 'Home',
          tabBarIcon: props => (
            <Icon
              style={{
                fontSize: 24,
              }}
              name={props.focused ? 'home' : 'home-outline'}
              {...props}></Icon>
          ),
        }}
        name={ROUTES.HOME}
        component={Home}></BottomTabs.Screen>

      <BottomTabs.Screen
        options={{
          headerShown: false,
          title: 'message',
          tabBarIcon: props => (
            <Icon
              style={{
                fontSize: 24,
              }}
              name={props.focused ? 'chatbubble' : 'chatbubble-outline'}
              {...props}></Icon>
          ),
        }}
        name={ROUTES.MESSAGE}
        component={Message}></BottomTabs.Screen>
      <BottomTabs.Screen
        options={{
          headerShown: false,
          title: 'post',
          tabBarIcon: props => (
            <Icon
              style={{
                fontSize: 24,
              }}
              {...props}
              name={props.focused ? 'add-circle' : 'add-circle-outline'}></Icon>
          ),
        }}
        name={ROUTES.POST}
        component={Post}></BottomTabs.Screen>
      <BottomTabs.Screen
        options={{
          headerShown: false,
          title: 'live',
          tabBarIcon: props => (
            <Icon
              style={{
                fontSize: 24,
              }}
              name={props.focused ? 'radio' : 'radio-outline'}
              {...props}></Icon>
          ),
        }}
        name="settings"
        component={Settings}></BottomTabs.Screen>
      <BottomTabs.Screen
        options={{
          headerShown: false,
          title: 'profile',
          tabBarIcon: props => (
            <Icon
              style={{
                fontSize: 24,
              }}
              name={props.focused ? 'person' : 'person-outline'}
              {...props}></Icon>
          ),
        }}
        name={ROUTES.PROFILE}
        component={Profile}></BottomTabs.Screen>
    </BottomTabs.Navigator>
  );
};

const styles = StyleSheet.create({
  bottomTabs: {
    marginBottom: 20,
  },
});
export default BottomNavigator;
