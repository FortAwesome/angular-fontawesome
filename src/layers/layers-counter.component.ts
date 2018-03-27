import {
  Component,
  HostBinding
} from '@angular/core';
import {
  counter,
  Counter,
  CounterParams,
} from '@fortawesome/fontawesome-svg-core';
import { FaLayersTextBaseComponent } from './layers-text-base.component';

/**
 * Fontawesome layers counter.
 */
@Component({
  selector: 'fa-layers-counter',
  template: ''
})
export class FaLayersCounterComponent extends FaLayersTextBaseComponent {

  @HostBinding('class.ng-fa-layers-counter')
  private cssClass = true;

  /**
   * Updating params by component props.
   */
  protected updateParams() {
    this.params = {
      title: this.title,
      classes: this.classes,
      styles: this.styles,
    };
  }

  protected renderFontawesomeObject(content: string | number, params?: CounterParams) {
    return counter(content, params);
  }
}

