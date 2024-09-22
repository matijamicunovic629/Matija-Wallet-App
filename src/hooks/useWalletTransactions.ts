import { useQuery } from '@tanstack/react-query';
import MoralisService from '../services/MoralisService.ts';
import { EthereumAddressType } from '../types';
import { Config } from '../constants';
import useWalletStore from '../store/useWalletStore.ts';

const useWalletTransactions = (address: EthereumAddressType | undefined) => {
  const setWalletTransactions = useWalletStore(
    (state) => state.setWalletTransactions,
  );

  const enabled = !!address;
  const { isLoading, refetch, data } = useQuery({
    queryKey: ['get-wallet-transactions', address],
    queryFn: async () => {
      const result = await MoralisService.getInstance().getERC20TokenTransfers(
        address!,
      );
      setWalletTransactions(result);
      return result;
    },
    enabled,
    refetchInterval: Config.defaultRefetchTimeInterval,
  });

  return {
    isLoading,
    refetch,
    data: data ?? [],
  };
};
export default useWalletTransactions;
