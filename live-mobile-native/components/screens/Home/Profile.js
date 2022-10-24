import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { getUserProfilePic } from "../../requests/UserRequests";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
export default function Profile() {
    const [profilePic, setProfilePic] = useState();
    useEffect(() => {
        getUserProfilePic("4user", (response) => {
            setProfilePic(response);
        });
    }, []);
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={{
                    uri: "https://live-app-rest-api.herokuapp.com/users/image/opsman4",
                }}
            ></Image>
            <Text>Name Surname</Text>
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
