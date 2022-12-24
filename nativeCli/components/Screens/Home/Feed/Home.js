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
import Post from '../Post';
const windowHeight = Dimensions.get('window').height;
export default function Home({navigation}) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getPageablePost(0, response => {
      console.debug('Home useEffect');
      setPosts(response);
      setLoading(false);
    });
  }, []);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await getPageablePost(0, res => {
        setPosts(res);
        setRefreshing(false);
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <SafeAreaView>
      {modalVisible && (
        <Post modalVisible={modalVisible} setModalVisible={setModalVisible} />
      )}
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          display: 'flex',
          justifyContent: 'flex-end',
        }}>
        <Pressable
          onPress={() => {
            setModalVisible(true);
          }}>
          <Icon style={{fontSize: 30}} name="add"></Icon>
        </Pressable>
        <Icon style={{fontSize: 24}} name="search"></Icon>
      </View>

      {loading ? (
        <Text style={{alignSelf: 'center'}}>Loading....</Text>
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
