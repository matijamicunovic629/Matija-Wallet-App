import {
  Avatar,
  Box,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useAccount } from 'wagmi';
import useWalletBalances from '../../../hooks/useWalletBalances.ts';
import {
  TokenInfoType,
  TokenRowProps,
  WalletTokenBalance,
} from '../../../types';
import React from 'react';
import useSendTokenModalStore from '../../../store/useSendTokenModalStore.ts';

const TokensHeaderItem = () => {
  return (
    <SimpleGrid
      columns={{ base: 2, md: 4 }}
      spacing={4}
      p="1rem 1rem"
      color="main.secondaryColor"
      fontWeight="bold"
    >
      <Box>Assets</Box>
      <Box textAlign="right">Balance</Box>
      <Box textAlign="right" display={{ base: 'none', md: 'block' }}>
        Price
      </Box>
      <Box textAlign="right" display={{ base: 'none', md: 'block' }}>
        Chart
      </Box>
    </SimpleGrid>
  );
};

const TokenRow = React.memo(({ item, onClick }: TokenRowProps) => {
  return (
    <SimpleGrid
      columns={{ base: 2, md: 4 }}
      spacing={4}
      fontSize={['1rem', '1.2rem']}
      p="1rem 1rem"
      _hover={{
        cursor: 'pointer',
        backgroundColor: 'main.accentTransparentBgColor',
      }}
      onClick={() => onClick(item)}
    >
      <Box className="flex-start">
        <Avatar boxSize={['2rem', '2.5rem']} src={item.logoUrl}></Avatar>
        <Text pl={['.8rem', '1rem']}>{item.name}</Text>
      </Box>
      <Box className="flex-end">{item.balanceDecimal.toLocaleString()}</Box>
      <Box className="flex-end" display={{ base: 'none', md: 'flex' }}>
        ---
      </Box>
      <Box
        display={{ base: 'none', md: 'flex' }}
        alignItems="center"
        justifyContent="end"
      >
        <img src={`/public/template-chart.svg`} alt="Chart" />
      </Box>
    </SimpleGrid>
  );
});

const TokensTab = () => {
  const { address } = useAccount();
  const { isLoading, data: walletTokenBalances } = useWalletBalances(address);
  const { openModal } = useSendTokenModalStore();

  const handleClickRow = (item: WalletTokenBalance) => {
    openModal({
      tokenAddress: item.tokenAddress,
      symbol: item.symbol,
      logoUrl: item.logoUrl,
      decimals: item.decimals,
    } as TokenInfoType);
  };

  return (
    <div>
      <TokensHeaderItem />
      <Stack hidden={!isLoading}>
        <Skeleton height="3rem"></Skeleton>
        <Skeleton height="3rem"></Skeleton>
      </Stack>
      {walletTokenBalances.map((tokenBalanceItem, index) => (
        <TokenRow
          item={tokenBalanceItem}
          onClick={handleClickRow}
          key={`balance-row-${index}`}
        />
      ))}
    </div>
  );
};

export default TokensTab;
