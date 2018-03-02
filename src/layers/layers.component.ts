import {
  Input,
  Component,
  OnChanges,
  OnDestroy,
  QueryList,
  HostBinding,
  SimpleChanges,
  ContentChildren,
  AfterContentInit,
  ChangeDetectionStrategy
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { layer, Layer, Text, Icon } from '@fortawesome/fontawesome';
import { takeWhile } from 'rxjs/operators';
import { Observable } from 'rxjs/Rx';

import { faNotFoundIconHtml } from '../shared/errors';
import { FaIconComponent } from '../icon';

import { FaLayersTextComponent } from './layers-text.component';

/**
 * Fontawesome layers.
 */
@Component({
  selector: 'fa-layers',
  template: ``,
  styleUrls: ['layers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FaLayersComponent implements OnChanges, OnDestroy, AfterContentInit {
  constructor(private sanitizer: DomSanitizer) {}

  private alive = true;

  private layers: Layer;
  private layersHtml: string;

  @HostBinding('innerHTML')
  private renderedLayersHTML: SafeHtml;

  @HostBinding('class.ng-fa-layers')
  private cssClass = true;

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

  /**
   * Returns icons list.
   * @returns {Observable<Text>}
   */
  get icons(): Icon[] {
    return this.iconsChildren.toArray()
      .map(component => component.icon)
      .filter(icon => icon);
  }

  /**
   * Returns texts list.
   * @returns {Observable<Text>}
   */
  get texts(): Text[] {
    return this.textsChildren.toArray()
      .map(component => component.text)
      .filter(text => text);
  }

  /**
   * Returns one merged observable with all instance of icon component.
   * @returns {Observable<Text>}
   */
  get iconsChanges(): Observable<Icon> {
    return Observable.merge(
      ...this.iconsChildren.toArray()
        .map(c => c.changed.asObservable())
    );
  }

  /**
   * Returns one merged observable with all instance of text component.
   * @returns {Observable<Text>}
   */
  get textsChanges(): Observable<Text> {
    return Observable.merge(
      ...this.textsChildren.toArray()
        .map(c => c.changed.asObservable())
    );
  }

  ngOnDestroy() {
    this.alive = false;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && this.layers) {
      this.updateLayersHtml();
      this.renderLayers();
    }
  }

  ngAfterContentInit() {
    /**
     * Merging all the changes observable of the children, updating and re-rendering the layers.
     */
    Observable.merge(
        this.iconsChildren.changes,
        this.textsChildren.changes,
        this.iconsChanges,
        this.textsChanges
      )
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => {
        this.updateLayers();
        this.updateLayersHtml();
        this.renderLayers();
      });
  }

  /**
   * Updating layers by icon and text children.
   */
  private updateLayers() {
    this.layers = layer(push => {
      this.icons.map(icon => push(icon));
      this.texts.map(text => push(text));
    });
  }

  /**
   * Updating layers html with list of css classes.
   */
  private updateLayersHtml() {
    const layersNode = this.layers.node[0];
    this.classes.map(className => layersNode.classList.add(className));
    this.layersHtml = layersNode.outerHTML;
  }

  /**
   * Rendering layers html.
   */
  private renderLayers() {
    this.renderedLayersHTML = this.sanitizer.bypassSecurityTrustHtml(
      this.layersHtml ? this.layersHtml : faNotFoundIconHtml
    );
  }
}
