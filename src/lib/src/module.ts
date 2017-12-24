import { NgModule } from '@angular/core';

import { FaIconComponent } from './component/fa-icon.component';
import { LibService } from './service/lib.service';

@NgModule({
  declarations: [FaIconComponent],
  providers: [LibService],
  exports: [FaIconComponent]
})
export class LibModule { }
