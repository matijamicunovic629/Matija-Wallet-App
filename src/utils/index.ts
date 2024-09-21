const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;

export const isValidWalletAddress = (address: string): boolean => {
  return ethAddressRegex.test(address);
};
