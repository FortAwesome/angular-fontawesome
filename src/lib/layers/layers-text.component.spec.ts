import { Component } from '@angular/core';
import { initTest, queryByCss } from '../../testing/helpers';

describe('FaLayersTextComponent', () => {
  it('should render text layer', () => {
    @Component({
      selector: 'fa-host',
      template: `
        <fa-layers>
          <fa-layers-text [content]="'Test'" [styles]="{ color: 'Tomato' }"></fa-layers-text>
        </fa-layers>
      `,
    })
    class HostComponent {}

    const fixture = initTest(HostComponent);
    fixture.detectChanges();
    expect(queryByCss(fixture, 'fa-layers-text > span')).toBeTruthy();
  });

  it('should throw an error if text layer is used outside of fa-layers', () => {
    @Component({
      selector: 'fa-host',
      template: `<fa-layers-text content="Test"></fa-layers-text> `,
    })
    class HostComponent {}

    expect(() => initTest(HostComponent)).toThrow(
      new Error('FaLayersTextComponent should be used as child of FaLayersComponent only.'),
    );
  });
});
