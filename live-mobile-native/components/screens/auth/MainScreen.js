import { useEffect, useState } from "react";
import React from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { registerRequest } from "../../requests/UserRequests";
import { ROUTES } from "../../constants";

const MainScreen = ({ navigation }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [responseData, setResponseData] = useState("asd");
    useEffect(() => {
        console.debug(responseData);
    }, [responseData]);
    const handleUsername = (text) => {
        setUsername(text);
    };
    const handlePw = (text) => {
        setPassword(text);
    };
    return (
        <View style={styles.container}>
            {loading === true ? <Text>Girişe yönlendiriyorsunuz</Text> : null}
            <View>
                <TextInput
                    onChangeText={handleUsername}
                    value={username}
                    placeholder="username"
                    style={styles.textInput}
                ></TextInput>
                <TextInput
                    secureTextEntry
                    onChangeText={handlePw}
                    value={password}
                    placeholder="password"
                    style={styles.textInput}
                ></TextInput>
                <Pressable
                    onPress={() => {
                        setLoading(true);
                        registerRequest(username, password, (response) => {
                            setResponseData(response);
                        });

                        setUsername("");
                        setPassword("");

                        setTimeout(() => {
                            navigation.navigate(ROUTES.LOGIN, {
                                name: "gorkem",
                            });
                            setLoading(false);
                        }, 3000);
                    }}
                    title="button"
                    style={styles.button}
                >
                    <Text style={styles.text}>Gönder</Text>
                </Pressable>
                <Pressable onPress={() => navigation.navigate(ROUTES.LOGIN)}>
                    <Text>Giriş Yapmak İçin Tıkla</Text>
                </Pressable>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 2,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
    },
    textInput: {
        padding: 10,
        margin: 10,
        borderColor: "gray",
        borderWidth: 1,
        width: 300,
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: "black",
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: "white",
    },
    icon: {
        justifyContent: "flex-end",
        textAlign: "left",
    },
});
export default MainScreen;
