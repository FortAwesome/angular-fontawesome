import {
  Input,
  OnChanges,
  Component,
  ElementRef,
  HostBinding,
  SimpleChanges,
  AfterContentInit,
  ChangeDetectionStrategy
} from '@angular/core';
import {
  text,
  Text,
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
import { FaProps } from '../shared/models';

/**
 * Fontawesome text.
 */
@Component({
  selector: 'fa-text',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FaTextComponent implements AfterContentInit, OnChanges {
  public text: Text;

  constructor(private elementRef: ElementRef, private sanitizer: DomSanitizer) {}

  @HostBinding('class.ng-fa-text')
  private cssClass = true;

  @HostBinding('innerHTML')
  private renderedTextHTML: SafeHtml;

  private params: Params;
  private content: string;

  @Input() private classes?: string[] = [];
  @Input() private styles?: Styles;
  @Input() private fixedWidth?: boolean;
  @Input() private counter?: boolean;
  @Input() private spin?: boolean;
  @Input() private pulse?: boolean;
  @Input() private border?: boolean;
  @Input() private listItem?: boolean;
  @Input() private inverse?: boolean;
  @Input() private flip?: FlipProp;
  @Input() private size?: SizeProp;
  @Input() private rotate?: RotateProp;
  @Input() private pull?: PullProp;
  @Input() private transform?: string | Transform;

  ngOnChanges(changes: SimpleChanges) {
    if (changes) {
      this.updateParams();
      this.updateText();
      this.renterText();
    }
  }

  ngAfterContentInit() {
    this.updateContent();
    this.updateText();
    this.renterText();
  }

  /**
   * Updates content.
   */
  private updateContent() {
    this.content = this.elementRef.nativeElement.innerText.trim();
  }

  /**
   * Updates params by component props.
   */
  private updateParams() {
    const classOpts: FaProps = {
      spin: this.spin,
      pulse: this.pulse,
      fixedWidth: this.fixedWidth,
      border: this.border,
      listItem: this.listItem,
      inverse: this.inverse,
      flip: this.flip,
      size: this.size || null,
      rotate: this.rotate || null,
      pull: this.pull || null
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
   * Updates text by params and content.
   */
  private updateText() {
    this.text = text(this.content, this.params);
  }

  private renterText() {
    if (this.content) {
      this.renderedTextHTML = this.sanitizer.bypassSecurityTrustHtml(this.text && this.text.html[0]);
    }
  }
}
