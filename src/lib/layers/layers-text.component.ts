import { Component, Input } from '@angular/core';
import { FlipProp, parse, PullProp, RotateProp, SizeProp, text, TextParams, Transform } from '@fortawesome/fontawesome-svg-core';

import { FaProps } from '../shared/models/props.model';
import { faClassList } from '../shared/utils/classlist.util';
import { FaLayersTextBaseComponent } from './layers-text-base.component';

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

    const parsedTransform = typeof this.transform === 'string' ? parse.transform(this.transform) : this.transform;

    this.params = {
      transform: parsedTransform,
      classes: [...faClassList(classOpts), ...this.classes],
      title: this.title,
      styles: this.styles
    };
  }

  protected renderFontawesomeObject(content: string, params?: TextParams) {
    return text(content, params);
  }
}

