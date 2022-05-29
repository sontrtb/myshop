import { _rootPath, rootAPI } from "./rootAPI";

const path = {
    bill: _rootPath + "/cart/bill",
    listcart: _rootPath + "/cart",
    creactCart: _rootPath + "/cart/create",
    allCart: _rootPath + "/cart/admin",
};

const creactCart = (data, callback) => {
    rootAPI({
        withToken: true
    }).post(path.creactCart, data)
    .then(res => {
        return callback(res.data);
    })
    .catch(err => {
        return callback(null, err);
    })
}

const deleteCart = (callback) => {
    rootAPI({
        withToken: true
    }).delete(path.bill)
    .then(res => {
        return callback(res.data);
    })
    .catch(err => {
        return callback(null, err);
    })
}


const getListCart = (callback) => {
    rootAPI({
        withToken: true
    }).get(path.listcart)
    .then(res => {
        return callback(res.data);
    })
    .catch(err => {
        return callback(null, err);
    })
}

const getAllCart = (callback) => {
    rootAPI({
        withToken: true
    }).get(path.allCart)
    .then(res => {
        return callback(res.data);
    })
    .catch(err => {
        return callback(null, err);
    })
}


// const deleteOrder = (id, callback) => {
//     rootAPI({
//         withToken: false,
//     }).delete(path.order + "/" + id)
//         .then(res => {
//             return callback(res.data);
//         })
//         .catch(err => {
//             return callback(null, err);
//         })
// }

export default {
    getListCart,
    creactCart,
    getAllCart,
    deleteCart
};