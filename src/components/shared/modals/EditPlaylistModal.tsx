import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/UI/Dialog';
import { Form, FormControl, FormField, FormItem } from '@/components/UI/Form';
import Icon from '@/components/UI/Icon';
import { Input } from '@/components/UI/Input';
import { Textarea } from '@/components/UI/Textarea';
import { DEFAULT_PLAYLISTORALBUM_IMAGE } from '@/consts';
import { useModal } from '@/hooks/useModal';
import { api } from '@/utils/api';
import { cn } from '@/utils/cn';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useForm, useFormState } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Playlist name is required.',
  }),
  description: z.string().optional(),
});

const EditPlaylistModal = () => {
  const utils = api.useContext();

  const { isOpen, onClose, type, data } = useModal();
  const { mutate: editPlaylist } = api.playlist.edit.useMutation({
    onSuccess: async () => {
      await utils.playlist.get.invalidate(data.playlist?.id);
      await utils.user.playlists.list.invalidate({
        me: true,
      });
    },
  });
  const isModalOpen = isOpen && type === 'editPlaylist';

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data.playlist?.name,
      description: data.playlist?.description ?? '',
    },
    values: {
      name: data.playlist?.name ?? 'NO HAY DATA',
      description: data.playlist?.description ?? '',
    },
  });

  const handleClose = () => {
    form.reset();
    onClose();
  };

  // eslint-disable-next-line @typescript-eslint/require-await
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!data.playlist?.id || !values.name) return;

    editPlaylist({
      playlistId: data.playlist?.id,
      body: {
        name: values.name,
        description:
          (values.description?.length ?? 0) > 0
            ? values.description
            : undefined,
      },
    });
    handleClose();
  };

  const isLoading = form.formState.isSubmitting;

  const { errors } = useFormState({
    control: form.control,
  });

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className='text-white'>
        <DialogHeader>
          <DialogTitle className='text-2xl font-bold'>Edit details</DialogTitle>
        </DialogHeader>
        {errors.name?.message && (
          <div role='alert' className='h-8 w-full rounded bg-red-600 px-2'>
            <p className='flex h-full items-center gap-x-2 text-xxs'>
              <Icon name='warning' className='fill-white' />
              {errors.name?.message}
            </p>
          </div>
        )}
        <div className='grid grid-cols-[auto_1fr] gap-x-4'>
          <Image
            src={data.playlist?.images[0]?.url ?? DEFAULT_PLAYLISTORALBUM_IMAGE}
            width={180}
            height={180}
            alt='playlist image'
          />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='flex flex-col space-y-4'
            >
              <div className='flex h-[180px] flex-col space-y-4'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          label='Name'
                          disabled={isLoading}
                          className={cn(
                            'w-full aria-[invalid="false"]:border-b aria-[invalid="true"]:border-b-2 aria-[invalid="false"]:border-b-[#535353] aria-[invalid="true"]:border-b-red-500'
                          )}
                          placeholder='Enter server name'
                          {...field}
                        />
                      </FormControl>
                      {/* <FormMessage /> */}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='description'
                  render={({ field }) => (
                    <FormItem className='h-full'>
                      <FormControl>
                        <Textarea
                          label='Description'
                          disabled={isLoading}
                          containerClassName={cn('h-full w-full')}
                          className='h-full resize-none py-2 aria-[invalid="false"]:border-b aria-[invalid="true"]:border-b-2 aria-[invalid="false"]:border-b-[#535353] aria-[invalid="true"]:border-b-red-500'
                          placeholder='Add an optional description'
                          {...field}
                        />
                      </FormControl>
                      {/* <FormMessage /> */}
                    </FormItem>
                  )}
                />
              </div>
              <div className='flex justify-end'>
                <button className='w-fit rounded-full bg-white px-8 py-2 font-bold text-black hover:scale-105'>
                  Save
                </button>
              </div>
            </form>
          </Form>
        </div>
        <DialogFooter>
          <p className='text-xxs font-bold'>
            By proceeding, you agree to give Spotify access to the image you
            choose to upload. Please make sure you have the right to upload the
            image.
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditPlaylistModal;
