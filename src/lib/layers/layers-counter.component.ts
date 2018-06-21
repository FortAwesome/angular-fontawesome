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
  template: '',
  host: {
    class: 'ng-fa-layers-counter'
  }
})
export class FaLayersCounterComponent extends FaLayersTextBaseComponent {

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

