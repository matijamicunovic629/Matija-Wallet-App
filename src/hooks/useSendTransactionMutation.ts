import { useMutation } from '@tanstack/react-query';
import { ethers, JsonRpcSigner } from 'ethers';
import { erc20Abi } from 'viem';
import { EthereumAddressType } from '../types';

interface mutationDataParams {
  tokenAddress: string;
  sendAddress: EthereumAddressType | undefined;
  sendAmount: number;
  signer: JsonRpcSigner | undefined;
  gasLimit: bigint;
}

export const useSendTransactionMutation = () => {
  return useMutation({
    mutationFn: async (data: mutationDataParams) => {
      if (!data.sendAddress || !data.signer || !data.sendAmount) {
        throw new Error('sendAddress, signer, sendAmount must be provided');
      }

      const tokenContract = new ethers.Contract(
        data.tokenAddress as string,
        erc20Abi,
        data.signer,
      );
      const decimals = await tokenContract.decimals();
      const amountValue = ethers.parseUnits(
        data.sendAmount.toString(),
        decimals,
      );

      const tx = {
        to: data.tokenAddress,
        data: tokenContract.interface.encodeFunctionData('transfer', [
          data.sendAddress,
          amountValue,
        ]),
        // gasPrice: ethers.parseUnits('10', 'gwei'),
        gasLimit: 21762n, // Example static gas limit
        value: 0n,
      };
      const transactionResponse = await data.signer?.sendTransaction(tx);
      const receipt = await transactionResponse.wait();
      console.log('Transaction successful:', receipt);
      return receipt;
    },
  });
};
