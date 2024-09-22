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
      // return [];

      /*
      const response = {
        raw: [
          {
            token_address: '0x703606c6e30b84570a4b85c5cac30632d763e12c',
            symbol: 'MTJ',
            name: 'Matija',
            logo: null,
            thumbnail: null,
            decimals: 9,
            balance: '987656000000000',
            possible_spam: false,
            verified_contract: false,
            total_supply: '1000000000000000',
            total_supply_formatted: '1000000',
            percentage_relative_to_total_supply: 98.7656,
            security_score: null,
          },
          {
            token_address: '0x40e44f897493e6c30c0db9cec2120aed3aff1818',
            symbol: 'MTJ',
            name: 'Matija',
            logo: null,
            thumbnail: null,
            decimals: 18,
            balance: '1000000000000000000000000',
            possible_spam: false,
            verified_contract: false,
            total_supply: '1000000000000000000000000',
            total_supply_formatted: '1000000',
            percentage_relative_to_total_supply: 100,
            security_score: null,
          },
          {
            token_address: '0x26931e112c939e41951984cfe4b6ded8f2ecddc8',
            symbol: 'MTJ',
            name: 'Matija',
            logo: null,
            thumbnail: null,
            decimals: 18,
            balance: '1000000000000000000000000',
            possible_spam: false,
            verified_contract: false,
            total_supply: '1000000000000000000000000',
            total_supply_formatted: '1000000',
            percentage_relative_to_total_supply: 100,
            security_score: null,
          },
        ],
      };
*/

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
      /*
      const response = {
        raw: {
          page: 0,
          page_size: 100,
          cursor: null,
          result: [
            {
              token_name: 'Matija',
              token_symbol: 'MTJ',
              token_logo: null,
              token_decimals: '9',
              from_address_entity: null,
              from_address_entity_logo: null,
              from_address: '0x6ca9e422ec06bdd730f81e703a16cfec4a051a5f',
              from_address_label: null,
              to_address_entity: null,
              to_address_entity_logo: null,
              to_address: '0x4b8d3cbf98ed3011099a6ec4b7feabb517295900',
              to_address_label: null,
              address: '0x703606c6e30b84570a4b85c5cac30632d763e12c',
              block_hash:
                '0x8d1744cbcc41269067394241c46ccbd0cad3e698ede195917da113540c35bb38',
              block_number: '6736549',
              block_timestamp: '2024-09-22T02:13:48.000Z',
              transaction_hash:
                '0x862a30a1b391b77a1e00c32834d16f0990f4f5b80e9351fe20c25de01570dfc2',
              transaction_index: 36,
              log_index: 94,
              value: '12344000000000',
              possible_spam: false,
              value_decimal: '12344',
              verified_contract: false,
              security_score: null,
            },
            {
              token_name: 'Matija',
              token_symbol: 'MTJ',
              token_logo: null,
              token_decimals: '9',
              from_address_entity: null,
              from_address_entity_logo: null,
              from_address: '0x0000000000000000000000000000000000000000',
              from_address_label: null,
              to_address_entity: null,
              to_address_entity_logo: null,
              to_address: '0x6ca9e422ec06bdd730f81e703a16cfec4a051a5f',
              to_address_label: null,
              address: '0x703606c6e30b84570a4b85c5cac30632d763e12c',
              block_hash:
                '0x60ad9999edfaac7b4f56291772866fb67a5660f3f1e4ed050b8e8fec3eb1503f',
              block_number: '6727945',
              block_timestamp: '2024-09-20T15:33:00.000Z',
              transaction_hash:
                '0xb5200493c523effea7d92f0f9bbd7b287a69fedaa2fc0afd92c321add338ed36',
              transaction_index: 119,
              log_index: 154,
              value: '1000000000000000',
              possible_spam: false,
              value_decimal: '1000000',
              verified_contract: false,
              security_score: null,
            },
            {
              token_name: 'Matija',
              token_symbol: 'MTJ',
              token_logo: null,
              token_decimals: '18',
              from_address_entity: null,
              from_address_entity_logo: null,
              from_address: '0x0000000000000000000000000000000000000000',
              from_address_label: null,
              to_address_entity: null,
              to_address_entity_logo: null,
              to_address: '0x6ca9e422ec06bdd730f81e703a16cfec4a051a5f',
              to_address_label: null,
              address: '0x26931e112c939e41951984cfe4b6ded8f2ecddc8',
              block_hash:
                '0xd56da6d277cf9bc4dcff7a6b93103dfac124aa0df64fac52042a9d5ee5389e88',
              block_number: '6727876',
              block_timestamp: '2024-09-20T15:16:00.000Z',
              transaction_hash:
                '0xf8280a2c478919f46325e7b4912c88dae7c4cc351c07e8a00f7d97a01ad6679c',
              transaction_index: 160,
              log_index: 247,
              value: '1000000000000000000000000',
              possible_spam: false,
              value_decimal: '1000000',
              verified_contract: false,
              security_score: null,
            },
            {
              token_name: 'Matija',
              token_symbol: 'MTJ',
              token_logo: null,
              token_decimals: '18',
              from_address_entity: null,
              from_address_entity_logo: null,
              from_address: '0x0000000000000000000000000000000000000000',
              from_address_label: null,
              to_address_entity: null,
              to_address_entity_logo: null,
              to_address: '0x6ca9e422ec06bdd730f81e703a16cfec4a051a5f',
              to_address_label: null,
              address: '0x40e44f897493e6c30c0db9cec2120aed3aff1818',
              block_hash:
                '0x33a949230b6f5dd3d01a9fca65b6dc38a575e5a4477033fe4fc3b2fb40889042',
              block_number: '6727847',
              block_timestamp: '2024-09-20T15:09:00.000Z',
              transaction_hash:
                '0x5b74e2607e37de9bdca4020008e9433c415ae893c66e6d3d9926b739ce9087db',
              transaction_index: 154,
              log_index: 156,
              value: '1000000000000000000000000',
              possible_spam: false,
              value_decimal: '1000000',
              verified_contract: false,
              security_score: null,
            },
          ],
        },
      };
*/

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
