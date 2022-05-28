import { _rootPath, rootAPI } from "./rootAPI";

const path = {
    user: _rootPath + "/users",
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

export default {
    getAllUser,
    deleteUser,
};
