

export const toSentenceCase = (s: string) => {
    return s.substring(0, 1).toUpperCase() + s.substring(1);
};


export const toPrettyPrice = (s: string) => {
    const ret = Number(s.replace(/,/gi, ''));
    if (isNaN(ret)) { return s; }
    // read number, tofixed of 2 digits, insert "," in every three digits, if its already fixed, unfix first

    const _ret = ret.toFixed(2),
        x = _ret.toString().split('.'),
        x2 = x.length > 1 ? '.' + x[1] : '',
        rgx = /(\d+)(\d{3})/;

    let x1 = x[0];

    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
};
export const GetParamsAsString = (urlParams: any, joinArray = false): string => {
    const s = new URLSearchParams();

    // for every key, if value is undefined, or null, or false, exclude
    Object.keys(urlParams).forEach(n => {
        const v = urlParams[n];
        if (v) {
            if (v instanceof Array) {
                if (v.length) {
                    // filter out empty strings
                    if (joinArray) {
                        const _v = v.filter(x => x && x !== '').join(',');
                        if (_v) { s.append(n, _v); }
                    } else {
                        // lookout for this, it might need an [] in the key
                        // append multiple if joinArray is false
                        v.filter(x => x !== '').forEach(f => s.append(n, f));
                    }
                }
            } else {
                // append key and value
                s.append(n, v);
            }
        }
    });
    return s.toString();

};
export const CleanParams = (params: any): any => {
    // remove empty arrays, unidentified, nulls
    const s = {};
    Object.keys(params).forEach(n => {
        const v = params[n];
        if (v) {
            if (v instanceof Array) {
                if (v.length) {
                    // filter out empty strings and join
                    const _v = v.filter(x => x && x !== '').join(',');
                    if (_v) { s[n] = _v; }
                }
            } else {
                // append key and value
                s[n] = v;
            }
        }
    });

    return s;
};



export const makeDate = (dateString: string): Date | null => {
    if (dateString) {
        // do check to make sure it is valid date

        if (isNaN(Date.parse(dateString))) { return null; }

        return new Date(dateString);
    }
    return null;
};


export const fixAngularBug = (params: string[]): string[] => {
    // WATCH: https://github.com/angular/angular/issues/19179
    // get an array like this ["a,b"] and create an array ["a", "b"]
    if (params.length < 1) {
        return params;
    }
    return params[0].split(',');
};

