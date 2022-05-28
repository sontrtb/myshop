import { _rootPath, rootAPI } from "./rootAPI";

const path = {
    product: _rootPath + "/product",
    createproduct: _rootPath + "/product/create",
    search: _rootPath + "/products/search?q=",
    random: _rootPath + "/product/random",
    productFind: _rootPath + "/product/find",
};

const getListProducts = (callback) => {
    rootAPI({
        withToken: false
    }).get(path.product)
        .then(res => {
            return callback(res.data);
        })
        .catch(err => {
            return callback(null, err);
        })
}

const getProduct = (id, callback) => {
    rootAPI({
        withToken: false
    }).get(path.productFind + "/" + id)
        .then(res => {
            return callback(res.data);
        })
        .catch(err => {
            return callback(null, err);
        })
}

const getSearchProducts = (param, callback) => {
    rootAPI({
        withToken: false
    }).get(path.product + "/products/search?q=" + param)
        .then(res => {
            return callback(res.data);
        })
        .catch(err => {
            return callback(null, err);
        })
}

const addProduct = (data, callback) => {
    rootAPI({
        withToken: true,
    }).post(path.createproduct, data)
        .then(res => {
            return callback(res.data);
        })
        .catch(err => {
            return callback(null, err);
        })
}

const editProduct = (data, callback) => {
    rootAPI({
        withToken: true,
    }).put(path.product + "/" + data._id, data)
        .then(res => {
            return callback(res.data);
        })
        .catch(err => {
            return callback(null, err);
        })
}

const deleteProduct = (id, callback) => {
    rootAPI({
        withToken: true,
    }).delete(path.product + "/" + id)
        .then(res => {
            return callback(res.data);
        })
        .catch(err => {
            return callback(null, err);
        })
}

const radomProduct = (callback) => {
    rootAPI({
        withToken: false,
    }).get(path.random)
        .then(res => {
            return callback(res.data);
        })
        .catch(err => {
            return callback(null, err);
        })
}

export default {
    deleteProduct,
    getListProducts,
    addProduct,
    getSearchProducts,
    getProduct,
    editProduct,
    radomProduct,
};