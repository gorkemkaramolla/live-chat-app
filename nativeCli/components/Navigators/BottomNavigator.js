/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import {React, useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {StyleSheet, View, Dimensions} from 'react-native';
import Profile from '../Screens/Home/Profile';
import Settings from '../Screens/Home/Settings';
import Post from '../Screens/Home/Post';
import {ROUTES} from '../constants';
import Message from '../Screens/Home/Messages/Message';
import Home from '../Screens/Home/Feed/Home';
import {SafeAreaView} from 'react-native-safe-area-context';
const BottomTabs = createMaterialTopTabNavigator();
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import {Animated} from 'react-native';
import PlusScreen from '../Screens/Home/PlusScreen';
const BottomNavigator = ({route}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <BottomTabs.Navigator
        style={styles.bottomTabs}
        tabBarPosition={'bottom'}
        screenOptions={{
          headerShadowVisible: false,
          headerShown: false,
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
          initialParams={route.params}
          options={{
            headerStatusBarHeight: 0,

            headerShadowVisible: false,
            headerShown: false,
            statusBar: null,
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
          initialParams={route.params}
          options={{
            headerStatusBarHeight: 0,

            headerShadowVisible: false,
            headerShown: false,
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
          initialParams={route.params}
          options={{
            headerStatusBarHeight: 0,

            headerShadowVisible: false,
            headerShown: false,
            tabBarIcon: props => (
              <Icon
                style={{
                  fontSize: 24,
                }}
                {...props}
                name={
                  props.focused ? 'add-circle' : 'add-circle-outline'
                }></Icon>
            ),
          }}
          name={ROUTES.POST}
          component={PlusScreen}></BottomTabs.Screen>
        <BottomTabs.Screen
          initialParams={route.params}
          options={{
            headerStatusBarHeight: 0,

            headerShadowVisible: false,
            headerShown: false,
            tabBarIcon: props => (
              <Icon
                style={{
                  fontSize: 24,
                }}
                name={props.focused ? 'radio' : 'radio-outline'}
                {...props}></Icon>
            ),
          }}
          name={ROUTES.SETTINGS}
          component={Settings}></BottomTabs.Screen>

        <BottomTabs.Screen
          initialParams={route.params}
          options={{
            headerStatusBarHeight: 0,

            headerShadowVisible: false,
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bottomTabs: {
    marginBottom: 0,
    padding: 0,
    margin: 0,
  },
});
export default BottomNavigator;
