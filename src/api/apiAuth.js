import { _rootPathAuth, rootAPI } from "./rootAPI";

const path = {
    auth: {
        login: _rootPathAuth + "/auth/login",
        register: _rootPathAuth + "/auth/register",
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

function logout(callback) {
    rootAPI().get(path.auth.logout)
    .then(res => {
        return callback(res.data)
    })
    .catch(err => {
        return callback(null, err)
    })
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    login,
    register,
    logout
};
