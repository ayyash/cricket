import { IUser } from '../core/services';
import { User } from './user.model';

export interface IAuthInfo {
    user?: IUser;
    accessToken?: string;
    expiresIn?: number;
    expiresAt?: any;

    password?: string;
}

export class AuthInfo implements IAuthInfo {
    public expiresAt?: any;

    constructor(public user?: any, public accessToken?: string, public expiresIn?: number) {}

    public static NewInstance(auth: any): IAuthInfo {
        return new AuthInfo(
            auth.profile ? User.NewInstance(auth.payload) : null,
            auth.accesstoken,
            auth.expiresIn
        );
    }

    // get access token on login
    public static PrepAccessToken(username: string, password: string): any {
        // prepare the body of request login data
        return {
            username: username,
            password: password
            // grant_type: 'password' // no need
        };
    }

    public static PrepReset(username: string): any {
        return {
            email: username
        };
    }
    public static PrepSaveNew(password: string, code: string): any {
        return {
            newPassword: password, // APIFIX: newPassword
            passwordCode: code
        };
    }
    // public static PrepRefreshToken(auth: IAuthInfo): any {
    //     return {
    //         // what does refreshtoken point need?
    //     };
    // }
    public static UpdateInfo(authUser: IAuthInfo, updateUser: any): IAuthInfo {
        // update authuser with new incoming values
        const newUser: IAuthInfo = Object.assign({}, authUser);
        newUser.accessToken = updateUser.accesstoken;
        newUser.expiresIn = updateUser.expiresIn;
        // newUser.idToken = updateUser.idToken;

        return newUser;
    }
}
