import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import UserCards from '../Users/UserCards';
import {getUsersReq} from '../../../requests/UserRequest';
import {StyleSheet} from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const HomeFeed = () => {
  const [paging, setPaging] = useState(0);

  const [users, setUsers] = useState([]);
  const story = () => {
    window.alert('i am a story');
  };

  useEffect(() => {
    getUsersReq(0, response => {
      setUsers(response);
    });
  }, []);

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom / 1000
    );
  };
  return (
    <ScrollView
      style={styles.container}
      onScroll={({nativeEvent}) => {
        if (isCloseToBottom(nativeEvent)) {
          setTimeout(() => {
            setPaging(prev => prev + 1);
          }, 3000);
        }
      }}
      scrollEventThrottle={600}>
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
      <Text>Loading...</Text>
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
