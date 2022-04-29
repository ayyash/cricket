import { ErrorHandler, Injectable } from '@angular/core';
import { EnumGtmEvent, GtmTracking } from './gtm';

@Injectable()
export class CricketErrorHandler implements ErrorHandler {

    handleError(error: any) {
        // TODO: log

        _debug(error, 'Unhandled Error', 'f');
        GtmTracking.RegisterEvent({event: EnumGtmEvent.Error}, {error: error});

    }
}
