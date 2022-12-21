import {View, Text, Platform, Image} from 'react-native';
import React, {useState} from 'react';
import {launchCamera} from 'react-native-image-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import {addPost} from '../../requests/PostRequests';
import {
  SafeAreaView,
  Pressable,
  TextInput,
  StyleSheet,
  PermissionsAndroid,
} from 'react-native';
export default function Post() {
  const RNFS = require('react-native-fs');

  const [selectedImage, setSelectedImage] = useState();
  let options = {saveToPhotos: true, mediaType: 'photo', quality: 0.01};

  const openGallery = async () => {
    const result = launchImageLibrary(options).then(res => {
      RNFS.readFile(res.assets[0].uri, 'base64')
        .then(response => {
          setSelectedImage(response);
        })
        .catch(e => {
          console.debug(e);
        });
    });
  };
  const openCamera = async () => {
    const result = await launchCamera(options).then(res => {
      RNFS.readFile(res.assets[0].uri, 'base64')
        .then(response => {
          //Requeste bakıp parametreleri düzenle
          addPost(response, res => {
            console.debug('response addpost' + res);
          });
        })
        .catch(e => {
          console.debug(e);
        });
    });
  };
  return (
    <SafeAreaView>
      {selectedImage && (
        <Image
          style={{width: 200, height: 200}}
          source={{
            uri: 'data:image/png;base64,' + selectedImage,
          }}></Image>
      )}
      <TextInput></TextInput>
      <Pressable>
        <Text>Post oluştur Butonu</Text>
      </Pressable>
      <Pressable onPress={openCamera}>
        <Text>open camera</Text>
      </Pressable>
      <Pressable onPress={openGallery}>
        <Text>open gallery</Text>
      </Pressable>
    </SafeAreaView>
  );
}
