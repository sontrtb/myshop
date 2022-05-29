import axios from "axios";
import Cookies from 'js-cookie'

export const _rootPath = process.env.REACT_APP_API_URL;
export const _rootPathAuth = process.env.REACT_APP_API_URL_AUTH;
export const _rootPathMock = process.env.REACT_APP_API_MOCK;

const _defaultOptions = {
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE',
        'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type,Cache-Control,access_token',
    },
    withCredentials: false,
};


export function rootAPI(options = {}) {
    const _root = axios.create(_defaultOptions);

    let defaultOptions = {
        withToken: true,
        displayError: false
    };

    defaultOptions = {
        ...defaultOptions,
        ...options
    };

    _root.interceptors.request.use((config) => {
        if (defaultOptions.withToken) {
            const token = JSON.parse(localStorage.getItem('token'));
            config.headers.Authorization = token ? `Bearer ${token}` : '';
        } else {
            const token = Cookies.get('token') ?? "";
        }
        if (defaultOptions.responseType) {
            config.responseType = defaultOptions.responseType;
        }
        return config;
    });

    _root.interceptors.response.use(undefined, (error) => {
        return Promise.reject(error);
    });
    return _root;
}
