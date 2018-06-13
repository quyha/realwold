import * as send from './api-sender';
import { apiAuth } from './api-auth'

export const profileApi = {
    get(username) {
        return send.get(`/profiles/${username}`);
    },
    follow: apiAuth((username) => {
        return send.post(`/profiles/${username}/follow`);
    }),
    unfollow: apiAuth((username) => {
        return send.del(`/profiles/${username}/follow`);
    })
};
