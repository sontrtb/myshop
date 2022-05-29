import { _rootPathMock, rootAPI } from "./rootAPI";

const path = {
    bill: _rootPathMock + "/order",
};

const creactBill = (data, callback) => {
    rootAPI({
        withToken: true
    }).post(path.bill, data)
    .then(res => {
        return callback(res.data);
    })
    .catch(err => {
        return callback(null, err);
    })
}

const getListBill = (callback) => {
    rootAPI({
        withToken: true
    }).get(path.bill)
    .then(res => {
        return callback(res.data);
    })
    .catch(err => {
        return callback(null, err);
    })
}


const editBill = (data, callback) => {
    rootAPI({
        withToken: false,
    }).put(path.bill + "/" + data.id, data)
        .then(res => {
            return callback(res.data);
        })
        .catch(err => {
            return callback(null, err);
        })
}

const deleteBill = (id, callback) => {
    rootAPI({
        withToken: false,
    }).delete(path.bill + "/" + id)
        .then(res => {
            return callback(res.data);
        })
        .catch(err => {
            return callback(null, err);
        })
}

export default {
    getListBill,
    creactBill,
    editBill,
    deleteBill
};