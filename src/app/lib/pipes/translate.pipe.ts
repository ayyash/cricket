import { Pipe, PipeTransform } from '@angular/core';
import { Res } from '../../core/resources';

@Pipe({ name: 'translate' })
export class TranslatePipe implements PipeTransform {


    transform(original: string, res: string, tocase: string = 'normal'): string {
        const value = Res.Translate(res);

        // get resid if found else return original (so in english, better leave off the resource)
        if (value) {
            return tocase === 'sentence' ? value.toSentenceCase() : value;
        }
        return original;

    }
}

