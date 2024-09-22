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
  logoUrl: string;
  value: string;
  valueDecimal: number;
  time: Date;
  txHash: string;
};

export interface TokenRowProps {
  item: WalletTokenBalance;
  onClick: (item: WalletTokenBalance) => void;
}

export interface TransactionRowProps {
  item: WalletTransaction;
}

export interface TokenInfoType {
  tokenAddress: EthereumAddressType;
  symbol: string;
  logoUrl: string;
  decimals: number;
}

export interface AvailableTokenRowProps {
  tokenInfo: TokenInfoType;
  balance: number;
  isLoading: boolean;
}

export interface PreviewDetailItemProps {
  title: string;
  value: string;
  isLoading?: boolean;
}

export interface TransactionError extends Error {
  code?: string;
}
