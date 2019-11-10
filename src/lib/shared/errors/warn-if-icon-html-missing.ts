import { IconLookup } from '@fortawesome/fontawesome-svg-core';

export const faWarnIfIconDefinitionMissing = (iconSpec: IconLookup) => {
  throw new Error(
    `Could not find icon with iconName=${iconSpec.iconName} and prefix=${iconSpec.prefix} in the icon library.`,
  );
};
