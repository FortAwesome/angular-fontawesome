import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FaLayersTextDirective } from './layers-text.directive';

@Component({
  selector: 'fa-layers-text',
  template: '',
  hostDirectives: [
    {
      directive: FaLayersTextDirective,
      inputs: ['content', 'title', 'flip', 'size', 'pull', 'border', 'inverse', 'rotate', 'fixedWidth', 'transform'],
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaLayersTextComponent {}
