import {View, Text} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {ROUTES} from '../../../constants';
import {Link} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
export default function Home({navigation}) {
  return (
    <View style={styles.home}>
      <Link style={styles.linkSearch} to={{screen: ROUTES.SEARCH}}>
        <Icon style={styles.linkSearchIcon} name="ios-search"></Icon>
      </Link>
    </View>
  );
}
const styles = StyleSheet.create({
  home: {
    flex: 1,
    alignItems: 'center',
  },
  linkSearch: {
    alignSelf: 'flex-end',
  },
  linkSearchIcon: {
    fontSize: 24,
  },
});
