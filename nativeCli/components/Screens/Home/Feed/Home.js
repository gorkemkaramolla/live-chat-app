import {View, Text} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {ROUTES} from '../../../constants';
import {Link} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import PostFeed from '../Posts/PostFeed';
import {ScrollView} from 'react-native-gesture-handler';

import {Dimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
const windowHeight = Dimensions.get('window').height;
const array = [1, 2, 3, 4, 5];
export default function Home({navigation}) {
  return (
    <View>
      <ScrollView contentContainerStyle={{}}>
        <SafeAreaView>
          <View style={styles.home}>
            <Link style={styles.linkSearch} to={{screen: ROUTES.SEARCH}}>
              <Icon style={styles.linkSearchIcon} name="ios-search"></Icon>
            </Link>
            <View style={{paddingBottom: windowHeight / 2 - 50}}>
              {array.map(idz => (
                <PostFeed key={idz} />
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
