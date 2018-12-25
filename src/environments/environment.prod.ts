
export const environment = {
    production: true,
    apiRoot: $.Cricket.Config.prod.apiRoot,
    userAccessKey: 'cricket.user',
    dataCacheDefaultTimeout: 48,
    dataCacheKey: 'cricekt.cache',
    dataCacheResetKey: $.Cricket.Config.prod.dataCacheResetKey // to force a reset
};
