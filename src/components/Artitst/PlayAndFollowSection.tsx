import React from 'react';
import ThreeDotsArtist from '@/components/Artitst/ThreeDotsArtist';
import PlayPauseButton from '@/components/Index/PlaylistCardLong/PlayPauseButton';
import FollowButton from '@/components/Artitst/FollowButton';
import tracksStore from '@/stores/tracksStore';

interface PlayAndFollowSectionProps {
	artistId: string;
}

const PlayAndFollowSection = ({ artistId }: PlayAndFollowSectionProps) => {
  const [currentPlaying] = tracksStore.use('currentlyPlaying');
  const isPlaying = currentPlaying?.is_playing ?? false;

  const type = currentPlaying?.item?.type;

  return (
    <section className='flex w-full items-center gap-x-[calc(var(--contentSpacing)+8px)] py-[--contentSpacing]'>
      <PlayPauseButton
        className='scale-[1.20]'
        isPlaying={
          isPlaying &&
					type === 'track' &&
					(currentPlaying?.item?.artists
					  .map((art) => art.id)
					  .includes(artistId) ??
						false)
        }
      />
      <FollowButton artistId={artistId} />
      <ThreeDotsArtist artistId={artistId} />
    </section>
  );
};

export default PlayAndFollowSection;
