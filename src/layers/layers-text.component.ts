import {
  Input,
  Inject,
  Optional,
  OnChanges,
  Component,
  forwardRef,
  HostBinding,
  SimpleChanges
} from '@angular/core';
import {
  text,
  parse,
  Params,
  Styles,
  SizeProp,
  FlipProp,
  PullProp,
  Transform,
  RotateProp
} from '@fortawesome/fontawesome';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { objectWithKey, faClassList } from '../shared/utils';
import { faWarnIfParentNotExist } from '../shared/errors';
import { FaProps } from '../shared/models';

import { FaLayersComponent } from './layers.component';

/**
 * Fontawesome layers text.
 */
@Component({
  selector: 'fa-layers-text',
  template: ''
})
export class FaLayersTextComponent implements OnChanges {

  constructor(@Inject(forwardRef(() => FaLayersComponent)) @Optional() private parent: FaLayersComponent,
    private sanitizer: DomSanitizer) {

    faWarnIfParentNotExist(this.parent, 'FaLayersComponent', 'FaLayersTextComponent');
  }

  @HostBinding('class.ng-fa-layers-text')
  private cssClass = true;

  @HostBinding('innerHTML')
  private renderedTextHTML: SafeHtml;

  private params: Params;

  @Input() private content: string;
  @Input() private styles?: Styles;
  @Input() private spin?: boolean;
  @Input() private pulse?: boolean;
  @Input() private flip?: FlipProp;
  @Input() private size?: SizeProp;
  @Input() private pull?: PullProp;
  @Input() private border?: boolean;
  @Input() private counter?: boolean;
  @Input() private inverse?: boolean;
  @Input() private listItem?: boolean;
  @Input() private rotate?: RotateProp;
  @Input() private fixedWidth?: boolean;
  @Input() private classes?: string[] = [];
  @Input() private transform?: string | Transform;

  ngOnChanges(changes: SimpleChanges) {
    if (changes) {
      this.updateParams();
      this.updateText();
    }
  }

  /**
   * Updating params by component props.
   */
  private updateParams() {
    const classOpts: FaProps = {
      flip: this.flip,
      spin: this.spin,
      pulse: this.pulse,
      border: this.border,
      inverse: this.inverse,
      counter: this.counter,
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
      styles: this.styles
    };
  }

  /**
   * Updating text by params and content.
   */
  private updateText() {
    this.renderedTextHTML = this.sanitizer.bypassSecurityTrustHtml(
      text(this.content || '', this.params).html[0]
    );
  }
}

