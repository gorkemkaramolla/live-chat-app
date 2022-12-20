import axios from 'axios';
const params = new URLSearchParams();
import {API_ROOT} from '@env';
import qs from 'qs';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getPageablePost = async (pageable, callback) => {
  await axios
    .get(`${API_ROOT}posts/${pageable}`, {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem('@access_token')}`,
      },
    })
    .then(response => {
      callback(response.data);
    })
    .catch(err => {
      return err.data;
    });
};
const getUsersPost = async (userId, callback) => {
  await axios
    .get(`${API_ROOT}posts?userId=${userId}`, {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem('@access_token')}`,
      },
    })
    .then(response => {
      callback(response.data);
    })
    .catch(err => {
      return err.data;
    });
};
const addPost = async (imageData, callback) => {
  await axios
    .post(
      `${API_ROOT}posts`,
      {
        file: imageData,

        content: 'pablo büyük adamdır narcos dizisini izlemelisiniz',
        userId: '6394cbac5e66002d850342b4',
      },
      {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem(
            '@access_token',
          )}`,
          //
        },
      },
    )
    .then(response => {
      console.debug(response.data);
      callback('response data' + response.data);
    })
    .catch(err => {
      console.debug('error' + err);
    });
};

export {getPageablePost, addPost};
