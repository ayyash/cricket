import { Renderer } from '@angular/core';

export class ShBg {


    public static Bg(element: HTMLElement, renderer: Renderer) {
        // add background without the neeed for safeurl
        const bg = $(element).data('bgimage');
        if (bg) {
            renderer.setElementStyle(element, 'background-image', `url("${bg}")`);
        }

    }

}
