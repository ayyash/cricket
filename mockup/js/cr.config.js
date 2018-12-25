(function($) {
    if (!$.Cricket) {
        $.Cricket = {};
    }
    $.Cricket.Config = {
        dev: {
            // # UpdateCache
            dataCacheResetKey: 'cricket.20180913',
            apiRoot: 'http://localhost:50001/api',
            defaultCountryId: 6
        },
        prod: {
            dataCacheResetKey: 'cricket.20180919',
            apiRoot: '//40.121.68.118/api',
            defaultCountryId: 15
        }
    };
})(jQuery);
