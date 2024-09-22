export interface LayoutProps {
  children: React.ReactNode;
}

export type EthereumAddressType = `0x${string}`;

export type WalletTokenBalance = {
  tokenAddress: EthereumAddressType;
  symbol: string;
  name: string;
  logoUrl: string;
  decimals: number;
  balance: string;
  balanceDecimal: number;
};

export enum TransactionType {
  Sent = 'Sent',
  Received = 'Received',
}

export type WalletTransaction = {
  transactionType: TransactionType;
  transferAmount: number;
  fromAddress: EthereumAddressType;
  toAddress: EthereumAddressType;
  tokenSymbol: string;
  time: Date;
  txHash: string;
};
