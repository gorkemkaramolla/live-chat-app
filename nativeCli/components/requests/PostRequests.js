import axios from 'axios';
const params = new URLSearchParams();
import {API_ROOT} from '@env';
import qs from 'qs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getAccessToken} from './RefreshToken';

const getPageablePost = async (pageable, callback) => {
  getAccessToken(async resx => {
    await axios
      .get(`${API_ROOT}posts/${pageable}`, {
        headers: {
          Authorization: `Bearer ${resx}`,
        },
      })
      .then(response => {
        callback(response.data);
      })
      .catch(err => {
        return err.data;
      });
  });
};
const getUsersPost = async (userId, callback) => {
  getAccessToken(async resx => {
    await axios
      .get(`${API_ROOT}posts?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${resx}`,
        },
      })
      .then(response => {
        callback(response.data);
      })
      .catch(err => {
        return err.data;
      });
  });
};
const addPost = async (userId, file, content, callback) => {
  getAccessToken(async resx => {
    await axios
      .post(
        `${API_ROOT}posts`,
        {
          file: file,

          content: content,
          userId: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${resx}`,
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
  });
};

export {getPageablePost, addPost, getUsersPost};
