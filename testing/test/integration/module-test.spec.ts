import { Component } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FontAwesomeTestingModule } from 'testing/src/public_api';

@Component({
    selector: 'fa-host',
    template: '<fa-icon icon="someicon"></fa-icon>'
})
class HostComponent {
}

describe('Using the `FontAwesomeTestingModule', () => {
    let component: HostComponent;
    let fixture: ComponentFixture<HostComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                FontAwesomeTestingModule
            ],
            declarations: [
                HostComponent
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HostComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should allow you to import the module without errors', () => {
        expect(component).toBeTruthy();
    });
});
