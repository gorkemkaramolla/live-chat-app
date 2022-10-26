import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { getUserProfilePic } from "../../requests/UserRequests";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Profile() {
    const [profilePic, setProfilePic] = useState();
    const [user, setUser] = useState("");

    useEffect(() => {
        getUserProfilePic("4user", (response) => {
            setProfilePic(response);
        });
        getData();
    }, []);
    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem("@user");
            if (value !== null) {
                setUser(value);
            }
        } catch (e) {
            // error reading value
        }
    };
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={{
                    uri: "https://live-app-rest-api.herokuapp.com/users/image/opsman4",
                }}
            ></Image>
            <Text>{user}</Text>
            <Pressable>
                <Text>Add Profile</Text>
            </Pressable>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        marginTop: 75,
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    image: {
        width: 200,
        height: 200,
    },
});
