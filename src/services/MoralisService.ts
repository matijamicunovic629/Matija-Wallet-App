import Moralis from 'moralis';
import { Config, sepoliaChainId } from '../constants';
import {
  EthereumAddressType,
  WalletTransaction,
  TransactionType,
  WalletTokenBalance,
} from '../types';
import { compareWalletAddresses, getTokenImgUrlByAddress } from '../utils';
import { ethers } from 'ethers';

class MoralisService {
  private static _instance: MoralisService | null;

  constructor() {
    this.init();
  }

  static getInstance = () => {
    if (!MoralisService._instance)
      MoralisService._instance = new MoralisService();

    return MoralisService._instance;
  };

  init() {
    (async () => {
      try {
        await Moralis.start({
          apiKey: Config.MoralisApiKey,
        });
      } catch (e) {
        console.error('failed to initialize MoralisService', e);
      }
    })();
  }

  /**
   * Fetches the ERC-20 token balances for a given Ethereum address on a specified chain.
   *
   * @param {EthereumAddressType} address - The Ethereum address to check.
   * @param {string} [chain=sepoliaChainId] - The blockchain network ID (default: Sepolia).
   * @returns {Promise<WalletTokenBalance[]>} A promise that resolves to an array of WalletBalanceItems.
   */
  getWalletERC20TokenBalances = async (
    address: EthereumAddressType,
    chain: string = sepoliaChainId,
  ): Promise<WalletTokenBalance[]> => {
    try {
      const response = await Moralis.EvmApi.token.getWalletTokenBalances({
        chain,
        address,
      });

      return response.raw.map((item) => {
        return {
          tokenAddress: item.token_address,
          symbol: item.symbol,
          name: item.name,
          logoUrl: getTokenImgUrlByAddress(item.token_address),
          decimals: item.decimals,
          balance: item.balance,
          balanceDecimal: Number(
            ethers.formatUnits(item.balance, item.decimals),
          ),
        } as WalletTokenBalance;
      });
    } catch (e) {
      console.error('failed to get WalletTokenBalances', e);
    }

    return [];
  };

  /**
   * Fetches the ERC-20 token transfers for a given Ethereum address on a specified chain.
   *
   * @param {EthereumAddressType} address - The Ethereum address to check.
   * @param {string} [chain=sepoliaChainId] - The blockchain network ID (default: Sepolia).
   * @returns {Promise<WalletTransaction[]>} A promise that resolves to an array of TransactionItems.
   */
  getERC20TokenTransfers = async (
    address: EthereumAddressType,
    chain: string = sepoliaChainId,
  ): Promise<WalletTransaction[]> => {
    try {
      const response = await Moralis.EvmApi.token.getWalletTokenTransfers({
        chain,
        order: 'DESC',
        address,
      });

      return response.raw.result.map((responseItem) => {
        return {
          transactionType: compareWalletAddresses(
            responseItem.from_address,
            address,
          )
            ? TransactionType.Sent
            : TransactionType.Received,
          transferAmount: Number(responseItem.value_decimal),
          fromAddress: responseItem.from_address as EthereumAddressType,
          toAddress: responseItem.to_address as EthereumAddressType,
          logoUrl: getTokenImgUrlByAddress(responseItem.address),
          tokenSymbol: responseItem.token_symbol,
          value: responseItem.value,
          valueDecimal: Number(responseItem.value_decimal),
          time: new Date(responseItem.block_timestamp),
          txHash: responseItem.transaction_hash,
        };
      }) as WalletTransaction[];
    } catch (e) {
      console.error('failed to get WalletTokenBalances', e);
    }

    return [];
  };
}

export default MoralisService;
