import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, first, publishLast, refCount } from 'rxjs/operators';
import { Config } from '../config';
import { HttpClient } from '@angular/common/http';

import { IData, DataClass, EnumDataType, Country } from '../core/services';

@Injectable()
export class DataService {
    private _urls: { [id: number]: { url: string; expiresin?: number } } = {};
    private inAppData: { [id: number]: IData[] } = {}; // local data in app

    constructor(private _http: HttpClient) {
        // instantiate
        this._urls[EnumDataType.Country] = { url: Config.API.data.countries };

    }

    GetData(type: EnumDataType, id: string = '0'): Observable<IData[]> {
        const name: string = EnumDataType[type];
        // replace id
        const _cachedUrl = this._urls[type];
        const _url = _cachedUrl.url.replace(':id', id);

        const _data: any = localStorage.getObject(name + '.' + id);
        // localdata is guarranteed to be within expiration date this way

        if (_data) {
            // if localStroage exist, return
            return of(_data);
        } else {
            // get from server, url is replaced for the correct id

            return this._http
                .get(_url)
                .pipe(
                    map(response => {
                        let _retdata: IData[] = DataClass.NewInstances(type, <any>response);

                        // override for different types.. is this really the best way to do it?
                        switch (type) {
                            case EnumDataType.Country:
                                _retdata = Country.NewInstances(<any>response);

                                break;

                        }

                        // assgin to localstorage with key and expires in hours if set

                        localStorage.setObject(name + '.' + id, _retdata, _cachedUrl.expiresin);

                        return _retdata;
                    })
                )
                .debug('GetData ' + name, 'code');
        }
    }

    GetCustom(type: EnumDataType, id: string = '0'): Observable<any> {
        const name: string = EnumDataType[type];
        // replace id
        const _cachedUrl = this._urls[type];
        const _url = _cachedUrl.url.replace(':id', id);

        const _data: any = localStorage.getObject(name + '.' + id);
        // localdata is guarranteed to be within expiration date this way

        if (_data) {
            // if localStroage exist, return
            return of(_data);
        } else {
            // get from server, url is replaced for the correct id

            return this._http
                .get(_url)
                .pipe(
                    map(response => {
                        let _retdata: any;

                        // override for different types.. is this really the best way to do it?
                        switch (type) {
                            case EnumDataType.Metric:
                                _retdata = <IMetric>Metric.NewInstance(<any>response);
                                break;

                        }

                        // assgin to localstorage with key and expires in hours if set

                        localStorage.setObject(name + '.' + id, _retdata, _cachedUrl.expiresin);

                        return _retdata;
                    })
                )
                .debug('GetCustom ' + name, 'code');
        }
    }


    UpdateData(type: EnumDataType, newItem: IData, id: string = '0'): void {
        // update localstorage by adding a new value to the existing collection
        const name: string = EnumDataType[type];
        const _cachedUrl = this._urls[type];
        const _url = _cachedUrl.url.replace(':id', id);
        const _data: any = localStorage.getObject(name + '.' + id);
        if (_data && _data instanceof Array) {
            // add item
            _data.push(newItem);
            localStorage.setObject(name + '.' + id, _data, _cachedUrl.expiresin);
        }
        // else nothing, there is no storag to update
    }

    GetCountries(): Observable<IData[]> {
        return this.GetData(EnumDataType.Country).pipe(
            first(),
            publishLast(),
            refCount()
        );
    }

    GetSingleDataById(type: EnumDataType, id: string): Observable<IData> {
        if (id === null) {
            return null;
        }

        return this.GetData(type).pipe(
            map(data => data.find(n => n.id.toString() === id.toString())),
            first(),
            publishLast(),
            refCount()
        );
    }

    GetSingleDataByKey(type: EnumDataType, key: string): Observable<IData> {
        if (key === null) {
            return null;
        }

        return this.GetData(type).pipe(
            map(data => data.find(n => n.key === key)),
            first(),
            publishLast(),
            refCount()
        );
    }

    GetLocalDataByKey(type: EnumDataType, key: string): IData {
        if (key === null) {
            return null;
        }
        return (
            this.inAppData[type].find(n => n.key === key) ||
            DataClass.NewInstance(type, { id: '0', key: key, text: key })
        );
    }
}
