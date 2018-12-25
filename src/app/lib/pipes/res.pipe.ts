import { Pipe, PipeTransform } from '@angular/core';
import { Res } from '../../core/resources';

@Pipe({ name: 'res' })
export class ResPipe implements PipeTransform {


    transform(res: string): string {

        return Res.Get(res, '').toSentenceCase();

    }
}

