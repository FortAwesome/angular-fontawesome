import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FaModule } from './fa.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
