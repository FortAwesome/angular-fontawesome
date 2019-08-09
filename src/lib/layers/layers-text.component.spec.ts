import { Component } from '@angular/core';
import { initTest, queryByCss } from '../../testing/helpers';

describe('FaLayersTextComponent', () => {
  it('should render text layer', () => {
    @Component({
      selector: 'fa-host',
      template: `
          <fa-layers>
              <fa-layers-text [content]="'Test'" [styles]="{ color: 'Tomato' }"></fa-layers-text>
          </fa-layers>`
    })
    class HostComponent {
    }

    const fixture = initTest(HostComponent);
    fixture.detectChanges();
    expect(queryByCss(fixture, 'fa-layers-text > span')).toBeTruthy();
  });
});
