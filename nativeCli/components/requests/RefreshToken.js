import {Buffer} from 'buffer';
import axios from 'axios';
import {API_ROOT} from '@env';
const setAccessToken = async value => {
  try {
    await AsyncStorage.setItem('@access_token', value);
  } catch (e) {}
};
import AsyncStorage from '@react-native-async-storage/async-storage';
const getRefreshToken = async callback => {
  await axios
    .get(`${API_ROOT}users/refresh`, {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem('@refresh_token')}`,
      },
    })
    .then(response => {
      callback(response.data);
    })
    .catch(e => {});
};
const getAccessToken = async callback => {
  try {
    const token = await AsyncStorage.getItem('@access_token');

    let base64Url = token.split('.')[1]; // token you get
    let base64 = base64Url.replace('-', '+').replace('_', '/');
    let decodedData = JSON.parse(
      Buffer.from(base64, 'base64').toString('binary'),
    );
    var date = new Date();

    if (decodedData.exp * 1000 >= date.valueOf()) {
      console.debug('old access Token');
      callback(token);
    } else {
      getRefreshToken(response => {
        callback(response.access_token);
      });
    }
  } catch (err) {
    console.debug('getAccessToken' + err);
  }
};
export {getAccessToken};
