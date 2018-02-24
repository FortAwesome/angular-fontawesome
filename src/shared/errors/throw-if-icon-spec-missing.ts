import { IconLookup } from '@fortawesome/fontawesome';

/**
 * Throws if icon spec missing.
 * @param {IconLookup} iconSpec
 */
export const faThrowIfIconSpecMissing = (iconSpec: IconLookup) => {
  if (!iconSpec) {
    console.error('FontAwesome: Could not find icon. ' +
      `It looks like you've provided a null or undefined icon object to this component.`);
  }
};
