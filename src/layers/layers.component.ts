import {
  Input,
  Component,
  OnChanges,
  OnDestroy,
  QueryList,
  HostBinding,
  SimpleChanges,
  ContentChildren
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Layer, Text, Icon } from '@fortawesome/fontawesome';
import { faNotFoundIconHtml } from '../shared/errors';
import { FaIconComponent } from '../icon';
import { FaLayersTextComponent } from './layers-text.component';

/**
 * Fontawesome layers.
 */
@Component({
  selector: 'fa-layers',
  template: `<span class="fa-layers">
    <ng-template ngFor let-child [ngForOf]="iconsChildren">
      <fa-icon [icon]="child.icon" [styles]="child.styles" [transform]="child.transform" [inverse]="child.inverse"></fa-icon>
    </ng-template>
    <ng-template ngFor let-child [ngForOf]="textsChildren">
      <fa-layers-text [content]="child.content" [transform]="child.transform" [styles]="child.styles" [counter]="child.counter"></fa-layers-text>
    </ng-template>
  </span>`,
    styleUrls: ['layers.component.scss'],
})
export class FaLayersComponent {
  constructor(private sanitizer: DomSanitizer) {}

  @ContentChildren(FaIconComponent)
  private iconsChildren: QueryList<FaIconComponent>;

  @ContentChildren(FaLayersTextComponent)
  private textsChildren: QueryList<FaLayersTextComponent>;

  private _classes?: string[] = [];
  @Input()
  get classes() { return this._classes; }
  set classes(classes: string[]) {
    this._classes = (classes instanceof Array) ? classes : [];
  }
}

