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

import { objectWithKey, faClassList } from '../shared/utils';
import { FaProps } from '../shared/models';

/**
 * Fontawesome layers text.
 */
@Component({
  selector: 'fa-layers-text',
  template: ''
})
export class FaLayersTextComponent extends FaLayersTextBaseComponent {

  @HostBinding('class.ng-fa-layers-text')
  private cssClass = true;

  @Input() private spin?: boolean;
  @Input() private pulse?: boolean;
  @Input() private flip?: FlipProp;
  @Input() private size?: SizeProp;
  @Input() private pull?: PullProp;
  @Input() private border?: boolean;
  @Input() private inverse?: boolean;
  @Input() private listItem?: boolean;
  @Input() private rotate?: RotateProp;
  @Input() private fixedWidth?: boolean;
  @Input() private transform?: string | Transform;

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

