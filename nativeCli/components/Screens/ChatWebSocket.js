import React, {useEffect, useState} from 'react';
import {over} from 'stompjs';
import KeyboardListener from 'react-native-keyboard-listener';
import Icon from 'react-native-vector-icons/Ionicons';
import SockJS from 'sockjs-client';
import {Dimensions, Keyboard, TouchableWithoutFeedback} from 'react-native';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  Pressable,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAvoidingView} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
var stompClient = null;

const ChatWebSocket = () => {
  const [privateChats, setPrivateChats] = useState(new Map());
  const [publicChats, setPublicChats] = useState([]);
  const [tab, setTab] = useState('CHATROOM');
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [userData, setUserData] = useState({
    userId: '',
    receiverId: '',
    connected: false,
    message: '',
  });
  const handleKeyboardShow = event => {
    setKeyboardOpen(true);
    setKeyboardHeight(event.endCoordinates.height);
  };

  const handleKeyboardHide = () => {
    setKeyboardOpen(false);
  };

  Keyboard.addListener('keyboardDidShow', handleKeyboardShow);
  Keyboard.addListener('keyboardDidHide', handleKeyboardHide);

  useEffect(() => {
    console.debug('*********************************publicChat' + publicChats);
    console.debug('*********************************userId' + userData.userId);
    const getUserId = async () => {
      AsyncStorage.getItem('@current_user_id')
        .then(res => {
          setUserData({...userData, userId: res});
        })
        .catch(err => {
          console.debug(err);
        });
    };
    getUserId();
  }, []);

  useEffect(() => {
    if (userData.userId) {
      connect();
    }
  }, [userData.userId]);

  const connect = () => {
    let Sock = new SockJS('http://localhost:8080/ws');
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    setUserData({...userData, connected: true});
    stompClient.subscribe('/chatroom/public', onMessageReceived);
    stompClient.subscribe(
      '/user/' + userData.userId + '/private',
      onPrivateMessage,
    );
  };

  const userJoin = () => {
    var chatMessage = {
      senderId: userData.userId,
      status: 'JOIN',
    };
    stompClient.send('/app/message', {}, JSON.stringify(chatMessage));
  };

  const onMessageReceived = payload => {
    var payloadData = JSON.parse(payload.body);
    switch (payloadData.status) {
      case 'JOIN':
        if (!privateChats.get(payloadData.senderName)) {
          privateChats.set(payloadData.senderName, []);
          setPrivateChats(new Map(privateChats));
        }
        break;
      case 'MESSAGE':
        console.debug('OnMessageRecieved payload' + JSON.parse(payload.body));
        publicChats.push(payloadData);
        setPublicChats([...publicChats]);
        break;
    }
  };

  const onPrivateMessage = payload => {
    var payloadData = JSON.parse(payload.body);
    if (privateChats.get(payloadData.senderName)) {
      privateChats.get(payloadData.senderName).push(payloadData);
      setPrivateChats(new Map(privateChats));
    } else {
      let list = [];
      list.push(payloadData);
      privateChats.set(payloadData.senderName, list);
      setPrivateChats(new Map(privateChats));
    }
  };

  const onError = err => {
    console.log(err);
  };

  const sendValue = () => {
    setDisabled(true);
    if (stompClient) {
      console.debug(userData.userId + 'ALDSŞALSDŞALŞDLASŞDLASDİŞASLDAİ');
      var chatMessage = {
        senderId: userData.userId,
        message: userData.message,
        status: 'MESSAGE',
      };
      if (chatMessage.message !== '') {
        stompClient.send('/app/message', {}, JSON.stringify(chatMessage));
        setUserData({...userData, message: ''});
        setDisabled(false);
      } else {
        alert('Cant send empty');
        setDisabled(false);
      }
    }
  };

  const sendPrivateValue = () => {
    if (stompClient) {
      var chatMessage = {
        senderId: userData.userId,
        receiverId: tab,
        message: userData.message,
        status: 'MESSAGE',
      };

      if (userData.userId !== tab) {
        privateChats.get(tab).push(chatMessage);
        setPrivateChats(new Map(privateChats));
      }
      stompClient.send('/app/private-message', {}, JSON.stringify(chatMessage));
      setUserData({...userData, message: ''});
    }
  };

  const registerUser = () => {
    connect();
  };

  return (
    <View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <FlatList
          style={{height: '90%'}}
          data={publicChats}
          renderItem={({item: item}) => (
            <View key={item.id}>
              <Text style={styles.text}>{item.id}</Text>
              <View>
                <Text style={styles.text}>{item.message}</Text>
              </View>
              {item.senderName === userData.userId && (
                <View>
                  <Text style={styles.text}>{item.senderName}</Text>
                </View>
              )}
            </View>
          )}
          keyExtractor={item => item.id}
        />

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <TextInput
              placeholderTextColor="#999"
              selectionColor="#333"
              value={userData.message}
              placeholder="Type a message"
              style={styles.textInput}
              onChangeText={value => {
                setUserData({...userData, message: value});
              }}
            />
            <TouchableOpacity
              disabled={disabled}
              style={{
                ...styles.sendButton,
              }}
              onPress={sendValue}>
              <Text style={styles.sendButtonText}>
                <Icon
                  style={{fontSize: 24, color: disabled ? '#ccc' : 'white'}}
                  name="send-outline"></Icon>
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  text: {
    color: 'red',
  },

  inner: {
    width: '100%',
    alignSelf: 'center',
    paddingTop: 0,
    flexDirection: 'row',
  },
  textInput: {
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    flex: 1,
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    backgroundColor: 'white',
  },
  sendButton: {
    flex: 0.1,
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'flex-end',
    justifyContent: 'center',
    color: 'white',
  },
  sendButtonText: {
    color: '#ffffff',
    fontSize: 18,
  },
});

export default ChatWebSocket;
