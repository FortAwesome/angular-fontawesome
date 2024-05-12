import { DOCUMENT } from '@angular/common';
import {
  Component,
  ElementRef,
  HostBinding,
  inject,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { FaConfig } from '../config';
import { ensureCss } from '../shared/utils/css';

/**
 * Fontawesome layers.
 */
@Component({
  selector: 'fa-layers',
  standalone: true,
  template: `<ng-content></ng-content>`,
})
export class FaLayersComponent implements OnInit, OnChanges {
  @Input() size?: SizeProp;

  @Input() @HostBinding('class.fa-fw') fixedWidth?: boolean;

  private document = inject(DOCUMENT);

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private config: FaConfig,
  ) {}

  ngOnInit() {
    this.renderer.addClass(this.elementRef.nativeElement, 'fa-layers');
    ensureCss(this.document, this.config);
    this.fixedWidth = typeof this.fixedWidth === 'boolean' ? this.fixedWidth : this.config.fixedWidth;
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('size' in changes) {
      if (changes.size.currentValue != null) {
        this.renderer.addClass(this.elementRef.nativeElement, `fa-${changes.size.currentValue}`);
      }
      if (changes.size.previousValue != null) {
        this.renderer.removeClass(this.elementRef.nativeElement, `fa-${changes.size.previousValue}`);
      }
    }
  }
}
