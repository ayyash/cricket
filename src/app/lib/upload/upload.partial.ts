import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input, Inject, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { IClientFile, IClientFileError, IClientFileResponse, IClientFileConfig } from './clientfile.model';
import { Res } from '../../core/resources';
import { Toast } from '../toast';
import { ClientFileService } from './clientfile.service';
import { take } from 'rxjs/operators';

// WATCH: its better not to allow this component to render on server side ever
@Component({
    selector: 'sh-upload',
    templateUrl: './upload.html',
    styleUrls: ['./upload.less'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadPartialComponent implements OnInit {
    @Output() onImageChange: EventEmitter<IClientFile> = new EventEmitter(null);

    @Output() onError: EventEmitter<IClientFileError> = new EventEmitter(null);

    @Output() onUpload: EventEmitter<IClientFileResponse> = new EventEmitter(null);

    @Input() imageUrl: string;
    @Input() postUrl: string;

    @Input() size: number;
    @Input() format: string[];

    constructor(
        @Inject('config') private config: IClientFileConfig,
        private sanitizer: DomSanitizer,
        private uploadService: ClientFileService
    ) {
        //
    }
    ngOnInit(): void {
        if (!this.size) {
            this.size = this.config.defaultUploadSize;
        }
        if (!this.format) {
            this.format = this.config.defaultUploadFormat;
        }
    }

    getSafeUrl(url: string): SafeUrl {
        return this.sanitizer.bypassSecurityTrustUrl(url);
    }

    getImage(input: HTMLInputElement): void {
        // filereader to load image on client
        // then place image in its own form and emit?! i need to upload after i create

        const files = input.files;
        const file = files.length ? files[0] : null;

        let _isvalid = true;
        const valid: IClientFileError = { size: true, format: true, code: '' };

        if (file) {
            // file types like "image/png"
            if (this.format.findIndex(n => file.type.indexOf(n) > -1) < 0) {
                valid.format = false;
                _isvalid = false;
            }

            if (file.size > this.size) {
                valid.size = false;
                _isvalid = false;
            }

            if (_isvalid) {
                if (typeof window !== 'undefined') {
                    this.imageUrl = window.URL.createObjectURL(file);
                }
                this.onImageChange.emit({ file, url: this.imageUrl });
                // do upload here
                this.uploadImage(file);
            } else {
                // handle most of the errors here
                this.errorOut(valid);
                this.onError.emit(valid);
            }
        } else {
            // emit error or return invalid container?
            valid.code = 'Unknown';
            this.onError.emit(valid);
        }
    }

    uploadImage(file: File) {
        // post url check first
        // TODO: emit an observable instead
        this.uploadService
            .UploadPhoto(file, this.postUrl)
            .pipe(take(1))
            .subscribe(imageResponse => this.onUpload.emit(imageResponse));
    }
    errorOut(valid: IClientFileError): void {
        // alert message and remove file

        if (!valid.format) {
            // replce format
            Toast.Show('', { extracss: 'error' }, Res.Get('INVALID_FILE_FORMAT').replace('$0', this.format.join(', ')));
        } else if (!valid.size) {
            // prettify size
            let _size = Math.floor(this.size / 1000); // KB
            if (_size > 1000) {
                _size = Math.floor(_size / 1000); // MB
            }
            Toast.Show('', { extracss: 'error' }, Res.Get('FILE_LARGE').replace('$0', _size.toString()));
        } else {
            Toast.Show(valid.code, { extracss: 'error' });
        }
    }
}
