import { FastAverageColor } from 'fast-average-color';

export async function getAverageColor(url: string) {
	const fac = new FastAverageColor();

	const color = (await fac.getColorAsync(url)).hex;

	return color;
}

export const getGcAndSetVariable = async (
	imageUrl: string,
	variable: string
) => {
	const fac = new FastAverageColor();

	const gC = await fac.getColorAsync(imageUrl);

	document.body.style.setProperty(
		variable,
		`${gC.rgb.replace('rgb(', '').replace(')', '')}`
	);
};
