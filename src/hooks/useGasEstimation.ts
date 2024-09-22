import { erc20Abi } from 'viem';
import { useQuery } from '@tanstack/react-query';
import { EthereumAddressType } from '../types';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import { useEthersProvider } from './useEthersProvider.ts';
import { useCallback } from 'react';

const useGasEstimation = (
  tokenAddress: EthereumAddressType | undefined,
  toAddress: EthereumAddressType | undefined,
  amount: number,
) => {
  const { address } = useAccount();
  const provider = useEthersProvider();
  const enabled =
    !!tokenAddress && !!toAddress && !!address && !!provider && amount > 0;

  const fetchGasEstimate = useCallback(async () => {
    try {
      const tokenContract = new ethers.Contract(
        tokenAddress as string,
        erc20Abi,
        provider,
      );

      const decimals = await tokenContract.decimals();
      const amountValue = ethers.parseUnits(amount.toString(), decimals);
      const tx = {
        to: toAddress,
        data: tokenContract.interface.encodeFunctionData('transfer', [
          toAddress,
          amountValue,
        ]),
        gasLimit: 210000n, // Example static gas limit
      };
      // Fetch Current Gas Price
      const gasPriceData = await provider!.getFeeData();
      console.log('gasPriceData', gasPriceData);
      const estimatedGas = (await provider?.estimateGas(tx)) ?? 0n;
      console.log('estimatedGas', estimatedGas);

      const estimatedGasCost = estimatedGas * (gasPriceData.gasPrice ?? 0n);

      // Fetch Native Balance of From Address
      const nativeBalance =
        (await provider?.getBalance(address as string)) ?? 0n;

      // Check if the native balance is sufficient to cover the gas cost
      const hasSufficientNativeBalance = nativeBalance > estimatedGasCost;

      if (!hasSufficientNativeBalance) {
        throw new Error('Insufficient native balance to cover the gas cost');
      }

      return {
        gasEstimate: ethers.formatEther(estimatedGasCost.toString()),
        hasSufficientNativeBalance,
      };
    } catch (e) {
      console.error('gas estimation error', e);
    }

    return null;
  }, [address, toAddress, provider, tokenAddress]);

  const { isLoading, refetch, data } = useQuery({
    queryKey: ['get-transaction-estimation', tokenAddress, address, amount],
    queryFn: fetchGasEstimate,
    enabled,
    refetchInterval: 6_000,
  });

  return {
    isLoading,
    refetch,
    data: data ?? { gasEstimate: 0, hasSufficientNativeBalance: true },
  };
};
export default useGasEstimation;
