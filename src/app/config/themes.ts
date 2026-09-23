import { clampGamut, converter, formatHex } from 'culori';

export type Palette = {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
};

export type Theme = {
  primary: Palette;
  secondary: Palette;
  background: string;
  text: string;
  surface?: string;
  error?: string;
  onPrimary?: string;
  onSecondary?: string;
  onBackground?: string;
  onSurface?: string;
  onError?: string;

  fontFamily: string;
  fontSize: string;
  headerFontSize: string;
};

function generatePalette(color: string): Palette {
  const toOklch = converter('oklch');
  const oklch = toOklch(color);

  if (!oklch) {
    throw new Error(`Invalid color: ${color}`);
  }

  if (oklch.l === undefined || oklch.c === undefined || oklch.h === undefined) {
    throw new Error(`Could not convert color to OKLCH: ${color}`);
  }

  const gamutClamp = clampGamut('rgb');

  const chroma = Number(oklch.c);
  const hue = Number(oklch.h);
  const baseLightness = Number(oklch.l);

  const createShade = (lightness: number): string => {
    const result =
      formatHex(
        gamutClamp({
          mode: 'oklch',
          l: lightness,
          c: chroma,
          h: hue,
        }),
      ) ?? color;
    return result;
  };

  return {
    50: createShade(0.97),
    100: createShade(0.93),
    200: createShade(0.87),
    300: createShade(0.75),
    400: createShade(0.62),
    500: createShade(baseLightness),
    600: createShade(0.42),
    700: createShade(0.35),
    800: createShade(0.28),
    900: createShade(0.21),
    950: createShade(0.15),
  };
}

export const themes: Record<string, Theme> = {
  default: {
    primary: generatePalette('#6B5282'),
    secondary: generatePalette('#7A8B7B'),
    background: '#FAFAFA',
    text: '#FAFAFA',
    fontFamily: 'Great Vibes',
    fontSize: '16px',
    headerFontSize: '24px',
  },

  second: {
    primary: generatePalette('#7A8B7B'),
    secondary: generatePalette('#6B5282'),
    background: '#FFF9FA',
    text: '#FAFAFA',
    fontFamily: 'Poppins',
    fontSize: '16px',
    headerFontSize: '24px',
  },
  third: {
    primary: generatePalette('#FFF9FA'),
    secondary: generatePalette('#7A8B7B'),
    background: '#6B5282',
    text: '#6B5282',
    fontFamily: 'Montserrat',
    fontSize: '16px',
    headerFontSize: '24px',
  },
};
