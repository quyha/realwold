export const Obj = {
    mapValueToList(obj, f) {
        let ret = [];
        for(let k in obj) {
            if(obj.hasOwnProperty(k)) {
                ret.push(f(obj[k], k));
            }
        }
        return ret;
    }
};