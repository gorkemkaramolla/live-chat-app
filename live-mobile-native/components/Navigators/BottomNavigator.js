import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "../screens/Home/Profile";
import Settings from "../screens/Home/Settings";
import Post from "../screens/Home/Post";
import { ROUTES } from "../constants";

import Message from "../screens/Home/Message";
import HomeFeed from "../screens/Home/HomeFeed";
const BottomTabs = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#9B59B6",
          tabBarButtonColor: "blue",
        },
        tabBarActiveTintColor: "white",
        tabBarShowLabel: false,
        tabBarInactiveTintColor: "pink",
      }}
    >
      <BottomTabs.Screen
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: (props) => (
            <Icon
              style={{
                fontSize: 24,
              }}
              name="home"
              {...props}
            ></Icon>
          ),
        }}
        name={ROUTES.HOME}
        component={HomeFeed}
      ></BottomTabs.Screen>

      <BottomTabs.Screen
        options={{
          headerShown: false,
          title: "message",
          tabBarIcon: (props) => (
            <Icon
              style={{
                fontSize: 24,
              }}
              name="chatbubble"
              {...props}
            ></Icon>
          ),
        }}
        name={ROUTES.MESSAGE}
        component={Message}
      ></BottomTabs.Screen>
      <BottomTabs.Screen
        options={{
          headerShown: false,
          title: "post",
          tabBarIcon: (props) => (
            <Icon
              style={{
                fontSize: 24,
              }}
              name="add-circle"
              {...props}
            ></Icon>
          ),
        }}
        name={ROUTES.POST}
        component={Post}
      ></BottomTabs.Screen>
      <BottomTabs.Screen
        options={{
          headerShown: false,
          title: "live",
          tabBarIcon: (props) => (
            <Icon
              style={{
                fontSize: 24,
              }}
              name="pulse"
              {...props}
            ></Icon>
          ),
        }}
        name="settings"
        component={Settings}
      ></BottomTabs.Screen>
      <BottomTabs.Screen
        options={{
          headerShown: false,
          title: "profile",
          tabBarIcon: (props) => (
            <Icon
              style={{
                fontSize: 24,
              }}
              name="person"
              {...props}
            ></Icon>
          ),
        }}
        name={ROUTES.PROFILE}
        component={Profile}
      ></BottomTabs.Screen>
    </BottomTabs.Navigator>
  );
};

export default BottomNavigator;
