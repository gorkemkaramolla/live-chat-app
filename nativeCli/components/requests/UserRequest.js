import axios from 'axios';
const params = new URLSearchParams();
import {API_ROOT} from '@env';
import qs from 'qs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getAccessToken} from './RefreshToken';

retrieveData = async () => {
  const value = await AsyncStorage.getItem('@access_token');
  return value;
};
const registerRequest = async (email, username, password, callback) => {
  await axios
    .post(`${API_ROOT}users/signup`, {
      username: username,
      password: password,
      email: email,
    })
    .then(response => {
      callback(response.data);
    })
    .catch(err => {
      return err.data;
    });
};

const loginRequest = async (username, password, callback) => {
  const qs = require('qs');
  await axios
    .post(
      `${API_ROOT}users/login`,
      qs.stringify({username: username, password: password}),
      {
        headers: {'content-type': 'application/x-www-form-urlencoded'},
      },
    )
    .then(response => {
      callback(response.data);
    })
    .catch(err => {
      callback(err);
    });
};
//USERS

const getCurrentUser = async (userId, callback) => {
  getAccessToken(async resx => {
    await axios
      .get(`${API_ROOT}users?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${resx}`,
        },
      })
      .then(response => {
        callback(response.data);
      })
      .catch(e => {
        console.debug('getCurrentUser error ' + e);
      });
  });
};
const getUsersReq = async (page, callback) => {
  getAccessToken(async resx => {
    await axios
      .get(`${API_ROOT}users/${page}`, {
        headers: {
          Authorization: `Bearer ${resx},
          )}`,
        },
      })
      .then(response => {
        callback(response.data);
      })
      .catch(err => {
        console.error(err);
      });
  });
};
const getUserProfilePic = async (userId, callback) => {
  getAccessToken(async resx => {
    await axios
      .get(`${API_ROOT}users/image/${userId}`, {
        headers: {
          Authorization: `Bearer ${resx}}`,
        },
      })
      .then(response => {
        callback(response.data);
      })
      .catch(err => {
        console.error(err);
      });
  });
};
//Update User Informations
const updateUser = async (userId, firstname, lastname, gender, callback) => {
  getAccessToken(async resx => {
    await axios
      .put(
        `${API_ROOT}users/update`,
        {
          userId: userId,
          firstname: firstname,
          lastname: lastname,
          gender: gender,
        },
        {
          headers: {
            Authorization: `Bearer ${resx}`,
          },
        },
      )
      .then(response => {
        callback(response.data);
      })
      .catch(err => {
        console.error(err);
      });
  });
};
export {
  registerRequest,
  getUsersReq,
  getUserProfilePic,
  loginRequest,
  getCurrentUser,
  updateUser,
};
