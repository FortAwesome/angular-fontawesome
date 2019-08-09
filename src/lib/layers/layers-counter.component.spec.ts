import { Component } from '@angular/core';
import { initTest, queryByCss } from '../../testing/helpers';

describe('FaLayersCounterComponent', () => {
  it('should render counter layer', () => {
    @Component({
      selector: 'fa-host',
      template: `
          <fa-layers>
              <fa-layers-counter [content]="'Test'" [styles]="{ color: 'Tomato' }"></fa-layers-counter>
          </fa-layers>`
    })
    class HostComponent {
    }

    const fixture = initTest(HostComponent);
    fixture.detectChanges();
    expect(queryByCss(fixture, 'fa-layers-counter > span')).toBeTruthy();
  });
});
