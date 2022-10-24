import * as React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./components/Navigators/AuthNavigator";
export default function App() {
    return (
        <NavigationContainer>
            <AuthNavigator></AuthNavigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
