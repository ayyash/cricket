import { Pipe, PipeTransform } from '@angular/core';
import { Res } from '../../core/resources';

@Pipe({ name: 'res' })
export class ResPipe implements PipeTransform {


    transform(res: string, tocase: string = 'normal'): string {
        const value = Res.Get(res, '');
        // format: normal or sentence case only
        return tocase === 'sentence' ? value.toSentenceCase() : value;

    }
}

