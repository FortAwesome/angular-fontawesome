import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FaDuotoneIconDirective } from './duotone-icon.directive';

@Component({
  selector: 'fa-duotone-icon',
  template: ``,
  hostDirectives: [
    {
      directive: FaDuotoneIconDirective,
      inputs: [
        'icon',
        'title',
        'animation',
        'mask',
        'flip',
        'size',
        'pull',
        'border',
        'inverse',
        'symbol',
        'rotate',
        'fixedWidth',
        'transform',
        'a11yRole',
        'swapOpacity',
        'primaryOpacity',
        'secondaryOpacity',
        'primaryColor',
        'secondaryColor',
      ],
      outputs: [
        'iconChange',
        'titleChange',
        'animationChange',
        'maskChange',
        'flipChange',
        'sizeChange',
        'pullChange',
        'borderChange',
        'inverseChange',
        'symbolChange',
        'rotateChange',
        'fixedWidthChange',
        'transformChange',
        'a11yRoleChange',
      ],
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaDuotoneIconComponent {}
