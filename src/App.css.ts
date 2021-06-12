import { keyframes, style } from '@vanilla-extract/css';

export const appClass = style({
  textAlign: 'center',
});

const appLogoSpin = keyframes({
  '0%': {
    transform: 'rotate(0turn)',
  },
  '100%': {
    transform: 'rotate(1turn)',
  },
});

export const appLogoClass = style({
  height: '40vmin',
  pointerEvents: 'none',
  '@media': {
    '(prefers-reduced-motion: no-preference)': {
      animation: `${appLogoSpin} infinite 20s linear`,
    },
  },
});

export const appHeaderClass = style({
  backgroundColor: '#282c34',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 'calc(10px + 2vmin)',
  color: 'white',
});

export const appLinkClass = style({
  color: '#61dafb',
});
