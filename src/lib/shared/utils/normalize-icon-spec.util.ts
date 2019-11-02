import { IconDefinition, IconLookup, IconPrefix, IconProp } from '@fortawesome/fontawesome-svg-core';
import { isIconLookup } from './is-icon-lookup.util';

/**
 * Normalizing icon spec.
 */
export const faNormalizeIconSpec = (
  iconSpec: IconProp | IconDefinition,
  defaultPrefix: IconPrefix,
): IconLookup | IconDefinition => {
  if (isIconLookup(iconSpec)) {
    return iconSpec;
  }

  if (Array.isArray(iconSpec) && (iconSpec as string[]).length === 2) {
    return { prefix: iconSpec[0], iconName: iconSpec[1] };
  }

  if (typeof iconSpec === 'string') {
    return { prefix: defaultPrefix, iconName: iconSpec };
  }
};
