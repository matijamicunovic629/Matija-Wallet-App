import { erc20Abi } from 'viem';
import { useQuery } from '@tanstack/react-query';
import { EthereumAddressType } from '../types';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import { useEthersProvider } from './useEthersProvider.ts';
import { useCallback } from 'react';
import { defaultGasLimit, defaultMaxPriorityFee } from '../constants';

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
        gasLimit: defaultGasLimit, // Example static gas limit
      };
      // Fetch Current Gas Price
      const gasPriceData = await provider!.getFeeData();
      console.log('gasPriceData', gasPriceData);
      const estimatedGasLimit = (await provider?.estimateGas(tx)) ?? 0n;
      console.log('estimatedGasLimit', estimatedGasLimit);

      const estimatedGasPrice =
        (gasPriceData.gasPrice ?? 0n) + defaultMaxPriorityFee;

      // I used defaultGasLimit instead of estimatedGasLimit, because it's testnet
      const estimatedGasCost = defaultGasLimit * estimatedGasPrice;

      // Fetch Native Balance of From Address
      const nativeBalance =
        (await provider?.getBalance(address as string)) ?? 0n;

      // Check if the native balance is sufficient to cover the gas cost
      const hasSufficientNativeBalance = nativeBalance > estimatedGasCost;

      return {
        gasLimit: defaultGasLimit, // estimatedGasLimit,
        gasPrice: estimatedGasPrice,
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
    data: data ?? {
      gasEstimate: 0n,
      gasPrice: 0n,
      hasSufficientNativeBalance: true,
      gasLimit: defaultGasLimit,
    },
  };
};
export default useGasEstimation;
