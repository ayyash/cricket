
import { LoaderComponent } from '../components/common/loader.partial';
import { GtmDirective } from '../lib/directives/gtm.directive';
import { AppShellRenderDirective } from '../lib/directives/render.directive';
import { ResPipe } from '../lib/pipes/res.pipe';
import { TranslatePipe } from '../lib/pipes/translate.pipe';
import { ToastPartialComponent } from '../lib/toast/toast.partial';

export const SHARED_COMPONENTS = [
  // add common standalone components
  LoaderComponent,
  ToastPartialComponent,
  AppShellRenderDirective,
  TranslatePipe,
  GtmDirective,
  ResPipe
] as const;
