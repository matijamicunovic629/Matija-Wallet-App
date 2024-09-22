import { erc20Abi } from 'viem';
import { useQuery } from '@tanstack/react-query';
import { EthereumAddressType } from '../types';
import { Config } from '../constants';
import { useAccount } from 'wagmi';
import { Contract, ethers } from 'ethers';
import { useEthersProvider } from './useEthersProvider.ts';
import { useCallback } from 'react';

const useTokenBalance = (tokenAddress: EthereumAddressType | undefined) => {
  const { address } = useAccount();
  const provider = useEthersProvider();
  const enabled = !!tokenAddress && !!address;

  const fetchBalanceAndDecimals = useCallback(async () => {
    if (!address || !provider) return null;

    const contract = new Contract(tokenAddress as string, erc20Abi, provider);
    const [balance, decimals] = await Promise.all([
      contract.balanceOf(address),
      contract.decimals(),
    ]);

    return Number(ethers.formatUnits(balance, decimals));
  }, [address, provider, tokenAddress]);

  const { isLoading, refetch, data } = useQuery({
    queryKey: ['get-token-balance', tokenAddress, address],
    queryFn: fetchBalanceAndDecimals,
    enabled,
    refetchInterval: Config.defaultRefetchTimeInterval,
  });

  return {
    isLoading,
    refetch,
    balance: data ?? 0,
  };
};
export default useTokenBalance;
