import {View, Text} from 'react-native';
import React from 'react';
import {launchCamera} from 'react-native-image-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import {
  SafeAreaView,
  Pressable,
  TextInput,
  StyleSheet,
  PermissionsAndroid,
} from 'react-native';
export default function Message() {
  let options = {saveToPhotos: true, mediaType: 'photo'};

  const openGallery = async () => {
    const result = launchImageLibrary(options);
  };
  const openCamera = async () => {
    const result = await launchCamera();
    console.debug(result);
  };
  return (
    <View>
      <Pressable onPress={openCamera}>
        <Text>open camera</Text>
      </Pressable>
      <Pressable onPress={openGallery}>
        <Text>open gallery</Text>
      </Pressable>
    </View>
  );
}
