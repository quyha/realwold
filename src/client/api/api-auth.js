let isAuth = () => true;
export const apiAuth = api => (...args) => {
    if (!isAuth()) {
        return Promise.reject('Unauthorized api access');
    }
    return api.apply(null, args);
}
export const apiAuthConfig = {
    setAuth(fn) {
        isAuth = fn;
    }
}