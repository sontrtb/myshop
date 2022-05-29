import { _rootPath, rootAPI } from "./rootAPI";

const path = {
    user: _rootPath + "/user",
    userInfo: _rootPath + "/user/find"
}

const getAllUser = (callback) => {
    rootAPI({
        withToken: true
    }).get(path.user)
    .then(res => {
        return callback(res.data);
    })
    .catch(err => {
        return callback(null, err);
    });
}

function deleteUser(id, callback) {
    rootAPI({
        withToken: true
    }).delete(path.user + '/' + id)
    .then(res => {
        return callback(res.data)
    })
    .catch(err => {
        return callback(null, err)
    })
}

function getUser(id, callback) {
    rootAPI({
        withToken: true
    }).get(path.userInfo)
    .then(res => {
        return callback(res.data)
    })
    .catch(err => {
        return callback(null, err)
    })
}

function editUser(data, callback) {
    rootAPI({
        withToken: true
    }).put(path.user + '/' + data._id, data)
    .then(res => {
        return callback(res.data)
    })
    .catch(err => {
        return callback(null, err)
    })
}

export default {
    getAllUser,
    deleteUser,
    getUser,
    editUser
};
