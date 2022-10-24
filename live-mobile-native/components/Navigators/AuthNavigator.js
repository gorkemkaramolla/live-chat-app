import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { ROUTES } from "../constants";
import MainScreen from "../screens/auth/MainScreen";
import SecondaryScreen from "../screens/auth/SecondaryScreen";
import Enterance from "../screens/Intro/Enterance";
import DrawerNavigator from "./DrawerNavigator";
const Stack = createNativeStackNavigator();
const AuthNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName={ROUTES.Enterance}
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#9B59B6",
                },
                headerTintColor: "white",
                headerBackTitleVisible: false,
            }}
        >
            <Stack.Screen
                name={ROUTES.INTRO}
                component={Enterance}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={ROUTES.LOGIN}
                component={SecondaryScreen}
                options={{}}
            />
            <Stack.Screen
                name={ROUTES.REGISTER}
                component={MainScreen}
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
};
export default AuthNavigator;
