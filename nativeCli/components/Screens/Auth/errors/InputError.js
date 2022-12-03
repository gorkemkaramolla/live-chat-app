import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

export default function InputError({error, touched}) {
  return (
    <View>
      <Text style={styles.message}>{error}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  message: {
    color: 'red',
    margin: 0,
    padding: 3,
    maxWidth: 350,
    paddingLeft: 20,
  },
});
