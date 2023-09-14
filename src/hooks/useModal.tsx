import { create } from 'zustand';

export type ModalType = 'editPlaylist';

interface ModalData {
  playlist?: {
    id: string;
    name: string;
    description: string | null;
    images: {
      url: string;
    }[];
  };
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, data: {}, isOpen: false }),
}));
