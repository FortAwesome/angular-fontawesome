import { IconLookup } from '@fortawesome/fontawesome-svg-core';

export const faWarnIfIconDefinitionMissing = (iconSpec: IconLookup) => {
  console.error(
    `FontAwesome: Could not find icon with iconName=${iconSpec.iconName} and prefix=${iconSpec.prefix}. ` +
    `This warning will become a hard error in 0.6.0.`
  );
};
