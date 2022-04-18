
declare let dataLayer: any[]; // Declare google tag


export enum EnumGtmSource {
    // sources of events
    ListName = 'name of list',
}
export enum EnumGtmEvent {
    // events
    Click = 'cr_click',
    PageView = 'cr_page_view'
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
export interface IGtmTrack {
    event: EnumGtmEvent;  // to control events site-wise
    source?: EnumGtmSource; // to control where the event is coming from
}


export class GtmTracking {


    public static get IsEnabled(): boolean {
        return typeof window !== 'undefined' && window['dataLayer'];
    }



    public static RegisterEvent(track: IGtmTrack, extra?: any): void {

        let data = {
            event: track.event, gr_track: {
                source: track.source,
                ...extra
            }
        };
        _debug(data, 'register event');
        if (GtmTracking.IsEnabled) {
            dataLayer.push(data);
        }

    }

    public static MapPath(path: string): any {
        return { page_location: path };
    }

    // create mapper for every model
    public static MapLists(list: any[], position?: number) {
        const items = list.map(GtmTracking.MapItem);
        // calculate value
        const value = items.reduce((acc, item) => acc + parseFloat(item.price), 0);
        if (position) {
            items[0].index = position;
        }
        return {items, value, currency: 'ABC'};
    }

    public static MapItem(item: any, index: number) {
        return {
            item_name: item.title,
            item_id: item.id,
            item_category: item.category.key,
            index: index,
            price: item.price
        };
    }


    public static MapSearch(keyword: string) {
        return { 'search_term': keyword };
    }

    public static MapLogin(method: EnumGtmMethod) {
        return { method };
    }



    public static MapAction(action: EnumGtmAction) {
        return {action: action}
    }
    // then all other mappers for employee, and project
}
