/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Link} from '@react-navigation/native';
import {Dimensions} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import CommentToPost from './Comments/CommentToPost';
import {
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  StyleSheet,
  Pressable,
  Image,
} from 'react-native';
import {ROUTES} from '../../../constants';
import UserNameLayout from '../Users/UserNameLayout';
const windowHeight = Dimensions.get('window').height;

export default function PostFeed({navigation, route, post}) {
  const [liked, setLiked] = useState(false);
  const [CommentMode, setCommentMode] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {}, []);

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <UserNameLayout styles={styles} post={post}></UserNameLayout>
        {post.file !== null ? (
          <ImageBackground
            style={styles.image}
            source={{
              uri: 'data:image/png;base64,' + post.file.data,
            }}
          />
        ) : null}
        <Text style={styles.comment}>{post.content}</Text>
        <Pressable
          onPress={() => {
            window.alert('number of likes is 0');
          }}>
          <Text style={styles.numberLikes}>0 likes</Text>
        </Pressable>
        <View style={styles.btnContainer}>
          <Pressable
            style={styles.btn}
            onPress={() => {
              setLiked(!liked);
            }}>
            <Icon
              style={{...styles.icons, color: liked ? 'crimson' : null}}
              name={'favorite'}
            />
          </Pressable>

          <Pressable style={styles.btn}>
            <Text style={{alignSelf: 'center'}}>
              <Link to={{screen: ROUTES.MAKECOMMENT}}>
                <Icon style={styles.icons} name="question-answer" />
              </Link>
            </Text>
          </Pressable>
          <Pressable style={styles.btn}>
            <Icon style={styles.replyIcon} name="reply" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    margin: 0,
    padding: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    minWidth: '100%',
    marginTop: 5,
    padding: 5,
  },
  container: {
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
    borderBottomRadius: 10,
  },
  image: {
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 24,
    backgroundColor: 'white',
    aspectRatio: 1 * 1,
    width: '100%',
    minHeight: 300,
    resizeMode: 'cover',
  },
  comment: {
    textAlign: 'left',
    paddingLeft: '2%',
    fontSize: 16,
    minWidth: '100%',
    lineHeight: 30,

    color: '#241616',
  },
  numberLikes: {
    fontSize: 12,
    margin: '2%',
  },
  userProfileLogo: {
    width: 48,
    height: 48,
    marginRight: '4%',
    marginBottom: '2%',
  },
  userInfo: {
    maxWidth: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    minHeight: '5%',
    marginTop: 20,

    margin: '2%',
  },
  userText: {
    marginTop: '0%',
    textAlign: 'left',
  },
  text: {
    fontSize: 16,
    color: '#241616',
  },

  btnContainer: {
    flex: 1,

    maxHeight: 40,
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    alignItems: 'center',
    flexDirection: 'row',
  },
  btn: {
    color: 'white',
    minWidth: '30.33333333333%',
    minHeight: 24,
  },
  icons: {
    fontSize: 24,
    alignSelf: 'center',
  },
  likeIcon: {
    fontSize: 24,
    alignSelf: 'center',
  },
  replyIcon: {
    fontSize: 24,
    alignSelf: 'center',
    transform: [{rotateY: '180deg'}],
  },
});
