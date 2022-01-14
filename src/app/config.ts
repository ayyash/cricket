import { environment } from '../environments/environment';


export const Config = {
    isServed: false,
    Basic: {
        language: resources.language,
        country: resources.country,
        defaultRoute: '/',
        defaultSize: 25,
        defaultDateFormt: 'DD-MM-YYYY',
        defaultUploadSize: 1048576,
        defaultUploadFormat: ['gif', 'jpg', 'jpeg', 'png']
    },
    Auth: {
        userAccessKey: 'cricket.user'
    },
    Cache: {
        Timeout: 1,
        Key: 'cricket.cache.' + resources.language,
        ResetKey: 'cricket.20190208'
    },
    Seo: {
        gaEnabled: true
    },
    API: {
        apiRoot: environment.apiRoot,
        apiVersion: 1,
        data: {
            notdefined: '/data/notdefined'
        },
        config: {
            local: environment.localConfig
        }
         // **gulpmodel**
    }
};

