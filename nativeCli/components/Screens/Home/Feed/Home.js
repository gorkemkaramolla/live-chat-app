import {View, Text, RefreshControl} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
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
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    console.debug('stagechanged');
    getPageablePost(0, response => {
      setPosts(response);
      setLoading(false);
    });
  }, [refreshing]);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  return (
    <View>
      {loading ? (
        <SafeAreaView>
          <Text>Loading....</Text>
        </SafeAreaView>
      ) : (
        <SafeAreaView>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
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
          </ScrollView>
        </SafeAreaView>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },

  home: {
    alignItems: 'center',
  },
  linkSearch: {
    alignSelf: 'flex-end',
    position: 'relative',
  },
  linkSearchIcon: {
    fontSize: 24,
  },
});
