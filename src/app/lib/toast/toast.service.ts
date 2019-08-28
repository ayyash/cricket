import { Observable, BehaviorSubject } from 'rxjs';
import { IToast } from './toast.model';
import { Res } from '../../core/resources';

export class Toast {

    public static toast: BehaviorSubject<IToast> = new BehaviorSubject({});
    public static toast$: Observable<IToast> = Toast.toast.asObservable();


    public static options: IToast = {
        text: Res.Get('Error'),
        sticky: false,
        css: 'toast',
        closetext: Res.Get('Dismiss'),
        delay: 5000,
        extracss: ''
    };

    // VER_NEXT: note to self, all ways to control animation through css has gone awry
    // the best way is to add and remove classes within delay,  never rely on css animation delay
    public static Show(key: string, options?: IToast, fallback?: string): void {
        // clone optons and never override
        // build the itoast here
        // if sticky, hide after u show

        Toast.Hide();

        const _options: IToast = {...Toast.options, ...options };
        // fallback if message does not exist in keys
        _options.text = Res.Get(key, fallback);

        Toast.toast.next(_options);

        if (!_options.sticky && typeof window !== 'undefined') {
            setTimeout(() => {
                Toast.Hide();
            }, _options.delay);
        }

        // VER_NEXT: if sticky, allow a threashold before you hide
    }

    public static Hide(): void {
        Toast.toast.next(null);
    }

}
