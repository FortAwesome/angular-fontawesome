import {IconLookup, IconProp} from '@fortawesome/fontawesome';

/**
 * Returns if is IconLookup or not.
 * @param {IconProp} i
 * @returns {IconLookup}
 */
export const isIconLookup = (i: IconProp): i is IconLookup => {
  return (<IconLookup>i).prefix !== undefined && (<IconLookup>i).iconName !== undefined;
};
