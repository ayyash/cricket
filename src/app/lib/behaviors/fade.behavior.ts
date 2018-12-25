export class ShFade {
    $element: JQuery;

    // constructor(element: HTMLElement) {
    //     this.$element = $(element);
    // }

    public static FadeOut(element: HTMLElement, timeout = 300) {
        // apply fadeout css after a timeout and remove
        // XTRACK: fadeTimeout
        element.classList.add('fadeout');
        setTimeout(() => {
            element.remove();
        }, timeout);
        return timeout;
    }

}
