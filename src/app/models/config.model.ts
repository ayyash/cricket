
export interface IConfig {
    isServed: boolean;
    API: {
        apiRoot: string;
    };
    Auth: {
        userAccessKey: string;
    };
    Storage: {
        Timeout: number;
        Key: string;
        ResetKey: string;
    };
    Seo: {
        gaEnabled: boolean;
    }

}
