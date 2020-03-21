import Color from 'color';

import * as themeObject from './theme';

interface ColorSelectorArgs {
  theme: typeof themeObject;
}

interface Selector {
  (p: ColorSelectorArgs): string;
}

interface ColorUtilities {
  darken: (amount: number) => Selector;
  fade: (amount: number) => Selector;
  lighten: (amount: number) => Selector;
}

type SelectorWithUtilities = Selector & ColorUtilities;

const manipulators = ['darken', 'fade', 'lighten'] as const;

const colorNames = Object.keys(themeObject.colors) as (keyof typeof themeObject.colors)[];

const colorSelectors = colorNames.reduce((acc, colorName) => {
  const selector = (({ theme }: ColorSelectorArgs) =>
    theme.colors[colorName]) as SelectorWithUtilities;

  manipulators.forEach((manipulator) => {
    selector[manipulator] = (...args: Parameters<ColorUtilities[typeof manipulator]>) => ({
      theme,
    }: ColorSelectorArgs) =>
      Color(theme.colors[colorName])
        [manipulator](...args)
        .string();
  });

  acc[colorName] = selector;

  return acc;
}, {} as Record<keyof typeof themeObject.colors, SelectorWithUtilities>);

export default colorSelectors;
