import { IconLookup } from '@fortawesome/fontawesome-svg-core';

export const faWarnIfIconSpecMissing = (iconSpec: IconLookup) => {
  if (!iconSpec) {
    console.error('FontAwesome: Could not find icon. ' +
      `It looks like you've provided a null or undefined icon object to this component.`);
  }
};
