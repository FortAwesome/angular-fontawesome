import { NgModule } from '@angular/core';

import { FaIconComponent } from './component/fa-icon.component';
import { FontawesomeService } from './service/fontawesome.service';

@NgModule({
  declarations: [FaIconComponent],
  providers: [FontawesomeService],
  exports: [FaIconComponent]
})
export class LibModule { }
