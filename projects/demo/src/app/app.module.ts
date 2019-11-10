import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AlternatePrefixComponent } from './alternate-prefix.component';
import { AppComponent } from './app.component';
import { ExplicitReferenceComponent } from './testing/explicit-reference.component';
import { IconLibraryComponent } from './testing/icon-library.component';

@NgModule({
  declarations: [AppComponent, AlternatePrefixComponent, ExplicitReferenceComponent, IconLibraryComponent],
  imports: [BrowserModule, FontAwesomeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
