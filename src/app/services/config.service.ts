import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config';
import { map, catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';


export interface IConfig {
    Basic: {
        defaultUploadSize: number;
        defaultUploadFormat: string[];
    };
    API: {
        apiRoot: string;
    };
    Auth: {
        userAccessKey: string;
    };
    Cache: {
        Timeout: number;
        Key: string;
        ResetKey: string;
    };
}

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    private static _config: IConfig;

    private _getUrl: string = Config.API.config.local;

    private config = new BehaviorSubject<IConfig>(null);
    config$: Observable<IConfig> = this.config.asObservable();

    private _http: HttpClient;

    static configFactory = (config: ConfigService): (() => Promise<boolean>) => {
        return (): Promise<boolean> => {
            return config.loadAppConfig();
        };
    }

    private static NewInstance(config: any): IConfig {
        // clone first, because in ssr the object is transfered in state to client, which adds the key again, unless u clone
        const _config = {...<IConfig>config};
        _config.Cache = {..._config.Cache};
        // adjust cache key to have language in it
        _config.Cache.Key += '.' + Config.Basic.language;

        // populate static element
        ConfigService._config = _config;

        return _config;
    }

    constructor(private injector: Injector) {
        this._http = this.injector.get(HttpClient);
    }

    loadAppConfig(): Promise<boolean> {
        // too much typing
        return new Promise<boolean>(resolve => {
                this._http
                    .get(this._getUrl)
                    .pipe(
                        map(response => {
                            const config = ConfigService.NewInstance(<any>response);

                            this.config.next(config);
                            resolve(true);
                        }),
                        catchError(error => {
                            // if in error, return default fall back from environment
                            resolve(true);
                            _debug(error, 'Error in resolve', 'e');
                            return of(Config);
                        })
                    )
                    .subscribe();
            }
        );
    }


    static get Config(): IConfig {
        // add language to cache key
        return ConfigService._config ? ConfigService._config : <IConfig>Config;
    }

    public GetConfig(): IConfig {
        return this.config.getValue();
    }

}
