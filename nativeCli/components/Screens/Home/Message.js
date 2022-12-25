import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import ChatWebSocket from '../ChatWebSocket';

const Message = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    setMessages([...messages, {text: input, isOutgoing: true}]);
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
    <ChatWebSocket></ChatWebSocket>
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
export default Message;
