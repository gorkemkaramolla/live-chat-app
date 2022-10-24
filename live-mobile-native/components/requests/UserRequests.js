import axios from "axios";

const registerRequest = async (username, password, callback) => {
    await axios
        .post("https://live-app-rest-api.herokuapp.com/users/signup", {
            username: username,
            password: password,
            gender: "asda123asd12sdasd",
            email: "deneme72323322322332",
            password: "asdasasdd12312312asd",
        })
        .then((response) => {
            callback(response.data);
        })
        .catch((err) => {
            return err.data;
        });
};
const getUsersReq = (page, callback) => {
    axios
        .get(`https://live-app-rest-api.herokuapp.com/users/${page}`)
        .then((response) => {
            callback(response.data);
            window.alert(JSON.stringify(response.data[0]));
        })
        .catch((err) => {
            console.error(err);
        });
};
const getUserProfilePic = (username, callback) => {
    axios
        .get(`https://live-app-rest-api.herokuapp.com/users/image/${username}`)
        .then((response) => {
            callback(response.data);
            window.alert(JSON.stringify(response.data[0]));
        })
        .catch((err) => {
            console.error(err);
        });
};
export { registerRequest, getUsersReq, getUserProfilePic };
