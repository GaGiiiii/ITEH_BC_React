import axios from "axios";

export function login(user) {
    console.log(user);
    localStorage.setItem("transfy_user", JSON.stringify(user));
}

export function logout(user, api) {
    axios.post(`${api}/logout`, {}, { headers: { Authorization: `Bearer ${user.token}` } }).then(res => {
        localStorage.removeItem("transfy_user");
    }).catch(error => {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    });
}

export function isLoggedIn() {
    return localStorage.getItem('transfy_user') === null ? null : JSON.parse(localStorage.getItem('transfy_user'));
}