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
        gaEnabled: true,
        tags: [
            { property: 'og:site_name', content: 'Cricket' },
            { property: 'og.type', content: 'website' },
            { property: 'twitter:site', content: '@cricket' },
            { property: 'twitter:card', content: 'summary_large_image' },
            { property: 'twitter:creator', content: '@cricket' },
            { name: 'author', content: 'Ayyash' }
        ],
        baseUrl: 'https://$0.cricket.com/$1/$2', // for multiregional multilingual
        defaultImage: 'cricket-image-url',
        defaultLanguage: 'en',
        defaultRegion: 'www',
        hrefLangs: [
            { region: 'ES', language: 'es' },
            { region: 'ES', language: 'en' },
            { region: 'MX', language: 'es' },
            { region: 'MX', language: 'en' },
            { language: 'de' },
            { language: 'fr' },
            { language: 'es' },
            { language: 'en' },
            { language: 'x-default' }
          ]
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

