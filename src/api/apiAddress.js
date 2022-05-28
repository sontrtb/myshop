import { _rootPath, rootAPI } from "./rootAPI";

const path = {
    address: {
        provinces: _rootPath + "/address/provinces",
        districts: _rootPath + "/address/districts",
        communes: _rootPath + "/address/communes"
    }
}

function getProvinces(callback){
    rootAPI({
        withToken: false
    }).get(path.address.provinces)
        .then(res => {
            return callback(res.data);
        })
        .catch(err => {
            return callback(null, err);
        })
}

function getDistricts(id, callback){
    rootAPI({
        withToken: false
    }).get(path.address.districts + "/" + id)
        .then(res => {
            return callback(res.data)
        })
        .catch(err => {
            return callback(null, err)
        })
}

function getCommunes(id, callback){
    rootAPI({
        withToken: false
    }).get(path.address.communes + "/" + id)
        .then(res => {
            return callback(res.data)
        })
        .catch(err => {
            return callback(null, err)
        })
}

export default {
    getProvinces,
    getDistricts,
    getCommunes
}