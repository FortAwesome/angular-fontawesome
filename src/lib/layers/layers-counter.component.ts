import { DOCUMENT } from '@angular/common';
import { Component, HostBinding, inject, OnChanges, SimpleChanges, input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { counter, CounterParams } from '@fortawesome/fontawesome-svg-core';
import { FaConfig } from '../config';
import { faWarnIfParentNotExist } from '../shared/errors/warn-if-parent-not-exist';
import { ensureCss } from '../shared/utils/css';
import { FaLayersComponent } from './layers.component';

@Component({
  selector: 'fa-layers-counter',
  template: '',
  host: {
    class: 'ng-fa-layers-counter',
  },
})
export class FaLayersCounterComponent implements OnChanges {
  readonly content = input.required<string>();
  readonly title = input<string>();
  readonly position = input<'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'>();

  @HostBinding('innerHTML') renderedHTML: SafeHtml;

  private document = inject(DOCUMENT);
  private config = inject(FaConfig);
  private parent = inject(FaLayersComponent, { optional: true });
  private sanitizer = inject(DomSanitizer);

  constructor() {
    faWarnIfParentNotExist(this.parent, 'FaLayersComponent', this.constructor.name);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes) {
      const params = this.buildParams();
      this.updateContent(params);
    }
  }

  protected buildParams(): CounterParams {
    return {
      title: this.title(),
      classes: this.position != null ? [`fa-layers-${this.position()}`] : undefined,
    };
  }

  private updateContent(params: CounterParams) {
    ensureCss(this.document, this.config);
    this.renderedHTML = this.sanitizer.bypassSecurityTrustHtml(counter(this.content() || '', params).html.join(''));
  }
}
