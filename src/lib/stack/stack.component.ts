import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FaStackDirective } from './stack.directive';

@Component({
  selector: 'fa-stack',
  template: `<ng-content />`,
  hostDirectives: [{ directive: FaStackDirective, inputs: ['size'] }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaStackComponent {}
