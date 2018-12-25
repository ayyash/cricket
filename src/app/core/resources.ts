export class Res {
    private static _Keys = {
        Required: 'Required',
        SomeError: 'An error occurred',
        Error: 'An error occurred',
        Done: 'Done',
        Dismiss: 'Dismiss',
        NoResults: 'None found',
        More: 'more',
        Less: 'less',
        AddAnother: 'Add another',
        Unknown: 'Oops! We could not perform the required action for some reason. We are looking into it right now.',
        DONE: 'Done',
        NO_RESULTS: 'No results found!',
        PAGE_NOT_FOUND: 'Page not found!',
        UNAUTHORIZED: 'You do not have authization to perform this action',
        INVALID_RANGE: 'Range supplied is not valid',
        EMAIL_EXISTS: 'Email already exists',
        USER_EXISTS: 'User already exists',
        RESET_PASSWORD: 'An email with instructions to reset password has been sent to user.',
        SAVED: 'Saved successfully',
        DELETED: 'Deleted successfully',
        FILE_LARGE: 'The size of the file is larger than the specified limit',
        INVALID_VALUE: 'Value entered is not within the range allowed',
        INVALID_LENGTH: 'The length of the value entered is not within range allowed',
        INVALID_FORMAT: 'Invalid format',
        INAVLID_NUMBER: 'Not a number',
        INVALID_email_FORMAT: 'Invalid email format',
        INVALID_url_FORMAT: 'Invalid URL format',
        INVALID_phone_FORMAT: 'Invalid phone format',
        INVALID_date_FORMAT: 'Invalid date format',
        TOO_LONG: 'Value entered is longer than maximum allowed',
        TOO_SHORT: 'Value entered is shorter than minimum allowed',
        INVALID_DATE_RANGE: 'The start date must be sooner than the end or due date',
        INVALID_time_FORMAT: 'Invalid time format',
        AT_LEAST_ONE: 'Please, choose one service option to continue',
        INVALID_FORM: 'Some fields are not valid, fix and submit again.',
        Days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    };

    public static Get(key: string, fallback?: string): string {
        // if found return else generic
        if (this._Keys[key]) {
            return this._Keys[key];
        }

        return fallback || this._Keys.Unknown;
    }
}
