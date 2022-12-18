import axios from 'axios';
const params = new URLSearchParams();
import {API_ROOT} from '@env';
import qs from 'qs';
import AsyncStorage from '@react-native-async-storage/async-storage';
axios.defaults.timeout = 4500;

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

export {getPageablePost};
