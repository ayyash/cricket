

export interface IClientFile {
    file: File;
    url: string;

}
export interface IFileHolder<T> {
    clientfile: IClientFile;
    artefact: T;

}

export interface IImageError {
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

    public static MapImageUrl(obj: any): string {
        return obj.imageUrl; // for apis that return imageUrl
    }

}

export class FileHolder<T> implements IFileHolder<T> {
    constructor(
        public clientfile: IClientFile,
        public artefact: T
    ) {

    }
    public static NewFileHolder(): IFileHolder<any> {
        return new FileHolder<any>({ url: null, file: null }, null);
    }
}
