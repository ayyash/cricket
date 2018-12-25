// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
window['_indebug'] = true;

export const environment = {
    production: false,
    apiRoot: $.Cricket.Config.dev.apiRoot,
    userAccessKey: 'cricket.user',
    dataCacheDefaultTimeout: 1, // in hours
    dataCacheKey: 'cricket.cache',
    dataCacheResetKey: $.Cricket.Config.dev.dataCacheResetKey
};
