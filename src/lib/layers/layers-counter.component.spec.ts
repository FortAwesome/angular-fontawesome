import { Component, inputBinding } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { queryByCss } from '../../testing/helpers';
import { FaLayersComponent } from './layers.component';
import { FaLayersCounterComponent } from './layers-counter.component';

describe('FaLayersCounterComponent', () => {
  it('should render counter layer', () => {
    @Component({
      selector: 'fa-host',
      imports: [FaLayersComponent, FaLayersCounterComponent],
      template: `
        <fa-layers>
          <fa-layers-counter [content]="'Test'" />
        </fa-layers>
      `,
    })
    class HostComponent {}

    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    expect(queryByCss(fixture, 'fa-layers-counter > span')).toBeTruthy();
  });

  it('should throw an error if counter layer is used outside of fa-layers', () => {
    expect(() =>
      TestBed.createComponent(FaLayersCounterComponent, { bindings: [inputBinding('content', () => 300)] }),
    ).toThrow(new Error('FaLayersCounterComponent should be used as child of FaLayersComponent only.'));
  });

  it('should include position class', () => {
    @Component({
      selector: 'fa-host',
      imports: [FaLayersComponent, FaLayersCounterComponent],
      template: `
        <fa-layers>
          <fa-layers-counter [position]="'bottom-left'" [content]="'Test'" />
        </fa-layers>
      `,
    })
    class HostComponent {}

    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    expect(queryByCss(fixture, '.fa-layers-bottom-left')).toBeTruthy();
  });
});
