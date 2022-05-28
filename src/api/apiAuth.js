import { _rootPath, rootAPI } from "./rootAPI";

const path = {
    auth: {
        login: _rootPath + "/auth/login",
        register: _rootPath + "/auth/register",
    }
}

function login(data, callback) {
    rootAPI({
        withToken: false
    }).post(path.auth.login, data)
    .then(res => {
        return callback(res.data);
    })
    .catch(err => {
        return callback(null, err);
    });
}

function register(data, callback) {
    rootAPI({
        withToken: false
    }).post(path.auth.register, data)
    .then(res => {
        return callback(res.data)
    })
    .catch(err => {
        return callback(null, err)
    })
}

export default {
    login,
    register
};
