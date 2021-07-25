import { IconName as CoreIconName, IconPrefix as CoreIconPrefix } from '@fortawesome/fontawesome-svg-core';

// Currently, when a union type of a primitive type is combined with literal
// types, TypeScript loses all information about the combined literals. Thus,
// when such type is used in an IDE with autocompletion, no suggestions are
// made for the declared literals.
// Below types use a workaround from [Microsoft/TypeScript#29729](https://github.com/Microsoft/TypeScript/issues/29729).

export type IconPrefix = CoreIconPrefix | (string & {});

export type IconName = CoreIconName | (string & {});

export interface IconLookup {
  prefix: IconPrefix;
  iconName: IconName;
}

export interface IconDefinition {
  prefix: IconPrefix;
  iconName: IconName;
  icon: [
    number, // width
    number, // height
    string[], // ligatures
    string, // unicode
    string | string[], // svgPathData
  ];
}

export interface IconPack {
  [key: string]: IconDefinition;
}

export type IconProp = IconName | [IconPrefix, IconName] | IconLookup;
