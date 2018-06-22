import {
  Input,
  Component,
  HostBinding
} from '@angular/core';
import {
  text,
  parse,
  Text,
  TextParams,
  SizeProp,
  FlipProp,
  PullProp,
  Transform,
  RotateProp
} from '@fortawesome/fontawesome-svg-core';
import { FaLayersTextBaseComponent } from './layers-text-base.component';

import { FaProps } from '../shared/models/props.model';
import { objectWithKey } from '../shared/utils/object-with-keys.util';
import { faClassList } from '../shared/utils/classlist.util';

/**
 * Fontawesome layers text.
 */
@Component({
  selector: 'fa-layers-text',
  template: '',
  host: {
    class: 'ng-fa-layers-text'
  }
})
export class FaLayersTextComponent extends FaLayersTextBaseComponent {

  @Input() spin?: boolean;
  @Input() pulse?: boolean;
  @Input() flip?: FlipProp;
  @Input() size?: SizeProp;
  @Input() pull?: PullProp;
  @Input() border?: boolean;
  @Input() inverse?: boolean;
  @Input() listItem?: boolean;
  @Input() rotate?: RotateProp;
  @Input() fixedWidth?: boolean;
  @Input() transform?: string | Transform;

  /**
   * Updating params by component props.
   */
  protected updateParams() {
    const classOpts: FaProps = {
      flip: this.flip,
      spin: this.spin,
      pulse: this.pulse,
      border: this.border,
      inverse: this.inverse,
      listItem: this.listItem,
      size: this.size || null,
      pull: this.pull || null,
      rotate: this.rotate || null,
      fixedWidth: this.fixedWidth
    };

    const classes = objectWithKey('classes', [...faClassList(classOpts), ...this.classes]);
    const parsedTransform = typeof this.transform === 'string' ? parse.transform(this.transform) : this.transform;
    const transform = objectWithKey('transform', parsedTransform);

    this.params = {
      ...transform,
      ...classes,
      title: this.title,
      styles: this.styles
    };
  }

  protected renderFontawesomeObject(content: string, params?: TextParams) {
    return text(content, params);
  }
}

