import { Directive, effect, input } from '@angular/core';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { FaStackComponent } from './stack.component';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'fa-icon[stackItemSize],fa-duotone-icon[stackItemSize]',
})
export class FaStackItemSizeDirective {
  /**
   * Specify whether icon inside {@link FaStackComponent} should be rendered in
   * regular size (1x) or as a larger icon (2x).
   */
  readonly stackItemSize = input<'1x' | '2x'>('1x');

  /**
   * @internal
   */
  readonly size = input<SizeProp>();

  _effect = effect(() => {
    const size = this.size();
    if (size) {
      throw new Error(
        'fa-icon is not allowed to customize size when used inside fa-stack. ' +
          'Set size on the enclosing fa-stack instead: <fa-stack size="4x">...</fa-stack>.',
      );
    }
  });
}
