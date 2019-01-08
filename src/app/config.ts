import { environment } from '../environments/environment';


export const Config = {
    Basic: {
        loginRoute: '/user/login',
        defaultUserRoute: '/account',
        defaultRoute: '/',
        defaultSize: 25,
        defaultDateFormt: 'DD-MM-YYYY'
    },
    Auth: {
        userAccessKey: environment.userAccessKey
    },
    Cache: {
        Timeout: environment.dataCacheDefaultTimeout,
        Key: environment.dataCacheKey,
        ResetKey: environment.dataCacheResetKey,
        SearchParams: 'sparams'
    },
    API: {
        apiRoot: environment.apiRoot,
        apiVersion: 1,
        user: {
            profile: '/user/profile', // GET
            refresh: '/user/refresh_token',
            save: '/user/profile', // POST
            token: '/user/login',
            register: '/user/register',
            reset: '/user/reset',
            password: '/user/password',
            newpassword: '/user/newpassword'
        },
        data: {
            countries: '/data/countries'
        }
         // **gulpmodel**
    }
};

