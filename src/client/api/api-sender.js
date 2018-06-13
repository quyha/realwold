import axios from 'axios';
import { userInfo } from '../services/user-info'

const instance = axios.create({
    baseURL: 'https://conduit.productionready.io/api',
});
export const setHeader = h => instance.defaults.headers = h;
export const get = route => instance.get(route).then(handleResponse).catch(handleError);
export const post = (route, payload) => instance.post(route, payload).then(handleResponse).catch(handleError);
export const put = (route, payload) => instance.put(route, payload).then(handleResponse).catch(handleError);
export const del = route => instance.delete(route).then(handleResponse).catch(handleError);

function handleResponse(res) {
    return new Promise((resolve, reject) => {
        if (res.status == 200) {
            return resolve(res.data);
        } else if (res.status !== 200) {
            return reject(new Error(res.statusText));
        } else {
            reject(new Error("Lỗi"));
        }
    });
}
function handleError(error) {
    return new Promise((resolve, reject) => {
        if (error.response) {
            return resolve(error.response.data);
        } else if (error.request) {
            return reject(new Error("ERROR REQUEST"));
        } else {
            return reject(new Error("ERROR"));
        }
    });
}