import React from 'react';
import Zucker from '../../../assets/Zuckerberg.jpg';
import Icon from 'react-native-vector-icons/AntDesign';

import {
  SafeAreaView,
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
const HomeFeed = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <ImageBackground style={styles.image} source={Zucker}>
          <Text style={styles.imageTextHeader}>Mark ZuckerBerg</Text>
          <Text style={styles.imageText}>*Son Zamanlarda Aktif</Text>
          <Text style={styles.imageText}>İstanbul şehrinde yaşıyor</Text>
          <Text style={styles.imageText}>55 km</Text>

          <Pressable></Pressable>
        </ImageBackground>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '95%',
    height: '70%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
    borderRadius: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    borderRadius: 20,
    overflow: 'hidden',
    flex: 1,
    justifyContent: 'flex-end',
  },
  imageText: {
    paddingHorizontal: 15,
    paddingVertical: 8,

    color: 'white',
    zIndex: 1,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    textShadowColor: '#403e3d',
    fontFamily: 'Damascus',
    fontSize: 14,
  },
  imageTextHeader: {
    padding: 15,
    fontWeight: 'bold',
    fontSize: 24,
    color: 'white',
    zIndex: 1,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    textShadowColor: '#403e3d',
  },
});
export default HomeFeed;
