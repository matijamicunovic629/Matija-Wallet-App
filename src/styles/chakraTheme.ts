import { extendTheme } from '@chakra-ui/react';
import { darkTheme } from '@rainbow-me/rainbowkit';
import { mode } from '@chakra-ui/theme-tools';

export const chakraTheme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  colors: {
    gray: {
      '900': '#1a1c20',
    },
    main: {
      color: 'white',
      secondaryColor: 'gray',
      divider: '#393b3f',
      'divider.dark': '#232325',
      successColor: '#0dda75',
      hamburger: '#c9b2ff',
      accentColor: '#862cf4',
      navSelectedTextColor: '#b375ff',
      accentBgColor: 'rgba(134,44,244,0.18)',
      accentTransparentBgColor: 'rgba(134,44,244,0.04)',
    },
  },
  fonts: {
    heading: 'Roboto',
    body: 'Roboto',
  },
  styles: {
    global: {
      body: {
        overflow: 'hidden',
        bg: '#141518',
        color: 'white',
      },
    },
  },
  components: {
    Tabs: {
      baseStyle: (props: Record<string, never>) => ({
        tab: {
          _selected: {
            color: mode('main.accentColor', 'main.accentColor')(props),
            borderBottom: '2px solid',
            borderTopRadius: ['4px', '6px'],
            borderColor: mode('main.accentColor', 'main.accentColor')(props),
          },
          _hover: {
            borderTopRadius: ['4px', '6px'],
            backgroundColor: mode(
              'main.accentBgColor',
              'main.accentBgColor',
            )(props),
          },
        },
      }),
      sizes: {},
      variants: {
        custom: (props: Record<string, never>) => ({
          tab: {
            fontSize: ['md', 'lg'],
            padding: ['.5rem 1rem', '1rem 2rem'],
            margin: '-2px 0px',
            borderColor: mode('main.divider.dark', 'main.divider.dark')(props),
          },
          tablist: {
            borderBottom: '2px solid',
            borderColor: mode('main.divider.dark', 'main.divider.dark')(props),
          },
          tabpanel: {
            padding: '2rem .2rem',
          },
        }),
      },
      defaultProps: {
        variant: 'custom',
      },
    },
    Modal: {
      baseStyle: () => ({
        dialog: {
          bg: '#141518',
        },
      }),
    },
  },
});

export const rainbowKitTheme = darkTheme({
  accentColor: '#862cf4',
  accentColorForeground: 'white',
  borderRadius: 'medium',
});
