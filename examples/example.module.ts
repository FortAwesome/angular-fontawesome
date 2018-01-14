import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ExampleComponent } from './example.component';
import { AngularFontawesomeModule } from '../index';

@NgModule({
    declarations: [
        ExampleComponent
    ],
    imports: [
        BrowserModule,
        AngularFontawesomeModule
    ],
    providers: [],
    bootstrap: [ExampleComponent]
})
export class ExampleModule { }
