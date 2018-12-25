import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Config } from '../config';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { IClientFile, ClientFile, IUiError, IClientFileResponse } from '../core/services';

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
        // const headers: HttpHeaders = new HttpHeaders().set('content-type', 'multipart/form-data');

        // change header
        return this._http.post(url, data).pipe(
            map(response => {
                return {imageUrl: ClientFile.MapImageUrl(<any>response)};
            }),
            catchError((error: IUiError) => {
                // always return a decent result, to simplify switchMapping on artefact list component

                return of({ error: error});
            })
        );
    }
}
