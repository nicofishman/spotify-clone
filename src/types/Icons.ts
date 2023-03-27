/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import logo from '@/assets/icons/logo.svg';
import homeDefault from '@/assets/icons/home.svg';
import homeActive from '@/assets/icons/home-active.svg';
import searchDefault from '@/assets/icons/search.svg';
import searchActive from '@/assets/icons/search-active.svg';
import collectionDefault from '@/assets/icons/collection.svg';
import collectionActive from '@/assets/icons/collection-active.svg';
import plus from '@/assets/icons/plus.svg';
import heart from '@/assets/icons/heart.svg';
import collaborative from '@/assets/icons/collaborative.svg';
import likeDefault from '@/assets/icons/like.svg';
import likeActive from '@/assets/icons/like-active.svg';
import pictureInPicture from '@/assets/icons/picture-in-picture.svg';
import next from '@/assets/icons/next.svg';
import previous from '@/assets/icons/previous.svg';
import play from '@/assets/icons/play.svg';
import pause from '@/assets/icons/pause.svg';
import shuffle from '@/assets/icons/shuffle.svg';
import repeat from '@/assets/icons/repeat.svg';
import connect from '@/assets/icons/connect.svg';
import fullscreen from '@/assets/icons/fullscreen.svg';
import lyrics from '@/assets/icons/lyrics.svg';
import queue from '@/assets/icons/queue.svg';
import volume from '@/assets/icons/volume.svg';

export const Icons = {
	logo: logo,
	homeActive: homeActive,
	homeDefault: homeDefault,
	searchActive: searchActive,
	searchDefault: searchDefault,
	collectionActive: collectionActive,
	collectionDefault: collectionDefault,
	plus: plus,
	heart: heart,
	collaborative: collaborative,
	likeDefault: likeDefault,
	likeActive: likeActive,
	pictureInPicture: pictureInPicture,
	next: next,
	previous: previous,
	play: play,
	pause: pause,
	shuffle: shuffle,
	repeat: repeat,
	connect: connect,
	fullscreen: fullscreen,
	lyrics: lyrics,
	queue: queue,
	volume: volume,
} as const;
