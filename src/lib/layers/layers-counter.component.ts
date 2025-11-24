import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FaLayersCounterDirective } from './layers-counter.directive';

@Component({
  selector: 'fa-layers-counter',
  template: '',
  hostDirectives: [{ directive: FaLayersCounterDirective, inputs: ['content', 'title', 'position'] }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaLayersCounterComponent {}
