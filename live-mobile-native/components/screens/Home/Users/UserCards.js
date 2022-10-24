import React from "react";
import Zucker from "../../../../assets/Zuckerberg.jpg";
import Icon from "react-native-vector-icons/AntDesign";
import { useState } from "react";
import {
    Button,
    SafeAreaView,
    View,
    Text,
    Image,
    ImageBackground,
    StyleSheet,
} from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
const UserCards = ({ user }) => {
    const [cardActive, setCardActive] = useState(false);
    const cardShown = () => {
        setCardActive(!cardActive);
    };
    return (
        <>
            {cardActive === false ? (
                <Pressable onPress={cardShown} style={styles.card}>
                    <ImageBackground
                        style={styles.image}
                        source={{
                            uri: `https://live-app-rest-api.herokuapp.com/users/image/${user.username}`,
                        }}
                    >
                        <Text style={styles.imageTextHeader}>{user.email}</Text>
                        <Text style={styles.imageText}>
                            *Son Zamanlarda Aktif
                        </Text>
                        <Text style={styles.imageText}>
                            İstanbul şehrinde yaşiyor
                        </Text>
                        <Text style={styles.imageText}>55 km</Text>
                    </ImageBackground>
                </Pressable>
            ) : (
                <Pressable style={styles.profileNavCard} onPress={cardShown}>
                    <ImageBackground
                        source={{
                            uri: `https://live-app-rest-api.herokuapp.com/users/image/${user.username}`,
                        }}
                        style={styles.profileNav}
                    >
                        <Pressable
                            onPress={cardShown}
                            style={styles.profileNavButtons}
                        >
                            <Text
                                onPress={() => {
                                    window.alert("hello");
                                }}
                                style={styles.imageText}
                            >
                                Message
                            </Text>
                        </Pressable>

                        <Pressable
                            onPress={cardShown}
                            style={styles.profileNavButtons}
                        >
                            <Text
                                onPress={() => {
                                    window.alert("hi");
                                }}
                                style={styles.imageText}
                            >
                                Visit
                            </Text>
                        </Pressable>
                    </ImageBackground>
                </Pressable>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        width: "95%",
        height: "70%",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
        borderRadius: 20,
    },
    profileNavCard: {
        backgroundColor: "black",
        width: "95%",
        height: "70%",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
        borderRadius: 20,
    },
    image: {
        width: "100%",
        height: "100%",
        alignSelf: "center",
        borderRadius: 20,
        overflow: "hidden",
        flex: 1,
        justifyContent: "flex-end",
    },
    profileNav: {
        width: "100%",
        height: "100%",
        alignSelf: "center",
        borderRadius: 20,
        overflow: "hidden",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    profileNavButtons: {
        borderColor: "white",
        borderRightWidth: 0.2,
        backgroundColor: "rgba(0,0,0,0.5)",

        width: "50%",
        height: "100%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    profileNavButtonText: {
        color: "white",
    },
    imageText: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        color: "white",
        zIndex: 1,
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
        textShadowColor: "#403e3d",
        fontSize: 14,
    },
    imageTextHeader: {
        padding: 15,
        fontWeight: "bold",
        fontSize: 24,
        color: "white",
        zIndex: 1,
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
        textShadowColor: "#403e3d",
    },
});
export default UserCards;
