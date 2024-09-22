import { getTokenImgUrlByAddress } from '../utils';
import { ethers } from 'ethers';

export const MSG = {
  TransactionStatus: {
    success: 'Transaction Confirmed',
    failed: 'Transaction Failed',
  },
  Error: {
    RejectedTransaction: 'User Rejected Transaction',
  },
};

export const Config = {
  MoralisApiKey: import.meta.env.VITE_MORALIS_API_KEY ?? '',
  MatijaTokenAddress: import.meta.env.VITE_MATIJA_TOKEN_ADDRESS ?? '',
  RainbowProjectId: import.meta.env.VITE_RAINBOWKIT_PROJECT_ID ?? '',
  defaultRefetchTimeInterval: 60_000,
};

export const sepoliaChainId = '0xaa36a7';

export const unknownTokenImgUrl = '/unknown-token.jpeg';

export const mapAddressToTokenImgUrl: Record<string, string> = {
  [Config.MatijaTokenAddress]: '/matija-token.png',
};

export const defaultTokenInfo = {
  tokenAddress: Config.MatijaTokenAddress,
  symbol: 'MTJ',
  logoUrl: getTokenImgUrlByAddress(Config.MatijaTokenAddress),
  decimals: 9,
};

export const defaultMaxPriorityFee = ethers.parseUnits('1.5', 'gwei');
export const defaultGasLimit = 210000n;
