import { Avatar, Box, Link, SimpleGrid, Text } from '@chakra-ui/react';

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

const TokenRowItem = () => {
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
        <Avatar
          boxSize={['2rem', '2.5rem']}
          src="/public/ethereum_logo.png"
        ></Avatar>
        <Box pl={['.8rem', '1rem']}>
          <Text>Sent</Text>
          <Text fontSize="sm" color="main.secondaryColor">
            To 0xa8df…c78c
          </Text>
        </Box>
      </Box>
      <Box className="flex-end" color="main.successColor" fontSize="md">
        + 432.23 MTJ
      </Box>
      <Box
        className="flex-end"
        display={{ base: 'none', md: 'flex' }}
        color="main.secondaryColor"
      >
        Sep 19, 2024, 06:45 PM
      </Box>
      <Box
        display={{ base: 'none', md: 'flex' }}
        alignItems="center"
        justifyContent="end"
        color="main.secondaryColor"
      >
        <Link>0xasdf..asd</Link>
      </Box>
    </SimpleGrid>
  );
};

const TransactionsTab = () => {
  return (
    <div>
      <TokensHeaderItem />
      <TokenRowItem />
      <TokenRowItem />
      <TokenRowItem />
      <TokenRowItem />
      <TokenRowItem />
      <TokenRowItem />
      <TokenRowItem />
      <TokenRowItem />
    </div>
  );
};

export default TransactionsTab;
