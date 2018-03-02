import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaIconComponent } from './icon';
import { FaLayersComponent, FaLayersTextComponent } from './layers';

@NgModule({
  imports: [CommonModule],
  declarations: [
    FaIconComponent,
    FaLayersComponent,
    FaLayersTextComponent
  ],
  exports: [
    FaIconComponent,
    FaLayersComponent,
    FaLayersTextComponent
  ],
})
export class FontAwesomeModule {
}
