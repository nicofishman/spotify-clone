import { addDays, format } from 'date-fns';

export function millisToMinutesAndSeconds(millis: number) {
	const minutes = Math.floor(millis / 60000);
	const seconds = ((millis % 60000) / 1000).toFixed(0);
	return minutes.toString() + ':' + (+seconds < 10 ? '0' : '') + seconds;
}

export function formatDate(
	releaseDate: string,
	datePrecision: SpotifyApi.AlbumObjectSimplified['release_date_precision']
) {
	return format(
		addDays(new Date(releaseDate), 1),
		datePrecision === 'day'
			? 'MMMM d, yyyy'
			: datePrecision === 'month'
			? 'MMMM yyyy'
			: 'yyyy'
	);
}
