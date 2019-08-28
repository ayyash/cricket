import { keys, translateKeys } from '../../locale/resources';

export class Res {
    public static Get(key: string, fallback?: string): string {
        // if found return else generic
        if (keys[key]) {
            return keys[key];
        }

        return fallback || keys.NoRes;
    }

    public static Translate(key: string): string {
        if (translateKeys[key]) {
            return translateKeys[key];
        }

        return null;
    }

    public static RelativeTime(key: string, value: number): string {
        // translate special reltive time, key is always associated with ago, value is the number to count

        const ret = keys.RELATIVE_TIME.AGO; // {0} ago
        let factor = 11;
        if (value <= 1) {
            factor = 1;
        } else if (value <= 2) {
            factor = 2;
        } else if (value < 11) {
            factor = 3;
        }
        return ret.replace('$0', keys.RELATIVE_TIME[key][factor].replace('$0', value));
    }
}
