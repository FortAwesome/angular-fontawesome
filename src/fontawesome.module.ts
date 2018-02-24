import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaIconComponent } from './icon';
import { FaTextComponent } from './text';
import { FaLayersComponent } from './layers';

@NgModule({
  imports: [CommonModule],
  declarations: [
    FaIconComponent,
    FaTextComponent,
    FaLayersComponent
  ],
  exports: [
    FaIconComponent,
    FaTextComponent,
    FaLayersComponent
  ],
})
export class FontAwesomeModule {
}
