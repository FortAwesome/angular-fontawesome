import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AlternatePrefixComponent } from './alternate-prefix.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent, AlternatePrefixComponent],
  imports: [BrowserModule, FontAwesomeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
