import axios from "axios";

class AuthService {
    login(username, password) {
        return axios.post("http://192.168.1.42:4000/auth/signin", {
            username,
            password
        }).then(response => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
    }
    logout() {
        localStorage.removeItem("user");
    }
    register(username, password) {
        return axios.post("http://192.168.1.42:4000/auth/signup", {
            username,
            password
        });
    }

    updateUser(_id, role) {
        let roles = [];
        roles[0] = role;
        return axios.put("http://192.168.1.42:4000/user/" + _id, {
            roles
        });
    }
    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();