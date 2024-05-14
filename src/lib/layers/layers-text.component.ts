import { DOCUMENT } from '@angular/common';
import { Component, HostBinding, inject, Input, OnChanges, Optional, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {
  FlipProp,
  parse,
  PullProp,
  RotateProp,
  SizeProp,
  text,
  TextParams,
  Transform,
} from '@fortawesome/fontawesome-svg-core';
import { FaConfig } from '../config';
import { faWarnIfParentNotExist } from '../shared/errors/warn-if-parent-not-exist';
import { FaProps } from '../shared/models/props.model';
import { faClassList } from '../shared/utils/classlist.util';
import { ensureCss } from '../shared/utils/css';
import { FaLayersComponent } from './layers.component';

@Component({
  selector: 'fa-layers-text',
  standalone: true,
  template: '',
  host: {
    class: 'ng-fa-layers-text',
  },
})
export class FaLayersTextComponent implements OnChanges {
  @Input() content: string;
  @Input() title?: string;
  @Input() flip?: FlipProp;
  @Input() size?: SizeProp;
  @Input() pull?: PullProp;
  @Input() border?: boolean;
  @Input() inverse?: boolean;
  @Input() rotate?: RotateProp;
  @Input() fixedWidth?: boolean;
  @Input() transform?: string | Transform;

  @HostBinding('innerHTML') renderedHTML: SafeHtml;

  private document = inject(DOCUMENT);
  private config = inject(FaConfig);

  constructor(
    @Optional() private parent: FaLayersComponent,
    private sanitizer: DomSanitizer,
  ) {
    faWarnIfParentNotExist(this.parent, 'FaLayersComponent', this.constructor.name);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes) {
      const params = this.buildParams();
      this.updateContent(params);
    }
  }

  /**
   * Updating params by component props.
   */
  protected buildParams(): TextParams {
    const classOpts: FaProps = {
      flip: this.flip,
      border: this.border,
      inverse: this.inverse,
      size: this.size || null,
      pull: this.pull || null,
      rotate: this.rotate || null,
      fixedWidth: this.fixedWidth,
    };

    const parsedTransform = typeof this.transform === 'string' ? parse.transform(this.transform) : this.transform;

    return {
      transform: parsedTransform,
      classes: faClassList(classOpts),
      title: this.title,
    };
  }

  private updateContent(params: TextParams) {
    ensureCss(this.document, this.config);
    this.renderedHTML = this.sanitizer.bypassSecurityTrustHtml(text(this.content || '', params).html.join('\n'));
  }
}
