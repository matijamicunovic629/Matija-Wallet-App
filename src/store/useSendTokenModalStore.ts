import { create } from 'zustand';
import { EthereumAddressType, TokenInfoType } from '../types';
import { defaultTokenInfo } from '../constants';

export interface SendTokenModalState {
  isOpen: boolean;
  isSuccess: boolean;
  transactionHash: string;
  tokenInfo: TokenInfoType;
  sendAmount: number;
  sendAddress: EthereumAddressType | undefined;
  stepIndex: number;
  openModal: (tokenInfo?: TokenInfoType) => void;
  nextStep: (isSuccess?: boolean) => void;
  prevStep: () => void;
  closeModal: () => void;
  setSendAmount: (amount: number) => void;
  setSendAddress: (address: EthereumAddressType) => void;
  setTransactionHash: (txHash: string) => void;
}

const useSendTokenModalStore = create<SendTokenModalState>((set) => ({
  isOpen: false,
  isSuccess: false,
  stepIndex: 0,
  transactionHash: '',
  tokenInfo: {
    ...defaultTokenInfo,
  },
  sendAmount: 0,
  sendAddress: undefined,
  nextStep: (isSuccess: boolean = false) =>
    set((prev) => ({ ...prev, stepIndex: prev.stepIndex + 1, isSuccess })),
  prevStep: () =>
    set((prev) => ({ ...prev, stepIndex: Math.max(prev.stepIndex - 1, 0) })),
  openModal: (tokenInfo: TokenInfoType = { ...defaultTokenInfo }) =>
    set({
      isOpen: true,
      isSuccess: false,
      stepIndex: 0,
      tokenInfo,
      sendAmount: 0,
      transactionHash: '',
      sendAddress: undefined,
    }),
  closeModal: () => set({ isOpen: false }),
  setSendAmount: (amount: number) => set({ sendAmount: amount }),
  setSendAddress: (address: EthereumAddressType) =>
    set({ sendAddress: address }),
  setTransactionHash: (txHash: string) => set({ transactionHash: txHash }),
}));

export default useSendTokenModalStore;
