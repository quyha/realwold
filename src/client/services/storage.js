export default {
    get(key) {
        let obj = null;
        try {
            obj = JSON.parse(localStorage.getItem(key));
        } catch(err) {

        }
        return obj;
    },
    set(key, obj) {
        return localStorage.setItem(key, JSON.stringify(obj));
    },
    clear(key) {
        localStorage.removeItem(key);
    },
    clearAll() {
        localStorage.clear();
    }
};