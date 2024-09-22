import {
  Box,
  Skeleton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import TokensTab from './components/TokensTab';
import TransactionsTab from './components/TransactionsTab';
import SendTokenModal from '../../components/SendTokenModal/SendTokenModal';
import { useAccount } from 'wagmi';
import useWalletBalances from '../../hooks/useWalletBalances.ts';
import { useEffect } from 'react';
import useWalletStore from '../../store/useWalletStore.ts';

const HomePage = () => {
  const { address } = useAccount();
  const matijaTokenBalance = useWalletStore(
    (state) => state.matijaTokenBalance,
  );
  const { isLoading, data } = useWalletBalances(address);

  useEffect(() => {
    console.log('data, isLoading', data, isLoading);
  }, [data, isLoading]);

  return (
    <div>
      <Box mt={'2rem'} mb={'2rem'}>
        <Text
          mb={'2px'}
          color="main.secondaryColor"
          fontSize={['.8rem', '.8rem', '1.5rem', '1.5rem']}
        >
          Balance
        </Text>
        <Skeleton
          isLoaded={!isLoading}
          minHeight="5rem"
          w="200px"
          display="inline-block"
        >
          <Box as="span" fontSize={['2rem', '2rem', '4rem', '4rem']}>
            {matijaTokenBalance} MTJ
          </Box>
        </Skeleton>
      </Box>

      <Tabs>
        <TabList>
          <Tab>Tokens</Tab>
          <Tab>Transactions</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <TokensTab />
          </TabPanel>
          <TabPanel>
            <TransactionsTab />
          </TabPanel>
        </TabPanels>
      </Tabs>

      <SendTokenModal />
    </div>
  );
};

export default HomePage;
