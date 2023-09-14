import {
  FastAverageColor,
  type FastAverageColorResult,
} from 'fast-average-color';

export async function getAverageColor(url: string) {
  const fac = new FastAverageColor();

  const color = (await fac.getColorAsync(url)).hex;

  return color;
}

export const getGcAndSetVariable = async (
  imageUrl: string | undefined,
  variable: string
) => {
  const fac = new FastAverageColor();

  let gC: Partial<FastAverageColorResult> = { rgb: 'rgb(127, 127, 127)' };
  if (imageUrl) {
    gC = await fac.getColorAsync(imageUrl);
  }

  document.body.style.setProperty(
    variable,
    `${gC.rgb!.replace('rgb(', '').replace(')', '')}`
  );
};
