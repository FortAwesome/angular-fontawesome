import { Component } from '@angular/core';
import { initTest, queryByCss } from '../../testing/helpers';

describe('FaLayersCounterComponent', () => {
  it('should render counter layer', () => {
    @Component({
      selector: 'fa-host',
      template: `
        <fa-layers>
          <fa-layers-counter [content]="'Test'" [styles]="{ color: 'Tomato' }"></fa-layers-counter>
        </fa-layers>
      `,
    })
    class HostComponent {}

    const fixture = initTest(HostComponent);
    fixture.detectChanges();
    expect(queryByCss(fixture, 'fa-layers-counter > span')).toBeTruthy();
  });

  it('should throw an error if counter layer is used outside of fa-layers', () => {
    @Component({
      selector: 'fa-host',
      template: `<fa-layers-counter content="300"></fa-layers-counter> `,
    })
    class HostComponent {}

    expect(() => initTest(HostComponent)).toThrow(
      new Error('FaLayersCounterComponent should be used as child of FaLayersComponent only.'),
    );
  });
});
