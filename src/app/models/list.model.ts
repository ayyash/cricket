import { Config } from '../config';


export interface IList<T> {
    total: number;
    matches: T[];

}


export interface IListOptions {
    page?: number;
    keyword?: string;
    country?: string;
    // currency?: string;
    // timezone?: string;
    size?: number;
    entity?: string;
    service?: string;
    perbuyer?: boolean;
    startDate?: string;
    numberOfDays?: number;
    resource?: string;
    // APIFIX: bookingline id
    blid?: string;


}


export class ListOptions {
    public static MapSearchListOptions(options: IListOptions): any {
        // map each to its name in db, watch out for arrays

        return {

            k: options.keyword,
            c: options.country,
            p: options.page || 1,
            s: options.size || Config.Basic.defaultSize
        };

    }
    // why does this look different! beyond me
    public static MapKeywordListOptions(options: IListOptions): any {
        return {
            keyword: options.keyword
        };
    }

    public static MapReviewsListOptions(options: IListOptions): any {

        // APIFIX: FIXME: TODO: p and s are reversed
        return {
            s: options.page || 1,
            p: options.size || Config.Basic.defaultSize,
            eid: options.entity,
            sid: options.service,
            b: options.perbuyer,
            blid: options.blid
        };

    }
    public static MapBookingsListOptions(options: IListOptions): any {

         // APIFIX: FIXME: TODO: p and s are reversed
        return {
            s: options.page || 1,
            p: options.size || Config.Basic.defaultSize,
            eid: options.entity,
            sid: options.service,
            b: options.perbuyer

        };


    }

    public static MapAvailabilityListOptions(options: IListOptions): any {
        return {
            sid: options.service,
            date: options.startDate,
            rid: options.resource
        };
    }
    public static MapAvailabilitiesListOptions(options: IListOptions): any {
        return {

            s: options.startDate,
            c: options.numberOfDays,
            rid: options.resource
        };
    }


    public static MapTransactionsListOptions(options: IListOptions): any {
        return {
            p: options.page || 1,
            s: options.size || Config.Basic.defaultSize
        };
    }

    public static MapNotificationsListOptions(options: IListOptions): any {
        return {
            d: options.startDate,
            s: options.size || Config.Basic.defaultSize
        };
    }

}

export class DataList<T>  {
    public mapper?: (dataitem: any) => T;


    // public static NewInstance(x: any): IList<any> {
    //     // map total and matches
    //     return {
    //         total: x.total,
    //         matches: x.matches
    //     };
    // }


    public NewDataList(dataset: any): IList<T> {
        return {
            total: dataset.total,
            matches: dataset.items.map(this.mapper)
        };
    }
}
