import { ethers } from 'ethers';

export const MSG = {
  TransactionStatus: {
    success: 'Transaction Confirmed',
    failed: 'Transaction Failed',
  },
  Error: {
    RejectedTransaction: 'User Rejected Transaction',
    InsufficientNativeBalance:
      "You don't have enough native balance to pay gas fee",
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

export const MatijaTokenImgUrl = '/matija-token.png';

export const mapAddressToTokenImgUrl: Record<string, string> = {
  [Config.MatijaTokenAddress]: MatijaTokenImgUrl,
};

export const defaultTokenInfo = {
  tokenAddress: Config.MatijaTokenAddress,
  symbol: 'MTJ',
  logoUrl: MatijaTokenImgUrl,
  decimals: 9,
};

export const defaultExplorerUrl = `https://sepolia.etherscan.io/`;
export const defaultMaxPriorityFee = ethers.parseUnits('1.5', 'gwei');
export const defaultGasLimit = 210000n;

export const MORALIS_API_URL = 'https://deep-index.moralis.io/api/';
export const DELAYED_API_CALL_TIME = 2000;
