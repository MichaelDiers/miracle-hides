export interface DisplayName {
  displayName: string;
}

export interface Address extends DisplayName {
  url: string;
}

export const ADDRESSES : Address[] = [
  {
    displayName: 'ES6',
    url: 'http://localhost:3001/es6',
  },
  {
    displayName: 'react',
    url: 'http://localhost:3001/react',
  },
];

export interface WindowSize extends DisplayName {
  width: number | 'max';
  height: number | 'max';
  isMobile: boolean;
}

export const WINDOW_SIZES : WindowSize[] = [
  {
    displayName: '799 x max',
    height: 'max',
    width: 799,
    isMobile: true,
  },
  {
    displayName: '900 x max',
    height: 'max',
    width: 900,
    isMobile: false,
  },
  {
    displayName: 'fullscreen',
    height: 'max',
    width: 'max',
    isMobile: false,
  },
];
