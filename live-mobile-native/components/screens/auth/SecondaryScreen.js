import { useEffect, useState } from "react";
import React from "react";
import { registerRequest } from "../../requests/UserRequests";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Pressable,
  ScrollView,
} from "react-native";
import { ROUTES } from "../../constants";
const SecondaryScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [responseData, setResponseData] = useState();
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
      <View>
        <Text>Lütfen Giriş Yapın</Text>
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
          onPress={() => navigation.navigate(ROUTES.DRAWER)}
          title="button"
          style={styles.button}
        >
          <Text style={styles.text}>Gönder</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate(ROUTES.REGISTER)}>
          <Text>Hesabın yok mu kayıt ol</Text>
        </Pressable>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
});
export default SecondaryScreen;
