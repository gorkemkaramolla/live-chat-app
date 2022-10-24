import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Enterance from "../Intro/Enterance";

export default function Message() {
    return <View style={styles.view}></View>;
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
