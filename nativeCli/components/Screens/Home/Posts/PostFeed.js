import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
export default function PostFeed() {
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.userinfo}>
          <Text>Time</Text>
          <Text>Name surname</Text>
        </View>
        <View style={styles.label}></View>
        <Text style={styles.comment}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro est
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: 'red',
    minWidth: '90%',
    maxHeight: '95%',
  },
  label: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 24,
    backgroundColor: 'white',
    minHeight: '60%',
    minWidth: '95%',
    maxWidth: '55%',
  },
  comment: {
    textAlign: 'center',
    fontSize: 24,
    backgroundColor: 'white',
    maxHeight: '30%',
    maxWidth: '90%',
  },
  userinfo: {
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'row',
    maxHeight: '5%',
    maxWidth: '95%',
    minWidth: '80%',
    marginBottom: 15,
    backgroundColor: 'gray',
  },
});
