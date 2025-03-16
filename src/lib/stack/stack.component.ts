import { Component, input, computed } from '@angular/core';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'fa-stack',
  template: `<ng-content></ng-content>`,
  host: {
    '[class]': 'classes()',
  },
})
export class FaStackComponent {
  /**
   * Size of the stacked icon.
   * Note that stacked icon is by default 2 times bigger, than non-stacked icon.
   * You'll need to set size using custom CSS to align stacked icon with a
   * simple one. E.g. `fa-stack { font-size: 0.5em; }`.
   */
  readonly size = input<SizeProp>();

  readonly classes = computed(() => {
    const sizeValue = this.size();
    const sizeClass = sizeValue ? { [`fa-${sizeValue}`]: true } : {};
    return {
      ...sizeClass,
      'fa-stack': true,
    };
  });
}
