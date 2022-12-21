import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {ROUTES} from '../../../constants';
import {Link} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import PostFeed from '../Posts/PostFeed';
import {ScrollView} from 'react-native-gesture-handler';
import {Dimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getPageablePost} from '../../../requests/PostRequests';
const windowHeight = Dimensions.get('window').height;
const array = [1, 2, 3, 4, 5];
export default function Home({navigation}) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getPageablePost(0, response => {
      setPosts(response);
    });
  }, [posts]);

  return (
    <View>
      <ScrollView contentContainerStyle={{}}>
        <SafeAreaView>
          <View style={styles.home}>
            <Link style={styles.linkSearch} to={{screen: ROUTES.SEARCH}}>
              <Icon style={styles.linkSearchIcon} name="ios-search"></Icon>
            </Link>
            <View style={{paddingBottom: windowHeight / 7}}>
              {posts.map(post => (
                <PostFeed key={post.postId} post={post}></PostFeed>
              ))}
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  home: {
    alignItems: 'center',
  },
  linkSearch: {
    alignSelf: 'flex-end',
    position: 'relative',
  },
  linkSearchIcon: {
    fontSize: 24,
    position: 'relative',
  },
});
