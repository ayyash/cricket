export interface IClientFileConfig {
    defaultUploadSize: number;
    defaultUploadFormat: string[];
}

export interface IClientFile {
    file: File;
    url: string;
}
export interface IFileHolder<T> {
    clientfile: IClientFile;
    artifact: T;
}

export interface IClientFileError {
    size: boolean;
    format: boolean;
    code?: string;
}

export interface IClientFileResponse {
    imageUrl?: string;
    error?: any;
}

export class ClientFile {
    public file: any;
    public url: string;
    // DATABASE MAPPING, this is why it cannot be public lib just yet
    // TODO: check mappings
    public static MapImageUrl(obj: any, error: any): IClientFileResponse {
        return {
            imageUrl: obj ? obj.photo_uri : null,
            error: error
        };
    }
}

export class FileHolder<T> implements IFileHolder<T> {
    constructor(public clientfile: IClientFile, public artifact: T) {}
    public static NewFileHolder(): IFileHolder<any> {
        return new FileHolder<any>({ url: null, file: null }, null);
    }
}
