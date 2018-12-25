import { Config } from '../config';


// extending LocaoStorage?
interface Storage {
    setObject<T>(key: string, value: T, expiresin: number): void;
    getObject<T>(key: string): T;
}

export interface ICachedStorage {
    key: string;
    value: any;
    expiresin: number;
    timestamp: number;
}


Storage.prototype.setObject = function (key: string, value: any, expiresin: number = Config.Cache.Timeout): void {
    // set cache with expiration time stamp, each obect has its own? or one for all?
    // optional
    // _debug(expiresin, 'passed');

    const _storage: ICachedStorage = {
        value: value,
        timestamp: Date.now(), // in milliseconds
        expiresin: expiresin, // in hours
        key: Config.Cache.Key + '.' + key
    };

    this.setItem(_storage.key, JSON.stringify(_storage));
};

Storage.prototype.getObject = function (key: string): any {
    // check DataCacheResetKey, if exists continue, else force reset and save key
    const _reset: any = this.getItem(Config.Cache.ResetKey);

    if (!_reset) {
        // set key and force reste of data
        localStorage.clear(); // added, clear localstorage here

        this.setItem(Config.Cache.ResetKey, true);

        return null;
    }

    const value: any = this.getItem(Config.Cache.Key + '.' + key);

    if (value) {
        const _value: ICachedStorage = JSON.parse(value);

        // calculate expiration

        if (Date.now() - _value.timestamp > (_value.expiresin * 3600000)) {

            this.removeItem(_value.key);
            return null;
        }

        return _value.value;
    }
    return null;
};
