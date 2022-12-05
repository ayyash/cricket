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
        defaultUploadFormat: ['gif', 'jpg', 'jpeg', 'png'],
        defaultToastTimeout: 5000
    },
    Res: {
      cookieName: 'cr-lang', // for netlify it's nf_lang
      languages: [{name: 'en', display: 'English'}, {name: 'ar', display: 'عربي'}],
      defaultLanguage: 'en' // not maintained
  },
    Auth: {
        userAccessKey: 'cricket.user'
    },
    Storage: {
        Timeout: 1,
        Key: 'localkey',
        ResetKey: '20180220'
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
        logoUrl: 'logo-url',
        defaultLanguage: 'en',
        defaultRegion: 'www',
        hrefLangs: [
            { region: 'COUNTRY_CODE', language: 'LANGUAGE' },
            { language: 'LANGUAGE' },
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

