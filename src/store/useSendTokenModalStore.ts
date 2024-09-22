import { create } from 'zustand';

export interface SendTokenModalState {
  isOpen: boolean;
  stepIndex: number;
  openModal: () => void;
  nextStep: () => void;
  prevStep: () => void;
  closeModal: () => void;
}

const useSendTokenModalStore = create<SendTokenModalState>((set) => ({
  isOpen: true,
  stepIndex: 0,
  nextStep: () => set((prev) => ({ ...prev, stepIndex: prev.stepIndex + 1 })),
  prevStep: () =>
    set((prev) => ({ ...prev, stepIndex: Math.max(prev.stepIndex - 1, 0) })),
  openModal: () => set({ isOpen: true, stepIndex: 0 }),
  closeModal: () => set({ isOpen: false }),
}));

export default useSendTokenModalStore;
