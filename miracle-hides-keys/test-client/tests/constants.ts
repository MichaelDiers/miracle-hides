export interface DisplayName {
  displayName: string;
}

export interface Address extends DisplayName {
  url: string;
}

export const ADDRESSES : Address[] = [
  {
    displayName: 'plain',
    url: 'http://localhost:3000/plain/index.html',
  },
];

export interface WindowSize extends DisplayName {
  width: number | 'max';
  height: number | 'max';
}

export const WINDOW_SIZES : WindowSize[] = [
  {
    displayName: '799 x max',
    height: 'max',
    width: 799,
  },
  {
    displayName: '800 x max',
    height: 'max',
    width: 800,
  },
  {
    displayName: 'fullscreen',
    height: 'max',
    width: 'max',
  },
];
