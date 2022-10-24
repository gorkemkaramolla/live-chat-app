import { View, Text, StyleSheet, Button } from "react-native";
import React, { useEffect } from "react";
import { Video, AVPlaybackStatus } from "expo-av";
import happydog from "../../../assets/happydog.mp4";
import { Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowheight = Dimensions.get("window").height;
import { ROUTES } from "../../constants";
export default function Enterance({ navigation }) {
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    useEffect(
        () => {
            video.current.playAsync();
            setTimeout(() => {
                navigation.navigate(ROUTES.REGISTER, {
                    name: "gorkem",
                });
            }, 3000);
        },
        () => {
            video.current.pauseAsync();
        }
    );
    return (
        <View style={styles.container}>
            <Video
                onFullscreenUpdate={true}
                style={styles.video}
                ref={video}
                source={happydog}
                resizeMode="stretch"
                isLooping
                onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            />
            <View></View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#ecf0f1",
    },
    video: {
        alignSelf: "center",
        width: windowWidth - 20,
        height: windowheight + 100,
        aspectRatio: 0.6 * 1,
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
});
