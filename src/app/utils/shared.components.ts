
import { GtmDirective } from '../lib/directives/gtm.directive';
import { RenderDirective } from '../lib/directives/render.directive';
import { LoaderPartial } from '../lib/loader/loader.partial';
import { ResPipe } from '../lib/pipes/res.pipe';
import { TranslatePipe } from '../lib/pipes/translate.pipe';

export const SHARED_COMPONENTS = [
  // add common standalone components
  LoaderPartial,
  RenderDirective,
  TranslatePipe,
  GtmDirective,
  ResPipe
] as const;
