import localFont from 'next/font/local';

export const myFont = localFont({
  src: [
    {
      path: '../../public/fonts/Circular/CircularStd-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Circular/CircularStd-Book.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Circular/CircularStd-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Circular/CircularStd-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Circular/CircularStd-Black.otf',
      weight: '900',
      style: 'normal',
    },
  ],
});
