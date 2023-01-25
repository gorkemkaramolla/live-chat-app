import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getCurrentUser} from '../../../requests/UserRequest';
import UserNameLayout from '../Users/UserNameLayout';
import {ROUTES} from '../../../constants';
export default function MessageBox({item, navigation}) {
  const [userInformations, setUserInformations] = useState({
    username: '',
    createdAt: '',
    profilePic: {},
    message: '',
  });
  const [loading, setLoading] = useState(true);
  function getMessageTime(messageDate) {
    console.log(messageDate);
    return '1hour';
  }
  useEffect(() => {
    async function fetchData() {
      await getCurrentUser(item.id, response => {
        setUserInformations({
          ...userInformations,
          createdAt: getMessageTime(item.messageDate),
          username: response.username,
          profilePic: response.profilePicture.file,
          message: item.message,
        });
        setLoading(false);
      });
    }
    fetchData();
  }, [item.id]);

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  } else {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(ROUTES.SENDMESSAGE, {
            picture: userInformations.profilePic,
          });
        }}>
        <View key={item.id}>
          <UserNameLayout
            styles={styles}
            post={userInformations}></UserNameLayout>
        </View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  userInfo: {
    maxWidth: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    minHeight: '5%',

    margin: '2%',
  },
  userInfoCurrent: {
    maxWidth: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    minHeight: '5%',

    margin: '2%',
  },
  userProfileLogo: {
    width: 48,
    height: 48,
    marginTop: '2%',
    marginLeft: '1%',
    marginRight: '4%',
  },
  userText: {
    marginTop: '1%',
    textAlign: 'left',
  },
  text: {
    fontSize: 13,
    color: '#241616',
  },
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
