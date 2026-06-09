import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FaIconDirective } from './icon.directive';

@Component({
  selector: 'fa-icon',
  template: ``,
  hostDirectives: [
    {
      directive: FaIconDirective,
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
export class FaIconComponent {}
