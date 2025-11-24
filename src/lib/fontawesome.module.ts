import { NgModule } from '@angular/core';
import { FaDuotoneIconComponent } from './icon/duotone-icon.component';
import { FaDuotoneIconDirective } from './icon/duotone-icon.directive';
import { FaIconComponent } from './icon/icon.component';
import { FaIconDirective } from './icon/icon.directive';
import { FaLayersCounterComponent } from './layers/layers-counter.component';
import { FaLayersTextComponent } from './layers/layers-text.component';
import { FaLayersComponent } from './layers/layers.component';
import { FaStackItemSizeDirective } from './stack/stack-item-size.directive';
import { FaStackComponent } from './stack/stack.component';

@NgModule({
  imports: [
    FaIconComponent,
    FaIconDirective,
    FaDuotoneIconComponent,
    FaDuotoneIconDirective,
    FaLayersComponent,
    FaLayersTextComponent,
    FaLayersCounterComponent,
    FaStackComponent,
    FaStackItemSizeDirective,
  ],
  exports: [
    FaIconComponent,
    FaIconDirective,
    FaDuotoneIconComponent,
    FaDuotoneIconDirective,
    FaLayersComponent,
    FaLayersTextComponent,
    FaLayersCounterComponent,
    FaStackComponent,
    FaStackItemSizeDirective,
  ],
})
export class FontAwesomeModule {}
