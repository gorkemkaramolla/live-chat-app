import {
  View,
  Modal,
  Text,
  Image,
  Platform,
  ImageBackGround,
  Dimensions,
  ImageBackground,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {launchCamera} from 'react-native-image-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import {addPost} from '../../requests/PostRequests';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import gallery from '../../../assets/images/gallery.png';
import camera from '../../../assets/images/camera.png';
import {
  SafeAreaView,
  Pressable,
  TextInput,
  StyleSheet,
  ScrollView,
  PermissionsAndroid,
} from 'react-native';
export default function Post(props) {
  useEffect(() => {}, []);
  const {modalVisible, setModalVisible} = props;
  if (!modalVisible || !setModalVisible) {
    return null;
  }
  const RNFS = require('react-native-fs');
  const [selectedImage, setSelectedImage] = useState();
  const [content, setContent] = useState('');
  let options = {saveToPhotos: true, mediaType: 'photo', quality: 1};
  const sendThePost = async () => {
    const userId = await AsyncStorage.getItem('@current_user_id');
    if (content !== '' || userId !== null) {
      addPost(userId, selectedImage, content, res => {
        console.debug(res);
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
                  <Image
                    style={{width: 48, height: 48}}
                    source={camera}></Image>
                </Pressable>
                <Pressable onPress={openGallery}>
                  <Image
                    style={{width: 48, height: 48}}
                    source={gallery}></Image>
                </Pressable>
              </View>
              {selectedImage && (
                <View style={{top: 10}}>
                  <Pressable
                    onPress={() => {
                      setSelectedImage(null);
                    }}>
                    <Icon style={{fontSize: 24}} name={'close'}></Icon>
                  </Pressable>
                </View>
              )}
              {selectedImage && (
                <View style={{position: 'relative'}}>
                  <Image
                    style={styles.preview}
                    source={{
                      uri: 'data:image/png;base64,' + selectedImage,
                    }}></Image>
                </View>
              )}

              <TextInput
                placeholder="What do you think?"
                multiline={true}
                maxLength={300}
                style={styles.contentInput}
                onChangeText={text => {
                  setContent(text);
                }}></TextInput>
              <Pressable onPress={sendThePost} style={styles.button}>
                <Text style={styles.buttonText}>Send</Text>
              </Pressable>
            </ScrollView>
          </View>
        </Modal>
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
    margin: 20,
    marginTop: 22,
  },

  button: {
    backgroundColor: '#00b8d4',
    margin: 8,
    width: '95%',
    alignSelf: 'center',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  preview: {
    borderRadius: 20,
    margin: 8,
    aspectRatio: 1 * 1,
    alignSelf: 'center',
    width: '95%',
    minHeight: 300,
    resizeMode: 'cover',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
  buttonOpen: {
    height: 50,
    width: 80,
    backgroundColor: '#F194FF',
    color: 'red',
  },
  iconContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: 8,
  },
  icon: {
    fontSize: 24,
    color: 'white',
    backgroundColor: 'black;',
    position: 'absolute',
    zIndex: 1,
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
    width: '90%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#eee',
    borderRadius: 10,
    margin: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  contentInput: {
    textAlign: 'center',
    borderWidth: 1,
    width: '95%',

    alignSelf: 'center',
    borderColor: '#222',
    borderRadius: 8,
    paddingTop: 20,
    paddingBottom: 20,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 4,
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
