import { Avatar, Box, SimpleGrid, Text } from '@chakra-ui/react';

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
        <Text pl={['.8rem', '1rem']}>Sepolia ETH</Text>
      </Box>
      <Box className="flex-end">0.432</Box>
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
};

const TokensTab = () => {
  return (
    <div>
      <TokensHeaderItem />
      <TokenRowItem />
      <TokenRowItem />
      <TokenRowItem />
      <TokenRowItem />
    </div>
  );
};

export default TokensTab;
