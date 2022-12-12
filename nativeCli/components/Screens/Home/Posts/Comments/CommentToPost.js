import {Text, View} from 'react-native';
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
export default class CommentToPost extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>CommentToPost</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    opacity: 0.5,
    backgroundColor: 'red',
    width: '100%',
    height: '100%',
  },
});
