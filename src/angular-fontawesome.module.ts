import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [

    ],
    exports: [

    ],
    imports: [
        CommonModule
    ]
})
export class AngularFontawesomeModule {
    static forRoot() {
        return {
            ngModule: AngularFontawesomeModule,
            providers: []
        };
    }
}
