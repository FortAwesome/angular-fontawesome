import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '../../../../src/lib/public_api';
import { AppComponent } from './app.component';
import { AlternatePrefixComponent } from './alternate-prefix.component';

@NgModule({
  declarations: [
    AppComponent,
    AlternatePrefixComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
