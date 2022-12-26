import {
  View,
  Alert,
  Modal,
  SafeAreaView,
  Text,
  Pressable,
  TextInput,
  StatusBar,
  SectionList,
  FlatList,
  RefreshControl,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

import React, {useEffect, useState, useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getCurrentUser, updateUser} from '../../requests/UserRequest';
import {ROUTES} from '../../constants';
import {getUsersPost} from '../../requests/PostRequests';
import PostFeed from './Posts/PostFeed';
const DATA = [
  {
    data: ['Posts', 'Reels', 'Liked'],
  },
];
const GENDERS = ['Female', 'Male', 'Other'];
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

const Profile = ({navigation, route}) => {
  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);
  const [posts, setPosts] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [userId, setUserId] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const {height, width} = Dimensions.get('window');
  const [userInformations, setUserInformations] = useState({
    username: '',
    email: '',
    firstname: '',
    lastname: '',
    gender: '',
    profilePicture: null,
  });
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await getUsersPost(
        await AsyncStorage.getItem('@current_user_id'),
        res => {
          setPosts(res);
          setRefreshing(false);
        },
      );
    } catch (error) {
      console.error(error);
    }
  }, []);
  useEffect(() => {
    const getUsersPostsAsync = async () => {
      getUsersPost(await AsyncStorage.getItem('@current_user_id'), response => {
        console.debug('profile useEffect');
        setPosts(response);
        setLoading(false);
      });
    };
    getUsersPostsAsync();
  }, []);
  useEffect(() => {
    async function getUser() {
      const userId = await AsyncStorage.getItem('@current_user_id');
      setUserId(userId);
      if (userId) {
        getCurrentUser(userId, response => {
          setUserInformations({
            username: response.username,
            email: response.email,
            firstname: response.firstname,
            lastname: response.lastname,
            gender: response.gender,
            profilePicture: response.profilePicture,
          });
        });
      }
    }
    getUser();
  }, []);

  const logout = async () => {
    const userId = await AsyncStorage.getItem('@current_user_id');
    removeFew = async () => {
      const keys = ['@access_token', '@current_user', '@current_user_id'];
      try {
        await AsyncStorage.multiRemove(keys);
        console.debug(
          'Application starts keys are removed all keys exist : ' +
            (await AsyncStorage.getAllKeys()),
        );
      } catch (e) {
        // remove error
      }
    };
    if (userId !== null || userId !== '' || userId !== undefined) {
      removeFew();
      setModalVisible(false);
      navigation.navigate(ROUTES.LOGIN);
      navigation.reset({
        index: 0,
        routes: [{name: ROUTES.LOGIN}],
      });
    }
  };
  return (
    <SafeAreaView
      style={{
        ...styles.container,
        backgroundColor: route.params.backgroundColor,
      }}>
      <Pressable
        style={{alignSelf: 'flex-end', marginRight: 10}}
        onPress={() => setModalVisible(true)}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/2099/2099058.png',
          }}
          style={{width: 30, height: 30}}
        />
      </Pressable>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Settings</Text>
            <Text>First Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="First Name"
              defaultValue={userInformations.firstname}
              onChangeText={text => setFirstName(text.trim())}></TextInput>
            <Text>Last Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Last Name"
              defaultValue={userInformations.lastname}
              onChangeText={text => setLastName(text.trim())}></TextInput>
            <Text>Gender</Text>
            <SelectDropdown
              data={GENDERS}
              buttonStyle={{
                borderRadius: 4,

                width: 160,
                height: 30,
              }}
              dropdownStyle={{borderRadius: 4, width: 160}}
              buttonTextStyle={{fontSize: 18}}
              rowTextStyle={{fontSize: 18}}
              defaultButtonText={
                userInformations.gender
                  ? userInformations.gender
                  : 'Select a gender'
              }
              onSelect={(selectedItem, index) => {
                setGender(selectedItem.toLowerCase());
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item;
              }}
            />
            <Pressable
              style={{...styles.button, ...styles.buttonClose, marginTop: 10}}
              onPress={() => {
                console.log(userId);
                updateUser(userId, firstName, lastName, gender, res => {
                  setUserInformations(prev => ({
                    ...prev,
                    firstname: firstName,
                    lastname: lastName,
                    gender: gender,
                  }));
                  console.log(res);
                });
              }}>
              <Text style={styles.textStyle}>Update Credentials</Text>
            </Pressable>
            <Pressable onPress={logout}>
              <Text>Logout</Text>
            </Pressable>
            <Pressable
              style={{
                ...styles.button,
                ...styles.buttonClose,
                marginTop: height / 3,
                marginLeft: width / 2 - 50,
                backgroundColor: 'red',
                padding: 10,
                paddingHorizontal: 13,
              }}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>X</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View>
          <Image
            style={{width: 100, height: 100, alignSelf: 'center'}}
            source={{
              uri:
                'data:image/png;base64,' +
                userInformations.profilePicture?.file?.data,
            }}
          />
          <Text
            style={{fontSize: 24, paddingVertical: 10, alignSelf: 'center'}}>
            {userInformations.username}
          </Text>
          <View style={{width: '90%', alignSelf: 'center'}}>
            <Text style={{}}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
              nesciunt labore consequatur quos ad placeat exercitationem nemo
              sequi ita
            </Text>
          </View>
          <View style={{fontSize: 20, paddingBottom: 10}}>
            <Text>
              {userInformations?.firstname + ' ' + userInformations?.lastname}
            </Text>
          </View>
        </View>
      </View>
      <SafeAreaView style={{paddingBottom: 150}}>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            data={posts}
            renderItem={({item: post}) => (
              <PostFeed key={post.postId} post={post} />
            )}
            keyExtractor={post => post.postId}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )}
      </SafeAreaView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // paddingTop: StatusBar.currentHeight,
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(52,120,246)',
    borderRadius: 5,
  },

  title: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    color: '#fff',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '100%',
    height: '80%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textInput: {
    // borderColor: 'rgb(52, 120, 246)',
    // borderWidth: 1,
    borderRadius: 4,
    fontSize: 18,
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 4,
    backgroundColor: 'rgb(239, 239,239)',
  },
});

export default Profile;
