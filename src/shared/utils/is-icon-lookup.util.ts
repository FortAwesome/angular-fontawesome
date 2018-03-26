import {IconLookup, IconProp} from '@fortawesome/fontawesome-svg-core';

/**
 * Returns if is IconLookup or not.
 * @returns IconLookup
 */
export const isIconLookup = (i: IconProp): i is IconLookup => {
  return (<IconLookup>i).prefix !== undefined && (<IconLookup>i).iconName !== undefined;
};
