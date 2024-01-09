import { PixelRatio } from 'react-native';
const fontScale = PixelRatio.getFontScale();
const getFontSize = (size: any) => size / fontScale;

export const Fonts = {
  xs: getFontSize(10),
  sm: getFontSize(12),
  base: getFontSize(14),
  lg: getFontSize(16),
  xl: getFontSize(18),
  xl2: getFontSize(20),
  xl3: getFontSize(22),
  xl4: getFontSize(30),
};

export const LineHeights = {
  xs: getFontSize(14),
  sm: getFontSize(16),
  base: getFontSize(18),
  lg: getFontSize(20),
  xl: getFontSize(22),
  xl2: getFontSize(24),
  xl3: getFontSize(28),
  xl4: getFontSize(34),
};
