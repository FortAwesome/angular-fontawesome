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
  Styles,
  FontawesomeObject,
  TextParams
} from '@fortawesome/fontawesome-svg-core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { faWarnIfParentNotExist } from '../shared/errors';
import { FaLayersComponent } from './layers.component';

@Component({
    selector: 'fa-layers-text-base',
    template: ''
})
export abstract class FaLayersTextBaseComponent implements OnChanges {

  constructor(@Inject(forwardRef(() => FaLayersComponent)) @Optional() private parent: FaLayersComponent,
    private sanitizer: DomSanitizer) {

    faWarnIfParentNotExist(this.parent, 'FaLayersComponent', this.constructor.name);
  }

  @HostBinding('innerHTML')
  private renderedHTML: SafeHtml;

  protected params: TextParams;

  @Input() protected content: string;
  @Input() protected title?: string;
  @Input() protected styles?: Styles;
  @Input() protected classes?: string[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes) {
      this.updateParams();
      this.updateContent();
    }
  }

  /**
   * Updating params by component props.
   */
  protected abstract updateParams(): void;

  /**
   * Render the FontawesomeObject using the content and params.
   */
  protected abstract renderFontawesomeObject(content: string | number, params?: TextParams): FontawesomeObject;

  /**
   * Updating content by params and content.
   */
  private updateContent() {
    this.renderedHTML = this.sanitizer.bypassSecurityTrustHtml(
      this.renderFontawesomeObject(this.content || '', this.params).html.join('\n')
    );
  }
}

