import {
  FaSymbol,
  FlipProp,
  IconProp,
  PullProp,
  RotateProp,
  SizeProp,
  Transform,
  Styles
} from '@fortawesome/fontawesome-svg-core';

/**
 * Fontawesome props.
 */
export interface FaProps {
  mask?: IconProp;
  className?: string;
  spin?: boolean;
  pulse?: boolean;
  border?: boolean;
  fixedWidth?: boolean;
  listItem?: boolean;
  counter?: boolean;
  inverse?: boolean;
  flip?: FlipProp;
  size?: SizeProp;
  pull?: PullProp;
  rotate?: RotateProp;
  transform?: string | Transform;
  symbol?: FaSymbol;
  style?: Styles;
}
