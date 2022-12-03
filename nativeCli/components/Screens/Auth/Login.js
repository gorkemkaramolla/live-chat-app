import {useEffect, useState} from 'react';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Pressable,
  ScrollView,
} from 'react-native';
import {ROUTES} from '../../constants';
const SecondaryScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [responseData, setResponseData] = useState();
  useEffect(() => {
    console.debug(responseData);
  }, [responseData]);

  const storeData = async value => {
    try {
      await AsyncStorage.setItem('@user', value);
    } catch (e) {
      // saving error
    }
  };
  const handleUsername = text => {
    setUsername(text);
  };
  const handlePw = text => {
    setPassword(text);
  };
  return (
    <View style={styles.container}>
      <Text style={{marginBottom: '15%'}}>L O G I N</Text>

      <View>
        <TextInput
          onChangeText={handleUsername}
          value={username}
          placeholder="username"
          style={styles.textInput}></TextInput>
        <TextInput
          secureTextEntry
          onChangeText={handlePw}
          value={password}
          placeholder="password"
          style={styles.textInput}></TextInput>
        <Pressable
          onPress={() => {
            navigation.navigate(ROUTES.DRAWER);
            storeData(username);
          }}
          title="button"
          style={styles.button}>
          <Text style={styles.text}>Gönder</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate(ROUTES.REGISTER)}>
          <Text style={{alignSelf: 'center'}}>Hesabın yok mu kayıt ol</Text>
        </Pressable>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    margin: 15,
    marginVertical: '20%',
  },
  textInput: {
    padding: 10,
    margin: 20,
    borderColor: 'gray',
    borderWidth: 1,
    minHeight: 50,
    width: 320,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    minWidth: 320,
    alignSelf: 'center',
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    alignSelf: 'center',
    letterSpacing: 0.25,
    color: 'white',
  },
});
export default SecondaryScreen;
