import {View, Text, RefreshControl, FlatList} from 'react-native';
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
export default function Home({navigation}) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getPageablePost(0, response => {
      console.debug(response);
      setPosts(response);
      setLoading(false);
    });
  }, []);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setLoading(true);
    try {
      await getPageablePost(0, res => {
        setPosts(res);
        setLoading(false);
      });
    } catch (error) {
      console.error(error);
    } finally {
      setRefreshing(false);
    }
  }, []);
  return (
    <SafeAreaView>
      {loading ? (
        <Text style={{alignSelf: 'center', marginTop: 200}}>Loading....</Text>
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
