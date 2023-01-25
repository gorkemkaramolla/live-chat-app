import React, {useEffect, useState} from 'react';
import {over} from 'stompjs';
import Icon from 'react-native-vector-icons/Ionicons';
import SockJS from 'sockjs-client';
import {useRef} from 'react';
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
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAvoidingView} from 'react-native';
import UserNameLayout from '../../Users/UserNameLayout';
import SingleMessage from './SingleMessage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
var stompClient = null;

const ChatWebSocket = ({route}) => {
  let flatListRef = useRef(null);

  const [privateChats, setPrivateChats] = useState([]);
  const [publicChats, setPublicChats] = useState([]);
  const [tab, setTab] = useState('63d1ab4b8d73a344bce36129');
  const [disabled, setDisabled] = useState(false);
  const [userData, setUserData] = useState({
    userId: '',
    receiverId: '',
    connected: false,
    message: '',
  });

  useEffect(() => {
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
      console.log(userData.userId);
      connect();
    }
  }, [userData.userId]);

  useEffect(() => {
    flatListRef.current.scrollToEnd({animated: true});
  }, []);
  const connect = () => {
    let Sock = new SockJS(
      `http://192.168.1.101:8080/user/${userData.userId}/private`,
    );

    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    setUserData({...userData, connected: true});
    stompClient.subscribe('/chatroom/public', onMessageReceived);
    stompClient.subscribe(
      '/user/' + userData.userId + '/private',
      onPrivateMessage,
      onMessageReceived,
    );
    userJoin();
  };

  const userJoin = () => {
    var chatMessage = {
      senderId: userData.userId,
      status: 'JOIN',
    };
    stompClient.send('/app/message', {}, JSON.stringify(chatMessage));
  };

  const onMessageReceived = payload => {
    console.log('meessage received');
    var payloadData = JSON.parse(payload.body);
    switch (payloadData.status) {
      case 'JOIN':
        setPrivateChats([...privateChats, payloadData]);
        break;
      case 'MESSAGE':
        console.debug('OnMessageRecieved payload' + JSON.parse(payload.body));
        setPrivateChats([...privateChats, payloadData]);

        break;
    }
  };

  const onPrivateMessage = payload => {
    var payloadData = JSON.parse(payload.body);
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
        receiverId: '63d1ab4b8d73a344bce36129',
        message: userData.message,
        status: 'MESSAGE',
      };

      setPrivateChats([...privateChats, chatMessage]);

      stompClient.send('/app/private-message', {}, JSON.stringify(chatMessage));
      setUserData({...userData, message: ''});
    }
  };

  const registerUser = () => {
    connect();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={'padding'}
        keyboardVerticalOffset={-windowHeight}>
        {
          <FlatList
            onContentSizeChange={() =>
              flatListRef.current.scrollToEnd({animated: true})
            }
            showsVerticalScrollIndicator={false}
            ref={flatListRef}
            contentContainerStyle={{}}
            style={{
              width: '100%',
            }}
            data={privateChats}
            renderItem={({item}) => (
              <SingleMessage
                userId={userData.userId}
                picture={route.params.picture.data}
                styles={styles}
                messageInfo={item}></SingleMessage>
              // <View key={item.id}>
              //   <Text style={styles.text}>{item.id}</Text>
              //   <View>
              //     <Text style={styles.text}>{item.message}</Text>
              //   </View>
              //   {item.senderName === userData.userId && (
              //     <View>
              //       <Text style={styles.text}>{item.senderName}</Text>
              //     </View>
              //   )}
              // </View>
            )}
            keyExtractor={item => item.length}
          />
        }
        <View style={styles.inner}>
          <TextInput
            placeholderTextColor="#999"
            selectionColor="#333"
            value={userData.message}
            placeholder="Message"
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
            onPress={sendPrivateValue}>
            <Text style={styles.sendButtonText}>
              <Icon
                style={{
                  fontSize: 24,
                  color: disabled ? '#ccc' : 'white',
                  alignSelf: 'center',
                }}
                name="send-outline"></Icon>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  text: {
    color: 'red',
    width: '100%',
  },

  inner: {
    width: '100%',
    bottom: 0,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  textInput: {
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 25,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    width: '90%',
    backgroundColor: 'white',
    marginBottom: '2%',
  },
  sendButton: {
    backgroundColor: '#0078fe',
    color: 'white',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '2%',
    borderRadius: 25,
    padding: 10,
    width: '10%',

    color: 'white',
  },
  sendButtonText: {
    fontSize: 18,
  },
  userProfileLogo: {
    width: 48,
    height: 48,
    marginTop: '2%',
    marginLeft: '1%',
    marginRight: '4%',
  },
  userInfoCurrent: {
    maxWidth: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    minHeight: '5%',

    margin: '2%',
  },
});

export default ChatWebSocket;
