import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {useState} from 'react';
import {API_ROOT} from '@env';

import {
  Button,
  SafeAreaView,
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
const UserCards = ({user}) => {
  const [cardActive, setCardActive] = useState(false);
  const cardShown = () => {
    setCardActive(!cardActive);
  };
  return (
    <>
      {cardActive === false ? (
        <Pressable onPress={cardShown} style={styles.card}>
          <ImageBackground
            style={styles.image}
            source={{
              uri: `${API_ROOT}users/image/${user.userId}`,
            }}>
            <Text style={styles.imageTextHeader}>{user.username}</Text>
            <Text style={styles.imageText}>{user.gender}</Text>
            <Text style={styles.imageText}>{user.email}</Text>
            <Text style={styles.imageText}>{user.firstname}</Text>
          </ImageBackground>
        </Pressable>
      ) : (
        <Pressable style={styles.profileNavCard} onPress={cardShown}>
          <ImageBackground
            source={{
              uri: `${API_ROOT}users/image/${user.userId}`,
            }}
            style={styles.profileNav}>
            <Pressable onPress={cardShown} style={styles.profileNavButtons}>
              <Text
                onPress={() => {
                  window.alert('hello');
                }}
                style={styles.imageText}>
                Message
              </Text>
            </Pressable>

            <Pressable onPress={cardShown} style={styles.profileNavButtons}>
              <Text
                onPress={() => {
                  window.alert('hi');
                }}
                style={styles.imageText}>
                Visit
              </Text>
            </Pressable>
          </ImageBackground>
        </Pressable>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    position: 'absolute',
    width: '100%',
    height: '100%',
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
  profileNavCard: {
    position: 'absolute',
    backgroundColor: 'black',
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
  profileNav: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    borderRadius: 20,
    overflow: 'hidden',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  profileNavButtons: {
    borderColor: 'white',
    borderRightWidth: 0.2,
    backgroundColor: 'rgba(0,0,0,0.5)',

    width: '50%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileNavButtonText: {
    color: 'white',
  },
  imageText: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    color: 'white',
    zIndex: 1,
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1,
    textShadowColor: '#403e3d',
    fontSize: 14,
  },
  imageTextHeader: {
    padding: 15,
    fontWeight: 'bold',
    fontSize: 24,
    color: 'white',
    zIndex: 1,
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1,
    textShadowColor: '#403e3d',
  },
});
export default UserCards;
