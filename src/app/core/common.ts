

String.prototype.toSentenceCase = function () {
    return this.substring(0, 1).toUpperCase() + this.substring(1);
};



String.prototype.toPrettyPrice = function (this: string) {
    const ret = Number(this.replace(/,/gi, ''));
    if (isNaN(ret)) { return this; }
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


export class Helpers {

    public static GetParamsAsString(urlParams: any): string {
        const s = new URLSearchParams();
        // for every key, if value is undefined, or null, or false, exclude
        Object.keys(urlParams).forEach(n => {
            const v = urlParams[n];
            if (v) {
                if (v instanceof Array) {
                    if (v.length) {
                        // filter out empty strings
                        // lookout for this, it might need an [] in the key
                        v.filter(x => x !== '').forEach(f => s.append(n + '[]', f));
                    }
                } else {
                    s.append(n, v);
                }
            }
        });
       return s.toString();

    }

    public static makeDate(dateString: string): Date {
        if (dateString) {
            // do check to make sure it is valid date

            if (isNaN(Date.parse(dateString))) { return null; }

            return new Date(dateString);
        }
        return null;
    }

    // public static prepDate(date: Date | null): number {
    //     if (date) {
    //         if (!(date instanceof Date)) {
    //             return null;
    //         }
    //         return date.valueOf();
    //     }
    //     return null;
    // }


    


}
