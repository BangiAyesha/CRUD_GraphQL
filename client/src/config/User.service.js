import axios from "axios";

export function loginUser(id) {
    return axios.post("http://localhost:1357/login", id);
}
