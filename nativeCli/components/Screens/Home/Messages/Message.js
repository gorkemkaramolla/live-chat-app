import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Pressable,
} from 'react-native';
import ChatWebSocket from './MessageSending/ChatWebSocket';
import KEyboardt from '../../KEyboardt';
import MessageBox from './MessageBox';
import {getCurrentUser} from '../../../requests/UserRequest';
import {ROUTES} from '../../../constants';

const Message = ({navigation, route}) => {
  const [userInformations, setUserInformations] = useState({});

  const [messageList, setMessageList] = useState([
    {
      id: '638dd8aaad0ee737752bff94',
      message: 'Ne yapıyorsun?',
      senderName: 'gorkemkaramolla',
      messageDate: '22 Aralık, 17:59',
    },
    {
      id: '6394cbac5e66002d850342b4',
      message: 'Naber moruk ya bayadır görüşmüyoruz?',
      senderName: 'osman',
      messageDate: '23 Aralık, 17:59',
    },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    setMessageList([...messages, {text: input, isOutgoing: true}]);
    setInput('');
  };

  return (
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

    <View style={{backgroundColor: route.params.backgroundColor}}>
      <FlatList
        style={{height: '90%'}}
        data={messageList}
        renderItem={({item}) => {
          return (
            <MessageBox
              item={item}
              userInformations={userInformations}
              navigation={navigation}
            />
          );
        }}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;

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
  inputContainer: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  input: {
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
export default Message;
