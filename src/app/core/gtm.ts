
declare let dataLayer: any[]; // Declare google tag


export enum EnumGtmSource {
    // sources of events
    ListName = 'name of list',
    Anywhere = 'anywhere'
}
export enum EnumGtmEvent {
    // events
    Click = 'cr_click',
    PageView = 'cr_page_view',
    GroupClick = 'cr_group_click',
    Error = 'cr_error'
}
export enum EnumGtmMethod {
    Google = 'google',
    Facebook = 'facebook',
    Twitter = 'twitter',
    LinkedIn = 'linkedin',
    Instagram = 'instagram',
    Pinterest = 'pinterest',
    Unknown = 'unknown'
}
export enum EnumGtmAction {
    Click = 'click',
    Drag = 'drag'
}
export enum EnumGtmGroup {
    General = 'general',
    Navigation = 'navigation'
    // other click groups
}
export interface IGtmTrack {
    event: EnumGtmEvent;  // to control events site-wise
    source?: EnumGtmSource; // to control where the event is coming from
}


export class GtmTracking {

    private static _values = {};
    public static get Values(): any {
        return this._values;
    }
    public static set Values(value: any) {
        this._values = {...this._values,...value};
    }

	private static Push(data: any) {
        if (window && window['dataLayer']) {
            dataLayer.push(data);
        }
    }

    public static RegisterEvent(track: IGtmTrack, extra?: any): void {

        let data = {
            event: track.event, gr_track: {
                source: track.source,
                ...extra
            }
        };
        _debug(data, 'register event', 'ga');
		this.Push(data);

    }

    public static SetValues(values: any): void {

        let data = {
            gr_values: {...values}
        };
        _debug(data, 'Set GA value', 'ga');
        this.Push(data);
    }
    public static Reset() {

        // dataLayer.splice(1);

        this.Push(function () {
            this.reset();
        });
        GtmTracking.SetValues(GtmTracking.Values);

    }



    public static MapGroup(group: EnumGtmGroup, label?: string) {
        return { group, label };
    }

    public static MapPath(path: string): any {
        return { page_location: path };

    }


    public static MapProducts(products: any[], position?: number) {
        const items = products.map(GtmTracking.MapProduct);
        // calculate value
        const value = items.reduce((acc, item) => acc + parseFloat(item.price), 0);

        if (position) {
            items[0].index = position;
        }
        return { items, value };

    }

    public static MapProduct(product: any, index: number) {
        return {
            item_name: product.name,
            item_id: product.id,
            price: product.price,
            currency: 'AUD',
            index
        };
    }

    public static MapSearch(keyword: string) {
        return { search_term: keyword };
    }

    public static MapLogin(method: EnumGtmMethod) {
        return { method };
    }

    public static MapAction(action: EnumGtmAction) {
        return { action: action };
    }

    // then all other mappers for employee, and project
}
