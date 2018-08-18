import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ExampleComponent } from './example.component';
import { ExampleAlternatePrefixComponent } from './example-alternate-prefix.component';
import { FontAwesomeModule } from '../lib/public_api';

@NgModule({
    declarations: [
        ExampleComponent,
        ExampleAlternatePrefixComponent
    ],
    imports: [
        BrowserModule,
        FontAwesomeModule
    ],
    providers: [],
    bootstrap: [ExampleComponent]
})
export class AppModule { }
