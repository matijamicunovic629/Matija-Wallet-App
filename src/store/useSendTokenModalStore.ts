import { create } from 'zustand';

export interface SendTokenModalState {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const useSendTokenModalStore = create<SendTokenModalState>((set) => ({
  isOpen: true,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));

export default useSendTokenModalStore;
