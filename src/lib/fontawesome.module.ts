import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaIconComponent } from './icon/icon.component';
import { FaLayersComponent } from './layers/layers.component';
import { FaLayersTextComponent } from './layers/layers-text.component';
import { FaLayersCounterComponent } from './layers/layers-counter.component';
import { FaStackComponent } from './stack/stack.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    FaIconComponent,
    FaLayersComponent,
    FaLayersTextComponent,
    FaLayersCounterComponent,
    FaStackComponent,
  ],
  exports: [
    FaIconComponent,
    FaLayersComponent,
    FaLayersTextComponent,
    FaLayersCounterComponent,
    FaStackComponent,
  ],
})
export class FontAwesomeModule {
}
