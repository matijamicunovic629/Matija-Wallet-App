import { mapAddressToTokenImgUrl, unknownTokenImgUrl } from '../constants';
import moment from 'moment/moment';

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

/**
 * Formats a given Date object into a string with the format "MMM DD, YYYY, hh:mm A".
 *
 * @param {Date} date - The JavaScript Date object to format.
 * @returns {string} - The formatted date string.
 *
 * Example usage:
 * const date = new Date('2024-09-19T18:45:00');
 * console.log(formatDate(date)); // Output: Sep 19, 2024, 06:45 PM
 */
export const formatDate = (date: Date | string) => {
  return moment(date).format('MMM DD, YYYY, hh:mm A');
};

/**
 * Shortens an Ethereum address by keeping the first 6 and last 4 characters,
 * and replacing the middle with ellipses ('...').
 *
 * @param {string} address - The Ethereum address to shorten.
 * @returns {string} - The shortened address, or the original address if it's less than 10 characters long.
 *
 * Example usage:
 * const fullAddress = "0x1234567890abcdef1234567890abcdef12345678";
 * console.log(shrinkAddress(fullAddress)); // Output: 0x1234...5678
 */
export const shrinkAddress = (address: string): string => {
  if (!address || address.length < 10) {
    return address; // Return as-is if too short
  }
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

/**
 * Formats a given number to a specified number of decimal places.
 *
 * @param {number | undefined} num - The number to be formatted. If undefined, defaults to '0'.
 * @param {number} [fixedCount=2] - The number of decimal places to format the number to. Default is 2.
 * @returns {string} - The number formatted to the specified decimal places as a string.
 *
 * @remarks
 * - If the input number is an integer or its absolute value is between 0.01 and 0.000001,
 *   determines the number of digits after the decimal point needed for precision, then adds 2 more decimal places.
 * - Uses the `Math.round` method to ensure proper rounding according to the specified decimal places.
 */
export const formatNumberByFrac = (
  num: number | undefined,
  fixedCount: number = 2,
): string => {
  if (num === undefined) return '0';

  const threshold = 0.01;
  const minThreshold = 0.000001;
  num = parseFloat(num.toString());

  const getFixedNum = (num: number, fixedCount: number): string => {
    const multipleValue = 10 ** fixedCount;
    return (Math.round(num * multipleValue) / multipleValue).toString();
  };

  if (
    Number.isInteger(num) ||
    (Math.abs(num) < threshold && Math.abs(num) > minThreshold)
  ) {
    const lengthAfterDecimal = Math.ceil(Math.log10(1 / num));
    if (num > 0 && lengthAfterDecimal > 0) {
      return getFixedNum(num, lengthAfterDecimal + 2);
    }
  }

  return getFixedNum(num, fixedCount);
};
