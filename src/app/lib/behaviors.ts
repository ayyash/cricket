import { Res } from '../core/resources';
import { IToasterOptions, Toast } from './behaviors/toast.behavior';
import { ShFade } from './behaviors/fade.behavior';
import { ShBg } from './behaviors/bg.behavior';

// behaviors are functions based on jQuery for ease of use


(function ($) {

    if (!$.Sh) {
        $.Sh = {};
    }
    const toastOptions: IToasterOptions = {
        text: Res.Get('Error'),
        sticky: true,
        css: '',
        closecss: 'closelabel',
        closetext: Res.Get('Dismiss'),
        showCloseBtn: true,
        locked: false,
        newCss: '',
        delay: 5000
    };

    const bodyLabel = new Toast(toastOptions);

    $.Toast = function (key: string, options?: IToasterOptions, fallback?: string) {


        bodyLabel.Hide();

        if (key !== 'hide') {
            if (!options.sticky) {
                options.showCloseBtn = false;
            }

            bodyLabel.Show($.extend({ text: Res.Get(key, fallback) }, options));


        }
    };

    $.Sh.Bg = function (element, renderer) {
        ShBg.Bg(element, renderer);
    };
    $.Sh.Fadeout = function (element, timeout = 300) {
        ShFade.FadeOut(element, timeout);

    };


})(jQuery);
