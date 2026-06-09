import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FaLayersDirective } from './layers.directive';

/**
 * Fontawesome layers.
 */
@Component({
  selector: 'fa-layers',
  template: `<ng-content />`,
  hostDirectives: [{ directive: FaLayersDirective, inputs: ['size', 'fixedWidth'] }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaLayersComponent {}
