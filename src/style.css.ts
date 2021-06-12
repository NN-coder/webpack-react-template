import { style } from '@vanilla-extract/css';

export const headerClass = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-end',
  transition: 'all 0.5s ease',
  userSelect: 'none',
  background: 'gold',
});
