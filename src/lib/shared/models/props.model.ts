import {
  FaSymbol,
  FlipProp,
  IconProp,
  PullProp,
  RotateProp,
  SizeProp,
  Styles,
  Transform,
} from '@fortawesome/fontawesome-svg-core';

/**
 * Fontawesome props.
 */
export interface FaProps {
  mask?: IconProp;
  className?: string;
  animation?: AnimationProp;
  border?: boolean;
  fixedWidth?: boolean;
  counter?: boolean;
  inverse?: boolean;
  flip?: FlipProp;
  size?: SizeProp;
  pull?: PullProp;
  rotate?: RotateProp;
  transform?: string | Transform;
  symbol?: FaSymbol;
  style?: Styles;
  stackItemSize?: '1x' | '2x';
}

export type AnimationProp =
  | 'beat'
  | 'fade'
  | 'beat-fade'
  | 'bounce'
  | 'flip'
  | 'shake'
  | 'spin'
  | 'spin-reverse'
  | 'spin-pulse'
  | 'spin-pulse-reverse';
