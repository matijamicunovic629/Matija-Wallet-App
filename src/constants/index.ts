export const MSG = {
  TransactionStatus: {
    success: 'Transaction Confirmed',
    failed: 'Transaction Failed',
  },
};

export const Config = {
  MoralisApiKey: import.meta.env.VITE_MORALIS_API_KEY ?? '',
  MatijaTokenAddress: import.meta.env.VITE_MATIJA_TOKEN_ADDRESS ?? '',
  RainbowProjectId: import.meta.env.VITE_RAINBOWKIT_PROJECT_ID ?? '',
  defaultRefetchTimeInterval: 60_000,
};

export const sepoliaChainId = '0xaa36a7';

export const unknownTokenImgUrl = '/public/unknown-token.jpeg';

export const mapAddressToTokenImgUrl: Record<string, string> = {
  [Config.MatijaTokenAddress]: '/public/matija-token.png',
};
