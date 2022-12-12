import {View, Text, Pressable, TextInput, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getCurrentUser} from '../../requests/UserRequest';
export default function Profile() {
  const [username, setUsername] = useState('');
  const [userInformations, setUserInformations] = useState({
    username: '',
    email: '',
    firstname: '',
    lastname: '',
    gender: '',
  });

  useEffect(() => {
    const getUsername = async () => {
      setUsername(await AsyncStorage.getItem('@current_user'));
      getCurrentUser(username, response => {
        console.debug(response);
        setUserInformations(prev => ({
          ...prev,
          username: response.username,
          email: response.email,
          firstname: response.firstname,
          lastname: response.lastname,
          gender: response.gender,
        }));
      });
    };
    getUsername();
  }, [username]);
  return (
    <View>
      <Text>{userInformations.username}</Text>
      {userInformations.firstname === null ? (
        <TextInput
          maxLength={12}
          placeholder="firstname"
          style={styles.textInput}
          autoCapitalize={false}
          autoCorrect={false}
        />
      ) : (
        <Text>baba</Text>
      )}
      {userInformations.lastname === null ? (
        <TextInput
          maxLength={12}
          placeholder="lastname"
          style={styles.textInput}
          autoCapitalize={false}
          autoCorrect={false}
        />
      ) : (
        <Text>baba</Text>
      )}
      {userInformations.gender === null ? (
        <Text>gender +</Text>
      ) : (
        <Text>baba</Text>
      )}
      <Text>{userInformations.email}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  textInput: {
    padding: 3,
    margin: 2,
    borderColor: 'gray',
    borderWidth: 1,
    minHeight: 20,
    width: '40%',
  },
});
