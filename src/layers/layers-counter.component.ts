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
  counter,
  CounterParams,
  Styles
} from '@fortawesome/fontawesome-svg-core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { faWarnIfParentNotExist } from '../shared/errors';
import { FaLayersComponent } from './layers.component';

/**
 * Fontawesome layers counter.
 */
@Component({
  selector: 'fa-layers-counter',
  template: ''
})
export class FaLayersCounterComponent implements OnChanges {

  constructor(@Inject(forwardRef(() => FaLayersComponent)) @Optional() private parent: FaLayersComponent,
    private sanitizer: DomSanitizer) {

    faWarnIfParentNotExist(this.parent, 'FaLayersComponent', 'FaLayersCounterComponent');
  }

  @HostBinding('class.ng-fa-layers-counter')
  private cssClass = true;

  @HostBinding('innerHTML')
  private renderedTextHTML: SafeHtml;

  private params: CounterParams;

  @Input() private content: string;
  @Input() private title?: string;
  @Input() private styles?: Styles;
  @Input() private classes?: string[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes) {
      this.updateParams();
      this.updateCounter();
    }
  }

  /**
   * Updating params by component props.
   */
  private updateParams() {

    this.params = {
      title: this.title,
      classes: this.classes,
      styles: this.styles,
    };
  }

  /**
   * Updating counter by params and content.
   */
  private updateCounter() {
    this.renderedTextHTML = this.sanitizer.bypassSecurityTrustHtml(
      counter(this.content || '', this.params).html.join('\n')
    );
  }
}

