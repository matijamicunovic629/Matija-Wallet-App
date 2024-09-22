import {
  isValidWalletAddress,
  getTokenImgUrlByAddress,
  compareWalletAddresses,
  formatDate,
  shrinkAddress,
  formatNumberByFrac,
} from './index';

// Mocking the constants
vi.mock('../constants', () => ({
  mapAddressToTokenImgUrl: {
    '0x1234567890abcdef1234567890abcdef12345678': '/matija-token.png',
  },
  unknownTokenImgUrl: '/unknown-token.png',
}));

describe('Utility Functions', () => {
  describe('isValidWalletAddress', () => {
    it('returns true for valid Ethereum addresses', () => {
      const address = '0x1234567890abcdef1234567890abcdef12345678';
      expect(isValidWalletAddress(address)).toBe(true);
    });

    it('returns false for invalid Ethereum addresses', () => {
      const address = '0x12345';
      expect(isValidWalletAddress(address)).toBe(false);
    });
  });

  describe('getTokenImgUrlByAddress', () => {
    it('returns the correct image URL for a known token address', () => {
      const address = '0x1234567890abcdef1234567890abcdef12345678';
      expect(getTokenImgUrlByAddress(address)).toBe('/matija-token.png');
    });

    it('returns the unknown token image URL for an unknown token address', () => {
      const address = '0xabcdefabcdefabcdefabcdefabcdefabcdef123456';
      expect(getTokenImgUrlByAddress(address)).toBe('/unknown-token.png');
    });
  });

  describe('compareWalletAddresses', () => {
    it('returns true for identical addresses regardless of case', () => {
      const address1 = '0x1234567890abcdef1234567890abcdef12345678';
      const address2 = '0X1234567890ABCDEF1234567890ABCDEF12345678';
      expect(compareWalletAddresses(address1, address2)).toBe(true);
    });

    it('returns false for different addresses', () => {
      const address1 = '0x1234567890abcdef1234567890abcdef12345678';
      const address2 = '0xabcdefabcdefabcdefabcdefabcdefabcdef123456';
      expect(compareWalletAddresses(address1, address2)).toBe(false);
    });
  });

  describe('formatDate', () => {
    it('formats date correctly', () => {
      const date = new Date('2024-09-19T18:45:00');
      expect(formatDate(date)).toBe('Sep 19, 2024, 06:45 PM');
    });

    it('formats string date correctly', () => {
      const dateStr = '2024-09-19T18:45:00';
      expect(formatDate(dateStr)).toBe('Sep 19, 2024, 06:45 PM');
    });
  });

  describe('shrinkAddress', () => {
    it('shortens the Ethereum address correctly', () => {
      const address = '0x1234567890abcdef1234567890abcdef12345678';
      expect(shrinkAddress(address)).toBe('0x1234...5678');
    });

    it('returns original address if its length is less than 10 characters', () => {
      const address = '0x123';
      expect(shrinkAddress(address)).toBe(address);
    });
  });

  describe('formatNumberByFrac', () => {
    it('formats number to specified decimal places', () => {
      const num = 1234.56789;
      expect(formatNumberByFrac(num, 2)).toBe('1234.57');
    });

    it('handles integers correctly', () => {
      const num = 1234;
      expect(formatNumberByFrac(num, 2)).toBe('1234');
    });

    it('handles small numbers correctly', () => {
      const num = 0.0000045663;
      expect(formatNumberByFrac(num, 8)).toBe('0.00000457');
    });

    it('returns "0" for undefined input', () => {
      expect(formatNumberByFrac(undefined)).toBe('0');
    });
  });
});
