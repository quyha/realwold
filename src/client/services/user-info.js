import storageService from './storage';
import * as api from '../api/api-sender'

let listeners = {};
let user = storageService.get('user-info');
function broadcast() {
    Object.keys(listeners).forEach(
        k => listeners[k]()
    );
}

export const userInfo = {
    get: () => user,
    set: (newUser) => {
        user = newUser;
        if(user) {
            storageService.set('user-info', user);
            let headers = {
                'Authorization': `Token ${userInfo.get().token}`,
            };
            api.setHeader(headers);
        } else {
            storageService.clear('user-info');
        }
        broadcast();


    },
    onChange: (key, cb) => {
        listeners[key] = cb;
    },
    unChange: (key) => {
        delete listeners[key];
    }
};