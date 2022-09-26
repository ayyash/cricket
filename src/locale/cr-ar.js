
// TODO: make use of this
function getCountry() {
   if (window) {
      const _country = document.cookie.split(';').find(n => n.indexOf('country') > -1);
      if (_country) {
         return _country.split('=')[1];
      }
   }
   return 'JO';
}

// make it run on both platforms
(function (global) {

   const _LocaleId = 'ar-JO';
   const _Language = 'ar';


   if (window != null) {
      // in browser platform
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.defer = true;
      script.src = `locale/${_LocaleId}.js`;
      document.head.appendChild(script);

   } else {
      // in server platform
      require(`./${_LocaleId}.js`);
   }

   // TODO: translate
   const keys = {
      NoRes: '', // if resource is not found
      Required: 'Required',
      Error: 'An error occurred',
      Dismiss: 'Dismiss',
      Unknown: 'Oops! We could not perform the required action for some reason. We are looking into it right now.',
      NoRes: 'Oops! We could not perform the required action for some reason. We are looking into it right now.',
      DONE: 'Done',
      UNAUTHORIZED: 'You are not authorised to view this page.',
      SAVED: 'Saved successfully',
      INVALID_VALUE: 'Value entered is not within the range allowed',
      INVALID_LENGTH: 'The length of the value entered is not within range allowed',
      INVALID_FORMAT: 'Invalid format',
      INAVLID_NUMBER: 'Not a number',
      INVALID_email_FORMAT: 'Invalid email format',
      INVALID_url_FORMAT: 'Invalid URL format',
      INVALID_phone_FORMAT: 'Invalid phone format',
      ALREADY_EXISTS: 'The email you used has already been signed up. Use another one, or try to sign in.',
      INVALID_date_FORMAT: 'Invalid date format',
      FILE_LARGE: 'The size of the file is larger than the specified limit ($0 KB)',
      INVALID_FILE_FORMAT: 'The format of the file is not allowed. Allowed formats are: $0',
      PAGE_NOT_FOUND: 'Hmm! Once in a while, we change address and forget to update the mailman.',
      INVALID_FORM: 'Some fields are not valid, fix and submit again.',
      INVALID_LOGIN: 'Wrong username or password.',
      Login: 'Sign in',
      SECONDS: { 1: 'one second', 2: 'few seconds', 10: '$0 seconds' },
      MINUTES: { 1: 'one minute', 2: 'few minutes', 9: '$0 minutes' },
      HOURS: { 1: 'one hour', 2: 'few hours', 9: '$0 hours' },
      DAYS: { 1: 'one day', 2: 'few days', 9: '$0 days' },
      MONTHS: { 1: 'one month', 2: 'few months', 4: '$0 months' },
      YEARS: { 1: 'one year', 2: '$0 years', 5: 'many years' },
      TIMEAGO: '$0 ago',
      INTIME: 'in $0',
      Results: { 0: 'no results', 1: 'one result', 2: 'two results', 3: '$0 results' },
      SEO_CONTENT: {
         HOME_TITLE: 'Home',
         HOME: 'Home'
      },
      PAGE_TITLES: {
         ERROR: 'Oh oh, an error occurred',
         NOT_FOUND: '404! Hmm! Once in a while, we change address and forget to update the mailman.'
      },
      DEFAULT_PAGE_TITLE: 'Welcome',
      // inject:translations
      // endinject
   };

   global.cr = global.cr || {};
   global.cr.resources = {
      language: _Language,
      keys,
      localeId: _LocaleId
   }

   // for nodejs
   global.cr[_Language] = global.cr.resources;



})(typeof globalThis !== 'undefined' && globalThis || typeof global !== 'undefined' && global ||
   typeof window !== 'undefined' && window);
