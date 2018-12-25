
export interface IToasterOptions {
    text?: string;
    sticky?: boolean;
    css?: string;
    closecss?: string;
    closetext?: string;
    showCloseBtn?: boolean;
    locked?: boolean;
    newCss?: string;
    delay?: number;
}

export class Toast {
    public options: IToasterOptions;
    public $label;
    public $closebtn;

    constructor(options: IToasterOptions) {
        this.options = options;

        this.$label = $('<span></span>').addClass(this.options.css).html(this.options.text);
        this.$closebtn = $('<span />').text(this.options.closetext).addClass(this.options.closecss);
    }

    public Show(options) {


        const s = Object.assign({}, this.options, options);
        // things that can be passed on runtime:
        // text, css, sticky, showclosebtn

        if (!this.options.locked) {
            // show according to settings
            this.options.locked = true;

            // reset opacity
            // reset css as well

            this.$label.removeClass(this.options.newCss);
            this.$label.addClass(s.css);
            this.$label.css('opacity', 1);
            this.$label.html(s.text);

            // save new css
            this.options.newCss = s.css;
            this.$label.prependTo($('body'));


            if (!s.sticky) {
                window.setTimeout(() => {
                    this.Hide();
                }, s.delay);

            } else {
                if (s.showCloseBtn) {
                    this.$label.append(this.$closebtn);
                }
                // make an onclick here
                this.$closebtn.on('click', () => {
                    this.Hide();
                });
            }

        }

    }

    public Hide() {
        this.$label.remove();
        this.options.locked = false;
    }
}
