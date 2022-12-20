import {
  View,
  SafeAreaView,
  Text,
  Pressable,
  TextInput,
  StatusBar,
  SectionList,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getCurrentUser} from '../../requests/UserRequest';

const DATA = [
  {
    data: ['Posts', 'Reels', 'Liked'],
  },
];

const Item = ({title}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const PostItem = ({style, src}) => (
  <View style={{paddingVertical: 20, paddingHorizontal: 40, ...style}}>
    <Image style={{width: 300, height: 200}} source={src}></Image>
  </View>
);

const Profile = () => {
  const {height, width} = Dimensions.get('window');
  const [userInformations, setUserInformations] = useState({
    username: '',
    email: '',
    firstname: '',
    lastname: '',
    gender: '',
    profilePicture: null,
  });
  useEffect(() => {
    async function getUser() {
      const userId = await AsyncStorage.getItem('@current_user_id');

      if (userId !== null || userId !== '' || userId !== undefined) {
        getCurrentUser(userId, response => {
          setUserInformations(prev => ({
            ...prev,
            username: response.username,
            email: response.email,
            firstname: response.firstname,
            lastname: response.lastname,
            gender: response.gender,
            profilePicture: response.profilePicture,
          }));
        });
      }
    }
    getUser();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
        }}>
        <View style={{padding: 20}}>
          <Text style={{fontSize: 24, paddingVertical: 10}}>
            {userInformations.username}
          </Text>
          <View style={{fontSize: 20, paddingBottom: 10}}>
            <Text>
              {userInformations.firstname + ' ' + userInformations.lastname}
            </Text>
          </View>
          <Pressable
            style={{width: 100, height: 30}}
            onPress={() => alert('helllo')}>
            <Text>Hello</Text>
          </Pressable>
        </View>
        <Image
          style={{width: 100, height: 100}}
          source={{
            uri:
              'data:image/png;base64,' +
              userInformations.profilePicture?.file?.data,
          }}
        />
      </View>

      <SectionList
        sections={DATA}
        horizontal={true}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => <Item title={item} />}
      />
      <SectionList
        style={{
          margin: 20,
          width: '100%',
          display: 'flex',
        }}
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({index}) => {
          if (index === DATA[0].data.length - 1) {
            return (
              <PostItem
                style={{marginBottom: height / 10}}
                src={{
                  uri:
                    'data:image/png;base64,' +
                    userInformations.profilePicture?.file?.data,
                }}
              />
            );
          } else {
            return (
              <PostItem
                src={{
                  uri:
                    'data:image/png;base64,' +
                    userInformations.profilePicture?.file?.data,
                }}
              />
            );
          }
        }}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // paddingTop: StatusBar.currentHeight,
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    backgroundColor: 'rgb(52,120,246)',
    paddingTop: 0,
    padding: 8,
    textAlign: 'center',
    marginHorizontal: 20,
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 18,
    paddingTop: 2,
    padding: 6,
    color: '#fff',
    textAlign: 'center',
    display: 'flex',
  },
});

export default Profile;
