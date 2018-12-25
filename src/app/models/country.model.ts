import { IData, EnumDataType, DataClass } from '../core/services';


export interface ICountry extends IData {
    currency?: IData; // the default currency of this country
    timezone?: string; // the default timezone
 }


export class Country implements ICountry {
    constructor(
        public type: EnumDataType = EnumDataType.Country,
        public id?: string,
        public name?: string,
        public key?: string,
        public currency?: IData,
        public timezone?: string
    ) {

    }
    public static NewInstance(country: any): ICountry {
        return new Country(
            EnumDataType.Country,
            country.id, // questiong this
            country.name,
            country.code,
            country.defaultCurrency ? DataClass.NewInstance(EnumDataType.Currency, country.defaultCurrency) : null,
            country.defaultTimezone ? country.defaultTimezone : 'GMT'
        );
    }
    public static NewInstances(countries: any[]): ICountry[] {
        return countries.map(Country.NewInstance);
    }
}

