(function($) {
    if (!$.Cricket) {
        $.Cricket = {};
    }
    $.Cricket.Config = {
        dev: {
            // # UpdateCache
            dataCacheResetKey: 'cricket.20180913',
            apiRoot: 'http://localhost:0000/api'

        },
        prod: {
            dataCacheResetKey: 'cricket.20180919',
            apiRoot: '//ssssss/api'
        }
    };
})(jQuery);
