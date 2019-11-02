import { Component, HostBinding, Input, OnChanges, Optional, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { counter, CounterParams, Styles } from '@fortawesome/fontawesome-svg-core';
import { faWarnIfParentNotExist } from '../shared/errors/warn-if-parent-not-exist';
import { FaLayersComponent } from './layers.component';

@Component({
  selector: 'fa-layers-counter',
  template: '',
  host: {
    class: 'ng-fa-layers-counter',
  },
})
export class FaLayersCounterComponent implements OnChanges {
  @Input() content: string;
  @Input() title?: string;
  @Input() styles?: Styles;
  @Input() classes?: string[] = [];

  @HostBinding('innerHTML') renderedHTML: SafeHtml;

  constructor(@Optional() private parent: FaLayersComponent, private sanitizer: DomSanitizer) {
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
      title: this.title,
      classes: this.classes,
      styles: this.styles,
    };
  }

  private updateContent(params: CounterParams) {
    this.renderedHTML = this.sanitizer.bypassSecurityTrustHtml(counter(this.content || '', params).html.join(''));
  }
}
