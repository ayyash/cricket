import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadPartialComponent } from './upload.partial';
import { ClientFileService } from './clientfile.service';
import { IClientFileConfig } from './clientfile.model';

@NgModule({
    declarations: [UploadPartialComponent],
    imports: [
        CommonModule
    ],
    exports: [UploadPartialComponent]
})
export class UploadModule {
    static forRoot(config: IClientFileConfig): ModuleWithProviders {
        return {
            ngModule: UploadModule,
            providers: [ClientFileService, {provide: 'config', useValue: config}]
        };
    }
 }
