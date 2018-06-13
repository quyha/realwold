export const Cols = {
    replace1(col, target, replace) {
        if(col == null) return null;
        return col.map(v => {
            if(target === v) {
                return replace;
            } else {
                return v;
            }
        });
    },
    remove1(col, target) {
        if(col == null) return null;
        return col.filter(c => c !== target);
    }
};