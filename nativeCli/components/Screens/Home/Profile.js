import {
  View,
  SafeAreaView,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
} from 'react-native';
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
  const getUsername = async () => {
    const userName = await AsyncStorage.getItem('@current_user');
    if (userName !== null || userName !== '' || userName !== undefined) {
      setUsername(userName);
      getCurrentUser(username, response => {
        setUserInformations(prev => ({
          ...prev,
          username: response.username,
          email: response.email,
          firstname: response.firstname,
          lastname: response.lastname,
          gender: response.gender,
        }));
      });
    }
  };

  useEffect(() => {
    getUsername();
  }, [AsyncStorage.getItem('@current_user')]);
  return (
    <SafeAreaView>
      <Text>{userInformations.username}</Text>
      <Text>{userInformations.firstname}</Text>
      <Text>{userInformations.lastname}</Text>
      <Text>{userInformations.gender}</Text>
      <Text>{userInformations.email}</Text>
    </SafeAreaView>
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
