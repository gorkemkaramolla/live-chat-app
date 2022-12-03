import axios from 'axios';

const registerRequest = async (email, username, password, callback) => {
  await axios
    .post('https://live-app-rest-api.herokuapp.com/users/signup', {
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
const getUsersReq = (page, callback) => {
  axios
    .get(`https://live-app-rest-api.herokuapp.com/users/${page}`)
    .then(response => {
      callback(response.data);
    })
    .catch(err => {
      console.error(err);
    });
};
const getUserProfilePic = (username, callback) => {
  axios
    .get(`https://live-app-rest-api.herokuapp.com/users/image/${username}`)
    .then(response => {
      callback(response.data);
    })
    .catch(err => {
      console.error(err);
    });
};
export {registerRequest, getUsersReq, getUserProfilePic};
