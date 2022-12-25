import React, {useEffect, useState} from 'react';
import {over} from 'stompjs';
import KeyboardListener from 'react-native-keyboard-listener';

import SockJS from 'sockjs-client';
import {Dimensions, Keyboard} from 'react-native';
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
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
var stompClient = null;
const ChatWebSocket = () => {
  const [privateChats, setPrivateChats] = useState(new Map());
  const [publicChats, setPublicChats] = useState([]);
  const [tab, setTab] = useState('CHATROOM');
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [userData, setUserData] = useState({
    userId: '',
    receiverId: '',
    connected: false,
    message: '',
  });

  useEffect(() => {
    console.debug();

    const showSubscription = Keyboard.addListener('keyboardDidShow', e => {
      setKeyboardHeight(e.endCoordinates.height);
      setKeyboardOpen(true);
      console.debug('keyboard height' + keyboardHeight);
    });

    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardOpen(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [keyboardHeight]);
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
    let Sock = new SockJS('http://192.168.1.103:8080/ws');
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
    if (stompClient) {
      console.debug(userData.userId + 'ALDSŞALSDŞALŞDLASŞDLASDİŞASLDAİ');
      var chatMessage = {
        senderId: userData.userId,
        message: userData.message,
        status: 'MESSAGE',
      };

      stompClient.send('/app/message', {}, JSON.stringify(chatMessage));
      setUserData({...userData, message: ''});
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
    <SafeAreaView style={{minHeight: windowHeight, backgroundColor: 'red'}}>
      {
        <View>
          <KeyboardListener
            onWillShow={() => {
              setKeyboardOpen(true);
              console.debug(keyboardOpen);
            }}
            onWillHide={() => {
              setKeyboardOpen(false);
            }}
          />
        </View>
        // <SafeAreaView style={styles.container}>
        //   <View style={styles.messagesContainer}>
        //     {messages.map((message, index) => (
        //       <View
        //         key={index}
        //         style={[
        //           styles.messageBubble,
        //           message.isOutgoing
        //             ? styles.outgoingBubble
        //             : styles.incomingBubble,
        //         ]}>
        //         <Text style={styles.messageText}>{message.text}</Text>
        //       </View>
        //     ))}
        //   </View>
        //   <View style={styles.inputContainer}>
        //     <TextInput
        //       style={styles.input}
        //       value={input}
        //       onChangeText={setInput}
        //       placeholder="Type a message..."
        //     />
        //     <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
        //       <Text style={styles.sendButtonText}>Send</Text>
        //     </TouchableOpacity>
        //   </View>
        // </SafeAreaView>
      }
      <View>
        <View></View>
        {tab === 'CHATROOM' ? (
          <View>
            <FlatList
              data={publicChats}
              renderItem={({item: item}) => (
                <View
                  key={item.id}
                  style={[
                    styles.messageBubble,
                    item.senderName === userData.userId
                      ? styles.incomingBubble
                      : styles.outgoingBubble,
                  ]}>
                  {item.senderName !== userData.userId && (
                    <View>
                      <Text>{item.senderName}</Text>
                    </View>
                  )}
                  <View>
                    <Text style={styles.messageText}>{item.message}</Text>
                  </View>
                  {item.senderName === userData.userId && (
                    <View>
                      <Text>{item.senderName}</Text>
                    </View>
                  )}
                </View>
              )}
              keyExtractor={item => item.id}
            />
            <View
              style={{
                ...styles.inputContainer,
                top: keyboardOpen
                  ? windowHeight - (keyboardHeight + 120)
                  : windowHeight - 120,
              }}>
              <TextInput
                value={userData.message}
                style={styles.input}
                onChangeText={value => {
                  setUserData({...userData, message: value});
                }}
                placeholder="Type a message..."
              />
              <TouchableOpacity style={styles.sendButton} onPress={sendValue}>
                <Text style={styles.sendButtonText}>Send</Text>
              </TouchableOpacity>
            </View>
            <View></View>
          </View>
        ) : (
          <View>
            <FlatList
              data={[...privateChats.get(tab)]}
              renderItem={({item}) => (
                <View key={item.id}>
                  {item.senderName !== userData.userId && (
                    <View>
                      <Text>{item.senderName}</Text>
                    </View>
                  )}
                  <View>
                    <Text>{item.message}</Text>
                  </View>
                  {item.senderName === userData.userId && (
                    <View>
                      <Text>{item.senderName}</Text>
                    </View>
                  )}
                </View>
              )}
              keyExtractor={item => item}
            />
            <View>
              <TextInput
                placeholder="enter the message"
                value={userData.message}
                onChangeText={value => {
                  setUserData({...userData, message: value});
                }}
              />
              <Pressable onPress={sendPrivateValue}>
                <Text>send</Text>
              </Pressable>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  messagesContainer: {
    flex: 1,
    padding: 10,
  },
  messageBubble: {
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  outgoingBubble: {
    backgroundColor: '#00b8d4',
    alignSelf: 'flex-end',
  },
  incomingBubble: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
  },
  messageText: {
    color: '#222',
    fontSize: 16,
  },
  senderText: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  inputContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  sendButton: {
    width: 80,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#00b8d4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChatWebSocket;
