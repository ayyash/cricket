import { Injectable } from '@angular/core';
import { ICachedStorage, ConfigService } from '../core/services';
import { Platform } from '@angular/cdk/platform';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
    public isBrowser = false;

    constructor(private platform: Platform) {
        if (this.platform.isBrowser) {
            this.isBrowser = true;
        }
    }

    setObject(key: string, value: any, expiresin: number = ConfigService.Config.Cache.Timeout): void {
        // set cache with expiration time stamp, each obect has its own? or one for all?
        const _storage: ICachedStorage = {
            value: value,
            timestamp: Date.now(), // in milliseconds
            expiresin: expiresin, // in hours
            key: ConfigService.Config.Cache.Key + '.' + key
        };
        if (this.isBrowser) {
            this.setItem(_storage.key, JSON.stringify(_storage));
        }
    }

    getObject(key: string): any {
        // if browser get storage, else return null
        // check DataCacheResetKey, if exists continue, else force reset and save key
        if (!this.isBrowser) {
            return null;
        }
        const _reset: any = this.getItem(ConfigService.Config.Cache.ResetKey);

        if (!_reset || _reset !== 'true') {
            // set key and force reste of data
            this.clear(); // added, clear localstorage here

            this.setItem(ConfigService.Config.Cache.ResetKey, 'true');

            return null;
        }

        const value: any = this.getItem(ConfigService.Config.Cache.Key + '.' + key);

        if (value) {
            const _value: ICachedStorage = JSON.parse(value);

            // calculate expiration

            if (Date.now() - _value.timestamp > _value.expiresin * 3600000) {
                this.removeItem(_value.key);
                return null;
            }

            return _value.value;
        }
        return null;
    }

    removeItem(key: string) {
        if (this.isBrowser) {
            localStorage.removeItem(key);
        }
    }

    setItem(key: string, value: string) {
        if (this.isBrowser) {
            localStorage.setItem(key, value);
        }
    }

    getItem(key: string): string {
        if (this.isBrowser) {
            return localStorage.getItem(key);
        }
        return null;
    }
    clear(): void {
        if (this.isBrowser) {
            localStorage.clear();
        }
    }
}
