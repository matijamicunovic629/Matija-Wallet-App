import { create } from 'zustand';
import { WalletTokenBalance, WalletTransaction } from '../types';
import { Config } from '../constants';
import { compareWalletAddresses } from '../utils';

export interface WalletBalanceStoreState {
  matijaTokenBalance: number;
  walletTokenBalances: WalletTokenBalance[];
  walletTransactions: WalletTransaction[];
  setWalletTokenBalances: (newBalances: WalletTokenBalance[]) => void;
  setWalletTransactions: (newTransactions: WalletTransaction[]) => void;
}

const useWalletStore = create<WalletBalanceStoreState>((set) => ({
  matijaTokenBalance: 0,
  walletTokenBalances: [],
  walletTransactions: [],
  setWalletTokenBalances: (newBalances: WalletTokenBalance[]) => {
    const newMatijaTokenBalance = newBalances.find((balanceItem) =>
      compareWalletAddresses(
        balanceItem.tokenAddress,
        Config.MatijaTokenAddress,
      ),
    );

    set((prev) => ({
      ...prev,
      matijaTokenBalance:
        newMatijaTokenBalance?.balanceDecimal ?? prev.matijaTokenBalance,
      walletTokenBalances: newBalances,
    }));
  },
  setWalletTransactions: (newTransactions: WalletTransaction[]) =>
    set({ walletTransactions: newTransactions }),
}));

export default useWalletStore;
