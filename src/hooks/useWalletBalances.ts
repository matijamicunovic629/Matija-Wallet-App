import { useQuery } from '@tanstack/react-query';
import MoralisService from '../services/MoralisService.ts';
import { EthereumAddressType } from '../types';
import { Config } from '../constants';
import useWalletStore from '../store/useWalletStore.ts';

const useWalletBalances = (address: EthereumAddressType | undefined) => {
  const setWalletTokenBalances = useWalletStore(
    (state) => state.setWalletTokenBalances,
  );

  const enabled = !!address;
  const { isLoading, refetch, data } = useQuery({
    queryKey: ['get-wallet-balances', address],
    queryFn: async () => {
      const result =
        await MoralisService.getInstance().getWalletERC20TokenBalances(
          address!,
        );
      setWalletTokenBalances(result);
      return result;
    },
    enabled,
    refetchInterval: Config.defaultRefetchTimeInterval,
  });

  return {
    isLoading,
    refetch,
    data,
  };
};
export default useWalletBalances;
