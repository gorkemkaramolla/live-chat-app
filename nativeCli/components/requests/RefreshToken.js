import {Buffer} from 'buffer';
import axios from 'axios';
import {API_ROOT} from '@env';
const setAccessToken = async value => {
  try {
    await AsyncStorage.setItem('@access_token', value);
  } catch (e) {}
};
import AsyncStorage from '@react-native-async-storage/async-storage';
import {get} from 'react-native/Libraries/Utilities/PixelRatio';
const getRefreshToken = async (access_token, callback) => {
  await axios
    .get(`${API_ROOT}users/refresh`, {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem('@refresh_token')}`,
      },
    })
    .then(response => {
      callback(response.data);
    })
    .catch(e => {
      console.debug('getCurrentUser error ' + e);
    });
};
const getAccessToken = async callback => {
  try {
    await AsyncStorage.getItem('@access_token')
      .then(token => {
        let base64Url = token.split('.')[1]; // token you get
        let base64 = base64Url.replace('-', '+').replace('_', '/');
        let decodedData = JSON.parse(
          Buffer.from(base64, 'base64').toString('binary'),
        );
        var date = new Date();
        console.debug('old exp: ' + decodedData.exp * 1000);
        console.debug('newdate: ' + date.valueOf());
        if (decodedData.exp * 1000 >= date.valueOf()) {
          console.debug('old access Token');
          return callback(token);
        } else {
          getRefreshToken(token, response => {
            console.debug('new access Token');
            return callback(response.access_token);
          });
        }
      })
      .catch(err => console.debug('catch error ' + err));
  } catch (err) {
    console.debug('getAccessToken' + err);
  }
};
export {getAccessToken};
