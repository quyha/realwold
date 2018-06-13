import * as send from './api-sender';

export const userApi = {
    login(payload) {
        return send.post("/users/login",{user: payload});
    },
    update(payload) {
        return send.put("/user",{user: payload});
    },
    register(payload) {
        return send.post("/users",{user: payload});
    }
};