import { IconLookup } from '../../types';

export const faWarnIfIconDefinitionMissing = (iconSpec: IconLookup) => {
  throw new Error(
    `Could not find icon with iconName=${iconSpec.iconName} and prefix=${iconSpec.prefix} in the icon library.`,
  );
};
