import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  StyleSheet,
  Pressable,
} from 'react-native';
export default function PostFeed() {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.userinfo}>
          <Text style={styles.text}>Today 8:32 PM</Text>
          <Text style={styles.text}>Clément M.</Text>
        </View>

        <ImageBackground
          style={styles.image}
          source={{
            uri: `https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80`,
          }}
        />
        <Text style={styles.comment}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit, sequi
        </Text>
        <View style={styles.btnContainer}>
          <Pressable style={styles.btn}>
            <Text style={styles.text}>Like</Text>
          </Pressable>
          <Pressable style={styles.btn}>
            <Text style={styles.text}>dislike</Text>
          </Pressable>
          <Pressable style={styles.btn}>
            <Text style={styles.text}>Comment</Text>
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
    maxWidth: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    minWidth: '90%',
    padding: 5,
    margin: 5,
    minHeight: 300,
    maxHeight: 500,
  },
  image: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 24,
    backgroundColor: 'white',
    minHeight: '60%',
    minWidth: '90%',
  },
  comment: {
    textAlign: 'left',
    paddingLeft: 15,
    fontSize: 16,
    minWidth: '90%',
    maxWidth: '90%',
  },

  userinfo: {
    maxWidth: '90%',
    minWidth: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    maxHeight: '5%',
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    alignSelf: 'center',
  },
  btnContainer: {
    flex: 1,
    minWidth: '90%',
    maxWidth: '90%',
    maxHeight: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  btn: {
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
    borderBottomRadius: 10,
    color: 'white',
    minWidth: '30%',
    minHeight: 30,
  },
});
