import { IconLookup, IconProp } from '@fortawesome/fontawesome-svg-core';

/**
 * Returns if is IconLookup or not.
 */
export const isIconLookup = (i: IconProp): i is IconLookup =>
  (i as IconLookup).prefix !== undefined && (i as IconLookup).iconName !== undefined;
