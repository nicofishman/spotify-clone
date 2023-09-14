import tracksStore from '@/stores/tracksStore';
import { api } from '@/utils/api';
import React from 'react';

interface FollowButtonProps {
	artistId: string;
}

const FollowButton = ({ artistId }: FollowButtonProps) => {
  const [followingArtists] = tracksStore.use('followingArtists');
  const { data } = api.me.following.getArtists.useQuery(undefined, {
    onSuccess: (data) => {
      tracksStore.set('followingArtists', data);
    },
  });

  const { mutate: follow } = api.me.following.followArtists.useMutation({
    onSuccess: () => {
      tracksStore.set('followingArtists', [
        ...tracksStore.get('followingArtists'),
        artistId,
      ]);
    },
  });
  const { mutate: unfollow } = api.me.following.unfollowArtists.useMutation({
    onSuccess: () => {
      tracksStore.set(
        'followingArtists',
        tracksStore
          .get('followingArtists')
          .filter((id) => id !== artistId)
      );
    },
  });

  const followOrUnfollow = () => {
    if (followingArtists?.includes(artistId)) {
      unfollow([artistId]);
    } else {
      follow([artistId]);
    }
  };

  return (
    <button
      className='rounded-full border border-[#727272] px-4 py-1 text-sm font-bold transition-all hover:scale-105 hover:border-white'
      onClick={followOrUnfollow}
    >
      {followingArtists?.includes(artistId) ? 'Following' : 'Follow'}
    </button>
  );
};

export default FollowButton;
