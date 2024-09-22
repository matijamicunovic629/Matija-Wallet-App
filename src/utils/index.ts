import { mapAddressToTokenImgUrl, unknownTokenImgUrl } from '../constants';

const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;

export const isValidWalletAddress = (address: string): boolean => {
  return ethAddressRegex.test(address);
};

/**
 * Retrieves the image URL for a token given its address.
 *
 * @param {string} address - The address of the token.
 * @returns {string} - The URL of the token's image. If the token address is not found,
 *                     it returns a default 'unknown' token image URL.
 */
export const getTokenImgUrlByAddress = (address: string): string => {
  return mapAddressToTokenImgUrl[address] ?? unknownTokenImgUrl;
};
