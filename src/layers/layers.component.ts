import {
  Component,
  QueryList,
  HostBinding,
  ContentChildren,
  AfterContentChecked,
  ChangeDetectionStrategy, Input
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { layer, Layer, Text, Icon } from '@fortawesome/fontawesome';

import { faNotFoundIconHtml } from '../shared/errors';
import { FaIconComponent } from '../icon';
import { FaTextComponent } from '../text';

/**
 * Fontawesome layers.
 */
@Component({
  selector: 'fa-layers',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FaLayersComponent implements AfterContentChecked {
  public layers: Layer;

  @HostBinding('innerHTML')
  public renderedLayersHTML: SafeHtml;

  constructor(private sanitizer: DomSanitizer) {}

  private _classes?: string[] = [];

  @HostBinding('class.ng-fa-layers')
  private cssClass = true;

  @ContentChildren(FaIconComponent)
  private icons: QueryList<FaIconComponent>;

  @ContentChildren(FaTextComponent)
  private texts: QueryList<FaTextComponent>;

  @Input()
  get classes() {
    return this._classes;
  }
  set classes(classes: string[]) {
    this._classes = (classes instanceof Array) ? classes : [];
  }

  ngAfterContentChecked() {
    this.updateLayers();
    this.renderLayers();
  }

  private updateLayers() {
    const icons = this.icons.toArray().map(component => component.icon).filter(icon => icon);
    const texts = this.texts.toArray().map(component => component.text).filter(text => text);
    this.layers = this.createLayers(icons, texts);
  }

  /**
   * Creates layers from icons and texts.
   * @param {Icon[]} icons
   * @param {Text[]} texts
   * @returns {Layer}
   */
  private createLayers(icons: Icon[] = [], texts: Text[] = []): Layer {
    return layer(push => {
      icons.map(icon => push(icon));

      /**
       * Push method can take only IconLookup for now.
       * Follow this issue: https://github.com/FortAwesome/Font-Awesome-Pro/pull/985
       */
      // texts.map(text => push(text));
    });
  }

  private renderLayersHtml() {
    const layersNode = this.layers.node[0];
    this.classes.map(className => layersNode.classList.add(className));
    return layersNode.outerHTML;
  }

  private renderLayers() {
    const layersHtml = this.renderLayersHtml();
    this.renderedLayersHTML = this.sanitizer.bypassSecurityTrustHtml(layersHtml ? layersHtml : faNotFoundIconHtml);
  }
}
