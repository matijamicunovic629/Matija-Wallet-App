import {
  Text,
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Heading,
} from '@chakra-ui/react';
import TokensTab from './components/TokensTab';
import TransactionsTab from './components/TransactionsTab';
import SendTokenModal from '../../components/SendTokenModal/SendTokenModal';

const HomePage = () => {
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
        <Heading as="h1" size="xl" fontSize={['2rem', '2rem', '4rem', '4rem']}>
          234234 MTJ
        </Heading>
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
