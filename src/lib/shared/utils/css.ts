import { dom } from '@fortawesome/fontawesome-svg-core';
import { FaConfig } from '../../config';

const cssInserted = new WeakSet();
export const autoCssId = 'fa-auto-css';

/**
 * Ensure that Font Awesome CSS is inserted into the page.
 *
 * SVG Core has the same logic to insert the same styles into the page, however
 * it's not aware of Angular SSR and therefore styles won't be added in that
 * context leading to https://github.com/FortAwesome/angular-fontawesome/issues/48.
 * That's why the same logic is duplicated here.
 *
 * @param document - Document.
 * @param config - Font Awesome configuration.
 */
export function ensureCss(document: Document, config: FaConfig): void {
  if (!config.autoAddCss) {
    return;
  }

  if (cssInserted.has(document)) {
    return;
  }

  // Prevent adding the same styles again after hydration.
  if (document.getElementById(autoCssId) != null) {
    config.autoAddCss = false;
    cssInserted.add(document);
    return;
  }

  const style = document.createElement('style');
  style.setAttribute('type', 'text/css');
  style.setAttribute('id', autoCssId);
  style.innerHTML = dom.css();
  const headChildren = document.head.childNodes;
  let beforeChild = null;

  for (let i = headChildren.length - 1; i > -1; i--) {
    const child = headChildren[i];
    const tagName = child.nodeName.toUpperCase();

    if (['STYLE', 'LINK'].indexOf(tagName) > -1) {
      beforeChild = child;
    }
  }

  document.head.insertBefore(style, beforeChild);

  // Prevent SVG Core from adding the same styles.
  //
  // As the logic is present in two places and SVG Core is not aware about
  // this library, it may lead to styles being added twice. This can only
  // occur when icon is rendered by SVG Core before the Angular component
  // and should not have any significant negative impact. This is a rare
  // use case, and it's tricky to prevent, so we accept this behavior. Consumer
  // can choose to disable `FaConfig.autoAddCss` and add styles manually to
  // prevent this from happening.
  config.autoAddCss = false;
  cssInserted.add(document);
}
