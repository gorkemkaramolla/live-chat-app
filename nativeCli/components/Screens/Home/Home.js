import React, {useEffect, useState} from 'react';
import {View, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import UserCards from './Users/UserCards';
import {getUsersReq} from '../../requests/UserRequest';
import {StyleSheet} from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const HomeFeed = () => {
  const [users, setUsers] = useState([]);
  const story = () => {
    window.alert('i am a story');
  };
  useEffect(() => {
    console.warn('rendered');
    getUsersReq(1, response => {
      setUsers(response);
    });
  }, []);

  return (
    <ScrollView pagingEnabled style={styles.container}>
      <View style={styles.storyContainer}>
        <Pressable onPress={story}>
          <View style={styles.story}></View>
        </Pressable>
        <Pressable onPress={story}>
          <View style={styles.story}></View>
        </Pressable>
        <Pressable onPress={story}>
          <View style={styles.story}></View>
        </Pressable>
        <Pressable onPress={story}>
          <View style={styles.story}></View>
        </Pressable>
        <Pressable onPress={story}>
          <View style={styles.story}></View>
        </Pressable>
      </View>
      {users.map((user, index) => (
        <View style={styles.view} key={index}>
          <UserCards user={user}></UserCards>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 400,
  },
  storyContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'baseline',
    flexDirection: 'row',
  },
  story: {
    margin: 5,
    borderWidth: 1,
    borderRadius: 50,
    width: 60,
    height: 60,
    backgroundColor: 'white',
  },
});
export default HomeFeed;
