import {View, Text, Image, Pressable, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ROUTES} from '../../../constants';
import {getCurrentUser} from '../../../requests/UserRequest';

export default function UserNameLayout({
  userId,
  picture,
  styles,
  post,
  navigation,
}) {
  return (
    <View style={styles.userInfo}>
      <Image
        style={styles.userProfileLogo}
        source={{uri: 'data:image/png;base64,' + post.profilePic?.data}}
      />

      <View style={styles.userText}>
        <Text style={styles.text}>{post.username}</Text>

        {post.createdAt && <Text style={styles.text}>{post.createdAt}</Text>}
        {post.message && <Text style={styles.text}>{post.message}</Text>}
      </View>
    </View>
  );
}
<Pressable
  style={{borderWidth: 2, height: 200, width: 200, borderColor: 'red'}}
  onPress={() => {
    navigation.navigate(ROUTES.LOGIN);
  }}>
  <Text>asda</Text>
</Pressable>;
