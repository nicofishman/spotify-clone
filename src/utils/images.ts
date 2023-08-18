import { FastAverageColor } from 'fast-average-color';

export async function getAverageColor(url: string) {
	const fac = new FastAverageColor();

	const color = (await fac.getColorAsync(url)).hex;

	return color;
}
