import { _rootPathMock, rootAPI } from "./rootAPI";

const path = {
    order: _rootPathMock + "/order",
};

const creactOrder = (data, callback) => {
    rootAPI({
        withToken: false
    }).post(path.order, data)
        .then(res => {
            return callback(res.data);
        })
        .catch(err => {
            return callback(null, err);
        })
}

const getListOrder = (callback) => {
    rootAPI({
        withToken: false
    }).get(path.order)
        .then(res => {
            return callback(res.data);
        })
        .catch(err => {
            return callback(null, err);
        })
}


const deleteOrder = (id, callback) => {
    rootAPI({
        withToken: false,
    }).delete(path.order + "/" + id)
        .then(res => {
            return callback(res.data);
        })
        .catch(err => {
            return callback(null, err);
        })
}

export default {
    getListOrder,
    deleteOrder,
    creactOrder
};