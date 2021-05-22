
import './app/core/common';
import './app/core/logger.service';

import { environment } from './environments/environment';
import { enableProdMode } from '@angular/core';
if (environment.production) {
  enableProdMode();
}

export { AppServerModule } from './app/app.server.module';
export { renderModule, renderModuleFactory } from '@angular/platform-server';
