import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {  ClientFile, IClientFileResponse } from './clientfile.model';

@Injectable()
export class ClientFileService {
    constructor(private _http: HttpClient) {}

    UploadPhoto(file: any, url: string): Observable<IClientFileResponse> {
        // if no clientFile, do not upload
        if (!file) {
            return of({});
        }

        const data = new FormData();
        data.append('file', file);

        _debug(file.name, 'UploadPhoto Data');

        // change header
        return this._http.post(url, data).pipe(
            map(response => {
                return ClientFile.MapImageUrl(<any>response, null);
            }),
            catchError((error: any) => {
                // always return a decent result, to simplify switchMapping

                return of(ClientFile.MapImageUrl(null, error));
            })
        );
    }
}
