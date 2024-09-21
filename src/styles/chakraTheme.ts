import { extendTheme } from '@chakra-ui/react';
import { darkTheme } from '@rainbow-me/rainbowkit';

export const chakraTheme = extendTheme({
  colors: {
    gray: {
      '900': '#1a1c20',
      divider: '#393b3f',
    },
    violet: {
      hamburger: '#c9b2ff',
      accentColor: '#862cf4',
      selectedTextColor: '#b375ff',
      accentBgColor: 'rgba(134,44,244,0.18)',
    },
    purple: {
      '300': '#5863f8',
    },
  },
  fonts: {
    heading: 'Roboto',
    body: 'Roboto',
  },
  styles: {
    global: {
      body: {
        bg: 'white',
        color: 'gray.900',
      },
    },
  },
});

export const rainbowKitTheme = darkTheme({
  accentColor: '#862cf4',
  accentColorForeground: 'white',
  borderRadius: 'medium',
});
