import {View, Text} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {ROUTES} from '../../../constants';
import {Link} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import PostFeed from '../Posts/PostFeed';
export default function Home({navigation}) {
  return (
    <View style={styles.home}>
      <Link style={styles.linkSearch} to={{screen: ROUTES.SEARCH}}>
        <Icon style={styles.linkSearchIcon} name="ios-search"></Icon>
      </Link>
      <View>
        <PostFeed />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  home: {
    flex: 1,
    marginTop: 50,
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
