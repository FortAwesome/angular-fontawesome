import { NgModule } from '@angular/core';
import { FaDuotoneIconComponent } from './icon/duotone-icon.component';
import { FaDuotoneIconDirective } from './icon/duotone-icon.directive';
import { FaIconComponent } from './icon/icon.component';
import { FaIconDirective } from './icon/icon.directive';
import { FaLayersCounterComponent } from './layers/layers-counter.component';
import { FaLayersCounterDirective } from './layers/layers-counter.directive';
import { FaLayersTextComponent } from './layers/layers-text.component';
import { FaLayersTextDirective } from './layers/layers-text.directive';
import { FaLayersComponent } from './layers/layers.component';
import { FaLayersDirective } from './layers/layers.directive';
import { FaStackItemSizeDirective } from './stack/stack-item-size.directive';
import { FaStackComponent } from './stack/stack.component';
import { FaStackDirective } from './stack/stack.directive';

@NgModule({
  imports: [
    FaIconComponent,
    FaIconDirective,
    FaDuotoneIconComponent,
    FaDuotoneIconDirective,
    FaLayersComponent,
    FaLayersDirective,
    FaLayersTextComponent,
    FaLayersTextDirective,
    FaLayersCounterComponent,
    FaLayersCounterDirective,
    FaStackComponent,
    FaStackDirective,
    FaStackItemSizeDirective,
  ],
  exports: [
    FaIconComponent,
    FaIconDirective,
    FaDuotoneIconComponent,
    FaDuotoneIconDirective,
    FaLayersComponent,
    FaLayersDirective,
    FaLayersTextComponent,
    FaLayersTextDirective,
    FaLayersCounterComponent,
    FaLayersCounterDirective,
    FaStackComponent,
    FaStackDirective,
    FaStackItemSizeDirective,
  ],
})
export class FontAwesomeModule {}
