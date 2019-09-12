import { environment } from '../environments/environment';


export const Config = {
    Basic: {
        language: environment.language,
        defaultRoute: '/',
        defaultSize: 25,
        defaultDateFormt: 'DD-MM-YYYY'
    },
    Auth: {
        userAccessKey: 'cricket.user'
    },
    Cache: {
        Timeout: 1,
        Key: 'cricket.cache',
        ResetKey: 'cricket.20190208'
    },
    API: {
        apiRoot: environment.apiRoot,
        apiVersion: 1,
        data: {
            countries: '/data/countries'
        },
        config: {
            local: 'localdata/config.json'
        }
         // **gulpmodel**
    }
};

