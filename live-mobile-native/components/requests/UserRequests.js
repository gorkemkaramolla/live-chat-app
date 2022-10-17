import axios from "axios";

const registerRequest = async (username, password, callback) => {
    await axios
        .post("https://live-app-rest-api.herokuapp.com/api", {
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
const getUsersReq = () => {
    axios
        .get("https://live-app-rest-api.herokuapp.com/api")
        .then((response) => {
            console.log(response.data);
        })
        .catch((err) => {
            console.error(err);
        });
};
export { registerRequest };
