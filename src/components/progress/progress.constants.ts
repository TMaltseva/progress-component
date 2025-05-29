import COLORS from '../../styles/colors';

export const DEFAULT_CONFIG = {
  RADIUS: 50,
  STROKE_WIDTH: 8,
  FILL_COLOR: COLORS.primary,
  TRACK_COLOR: COLORS.background,
  ANIMATION_DURATION: 2,
} as const;

export const DEFAULT_STATE = {
  VALUE: 0,
  ANIMATED: false,
  HIDDEN: false,
} as const;

export const VALUE_BOUNDS = {
  MIN: 0,
  MAX: 100,
} as const;

export const MATH_CONSTANTS = {
  FULL_CIRCLE: 2 * Math.PI,
  HALF_CIRCLE: Math.PI,
  QUARTER_CIRCLE: Math.PI / 2,
  START_ANGLE: -Math.PI / 2,
} as const;

export const CANVAS_SETTINGS = {
  DEFAULT_DPR: 1,
  LINE_CAP: 'round',
  SIZE_MULTIPLIER: 2,
} as const;

export const ANIMATION_SETTINGS = {
  MILLISECONDS_IN_SECOND: 1000,
  DESTROY_VALUE: 0,
  FILL_DURATION: 800,
} as const;
