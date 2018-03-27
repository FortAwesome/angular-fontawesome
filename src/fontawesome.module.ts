import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaIconComponent } from './icon';
import { FaLayersComponent, FaLayersTextComponent, FaLayersCounterComponent } from './layers';

@NgModule({
  imports: [CommonModule],
  declarations: [
    FaIconComponent,
    FaLayersComponent,
    FaLayersTextComponent,
    FaLayersCounterComponent
  ],
  exports: [
    FaIconComponent,
    FaLayersComponent,
    FaLayersTextComponent,
    FaLayersCounterComponent
  ],
})
export class FontAwesomeModule {
}
