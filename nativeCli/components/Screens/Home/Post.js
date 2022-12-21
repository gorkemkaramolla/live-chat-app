import {
  View,
  Modal,
  Text,
  Platform,
  ImageBackGround,
  Dimensions,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import {launchCamera} from 'react-native-image-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import {addPost} from '../../requests/PostRequests';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  SafeAreaView,
  Pressable,
  TextInput,
  StyleSheet,
  ScrollView,
  PermissionsAndroid,
} from 'react-native';
export default function Post() {
  const RNFS = require('react-native-fs');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const [content, setContent] = useState('');
  let options = {saveToPhotos: true, mediaType: 'photo', quality: 0.01};
  const sendThePost = async () => {
    const userId = await AsyncStorage.getItem('@current_user_id');
    if (content !== '' && userId !== null) {
      addPost(userId, selectedImage, content, res => {
        console.debug(res);
        alert('Successfully Posted');
        setContent('');
        setSelectedImage(null);
        setModalVisible(false);
      });
    } else {
      alert("Content can't be null");
    }
  };
  const openGallery = async () => {
    const result = launchImageLibrary(options)
      .then(res => {
        RNFS.readFile(res.assets[0].uri, 'base64')
          .then(response => {
            setSelectedImage(response);
          })
          .catch(e => {
            console.debug(e);
          });
      })
      .catch(e => {
        console.debug(e);
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
        })
        .catch(e => console.debug(e));
    });
  };
  return (
    <SafeAreaView>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <ScrollView style={styles.modalView}>
              <Pressable
                style={styles.buttonClose}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>
                  <Icon name="arrow-back-ios" style={{fontSize: 24}}></Icon>
                </Text>
              </Pressable>

              <View style={styles.camIcons}>
                <Pressable onPress={openCamera}>
                  <Icon
                    style={{
                      fontSize: 48,
                    }}
                    name={'add-a-photo'}></Icon>
                </Pressable>
                <Pressable onPress={openGallery}>
                  <Icon
                    style={{
                      fontSize: 48,
                    }}
                    name={'add-photo-alternate'}></Icon>
                </Pressable>
              </View>
              {selectedImage && (
                <ImageBackground
                  style={styles.preview}
                  source={{
                    uri: 'data:image/png;base64,' + selectedImage,
                  }}>
                  <Pressable
                    onPress={() => {
                      setSelectedImage(null);
                    }}>
                    <Icon
                      style={{
                        fontSize: 48,
                      }}
                      name={'close'}></Icon>
                  </Pressable>
                </ImageBackground>
              )}
              <TextInput
                placeholder="What do you think?"
                multiline={true}
                style={styles.contentInput}
                onChangeText={text => {
                  setContent(text);
                }}></TextInput>
              <Pressable style={styles.postButton} onPress={sendThePost}>
                <Text>Post oluştur</Text>
              </Pressable>
            </ScrollView>
          </View>
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.textStyle}>+</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    height: 50,
    width: 80,
    backgroundColor: '#F194FF',
    color: 'red',
  },
  buttonClose: {
    borderRadius: 0,
    margin: '3%',
    alignSelf: 'flex-start',
  },
  textStyle: {
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    width: windowWidth,
    height: windowHeight,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  camIcons: {
    maxHeight: '50%',
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  contentInput: {
    marginTop: 10,
    borderColor: 'lightblue',
    color: 'red',
    borderWidth: 1,

    width: '100%',
  },
  preview: {
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 24,
    backgroundColor: 'white',
    aspectRatio: 1 * 1,
    width: '100%',
    minHeight: 300,
    resizeMode: 'cover',
  },
  postButton: {
    alignSelf: 'flex-end',
    borderWidth: 1,
    borderColor: 'lightblue',
    width: 90,
    height: 50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
