

/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
    id: string;
}

interface IToasterOptions {
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

declare interface JQueryStatic {
    Sh: any;
    Cricket: any;
    Toast(key: string, options?: IToasterOptions, fallback?: string): any;
}


declare interface String {
    toSentenceCase(): string;
    toPrettyPrice(): string;

}
declare function _debug(o, message?, type?): void;
