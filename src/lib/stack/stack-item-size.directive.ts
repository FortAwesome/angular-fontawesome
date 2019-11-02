import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { FaStackComponent } from './stack.component';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'fa-icon[stackItemSize],fa-duotone-icon[stackItemSize]',
})
export class FaStackItemSizeDirective implements OnChanges {
  /**
   * Specify whether icon inside {@link FaStackComponent} should be rendered in
   * regular size (1x) or as a larger icon (2x).
   */
  @Input() stackItemSize: '1x' | '2x' = '1x';

  /**
   * @internal
   */
  @Input() size?: SizeProp;

  ngOnChanges(changes: SimpleChanges) {
    if ('size' in changes) {
      throw new Error(
        'fa-icon is not allowed to customize size when used inside fa-stack. ' +
          'Set size on the enclosing fa-stack instead: <fa-stack size="4x">...</fa-stack>.',
      );
    }
  }
}
