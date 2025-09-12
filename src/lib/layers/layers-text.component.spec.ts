import { Component, inputBinding } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { queryByCss } from '../../testing/helpers';
import { FaLayersComponent } from './layers.component';
import { FaLayersTextComponent } from './layers-text.component';

describe('FaLayersTextComponent', () => {
  it('should render text layer', () => {
    @Component({
      selector: 'fa-host',
      imports: [FaLayersComponent, FaLayersTextComponent],
      template: `
        <fa-layers>
          <fa-layers-text [content]="'Test'" />
        </fa-layers>
      `,
    })
    class HostComponent {}

    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    expect(queryByCss(fixture, 'fa-layers-text > span')).toBeTruthy();
  });

  it('should throw an error if text layer is used outside of fa-layers', () => {
    expect(() =>
      TestBed.createComponent(FaLayersTextComponent, { bindings: [inputBinding('content', () => 'Test')] }),
    ).toThrow(new Error('FaLayersTextComponent should be used as child of FaLayersComponent only.'));
  });
});
