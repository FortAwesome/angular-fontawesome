import { NgModule } from '@angular/core';
import { FaDuotoneIconComponent } from './icon/duotone-icon.component';
import { FaIconComponent } from './icon/icon.component';
import { FaLayersCounterComponent } from './layers/layers-counter.component';
import { FaLayersTextComponent } from './layers/layers-text.component';
import { FaLayersComponent } from './layers/layers.component';
import { FaStackItemSizeDirective } from './stack/stack-item-size.directive';
import { FaStackComponent } from './stack/stack.component';

@NgModule({
  declarations: [
    FaIconComponent,
    FaDuotoneIconComponent,
    FaLayersComponent,
    FaLayersTextComponent,
    FaLayersCounterComponent,
    FaStackComponent,
    FaStackItemSizeDirective,
  ],
  exports: [
    FaIconComponent,
    FaDuotoneIconComponent,
    FaLayersComponent,
    FaLayersTextComponent,
    FaLayersCounterComponent,
    FaStackComponent,
    FaStackItemSizeDirective,
  ],
})
export class FontAwesomeModule {}
