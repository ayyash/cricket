import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class CricketErrorHandler implements ErrorHandler {

    handleError(error: any) {
        // TODO: log

        _debug(error, 'Unhandled Error', 'f');

    }
}
