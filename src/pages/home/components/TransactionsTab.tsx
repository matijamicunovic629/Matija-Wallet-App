import {
  Avatar,
  Box,
  Link,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
} from '@chakra-ui/react';
import useWalletTransactions from '../../../hooks/useWalletTransactions.ts';
import { useAccount } from 'wagmi';
import React, { useMemo } from 'react';
import { TransactionRowProps, TransactionType } from '../../../types';
import { formatDate, shrinkAddress } from '../../../utils';

const TokensHeaderItem = () => {
  return (
    <SimpleGrid
      columns={{ base: 2, md: 4 }}
      spacing={4}
      p="1rem 1rem"
      color="main.secondaryColor"
      fontWeight="bold"
    >
      <Box>Transaction</Box>
      <Box textAlign="right">Amount</Box>
      <Box textAlign="right" display={{ base: 'none', md: 'block' }}>
        Date
      </Box>
      <Box textAlign="right" display={{ base: 'none', md: 'block' }}>
        txHash
      </Box>
    </SimpleGrid>
  );
};

const TransactionRow = React.memo(({ item }: TransactionRowProps) => {
  const { descriptionText, changedAmountText, changedAmountColorName } =
    useMemo(() => {
      const descriptionText =
        item.transactionType === TransactionType.Sent
          ? `To ${shrinkAddress(item.toAddress)}`
          : `From: ${shrinkAddress(item.fromAddress)}`;

      const prefix = item.transactionType === TransactionType.Sent ? '-' : '+';

      return {
        descriptionText,
        changedAmountText: `${prefix} ${item.valueDecimal.toLocaleString()} ${item.tokenSymbol}`,
        changedAmountColorName:
          item.transactionType === TransactionType.Received
            ? 'main.successColor'
            : '',
      };
    }, [item]);

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
    >
      <Box className="flex-start">
        <Avatar boxSize={['2rem', '2.5rem']} src={item.logoUrl}></Avatar>
        <Box pl={['.8rem', '1rem']}>
          <Text>{item.transactionType}</Text>
          <Text fontSize="sm" color="main.secondaryColor">
            {descriptionText}
          </Text>
        </Box>
      </Box>
      <Box className="flex-end" color={changedAmountColorName} fontSize="md">
        {changedAmountText}
      </Box>
      <Box
        className="flex-end"
        display={{ base: 'none', md: 'flex' }}
        color="main.secondaryColor"
      >
        {formatDate(item.time)}
      </Box>
      <Box
        display={{ base: 'none', md: 'flex' }}
        alignItems="center"
        justifyContent="end"
        color="main.secondaryColor"
      >
        <Link>{shrinkAddress(item.txHash)}</Link>
      </Box>
    </SimpleGrid>
  );
});

const TransactionsTab = () => {
  const { address } = useAccount();
  const { isLoading, data: walletTransactions } =
    useWalletTransactions(address);

  return (
    <div>
      <TokensHeaderItem />
      <Stack hidden={!isLoading}>
        <Skeleton height="3rem"></Skeleton>
        <Skeleton height="3rem"></Skeleton>
      </Stack>
      {walletTransactions.map((walletTransaction, index) => (
        <TransactionRow
          item={walletTransaction}
          key={`transaction-row-${index}`}
        />
      ))}
    </div>
  );
};

export default TransactionsTab;
