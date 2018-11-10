import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaIconComponent } from './icon/icon.component';
import { FaFalIconComponent } from './icon/prefix-icon/fal-icon.component';
import { FaFarIconComponent } from './icon/prefix-icon/far-icon.component';
import { FaFasIconComponent } from './icon/prefix-icon/fas-icon.component';
import { FaFabIconComponent } from './icon/prefix-icon/fab-icon.component';


import { FaLayersComponent } from './layers/layers.component';
import { FaLayersTextComponent } from './layers/layers-text.component';
import { FaLayersCounterComponent } from './layers/layers-counter.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    FaIconComponent,
    FaFalIconComponent,
    FaFarIconComponent,
    FaFasIconComponent,
    FaFabIconComponent,
    FaLayersComponent,
    FaLayersTextComponent,
    FaLayersCounterComponent
  ],
  exports: [
    FaIconComponent,
    FaFalIconComponent,
    FaFarIconComponent,
    FaFasIconComponent,
    FaFabIconComponent,
    FaLayersComponent,
    FaLayersTextComponent,
    FaLayersCounterComponent
  ],
})
export class FontAwesomeModule {
}
