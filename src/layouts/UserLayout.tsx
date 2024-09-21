import { LayoutProps } from '../types';
import { Flex, SimpleGrid } from '@chakra-ui/react';
import SideBar from '../components/SideBar';
import { useAccount } from 'wagmi';

const UserLayout = ({ children }: LayoutProps) => {
  const { isConnected } = useAccount();

  return (
    <div>
      {isConnected ? (
        <Flex direction="column">
          <Flex w="100%" maxWidth={1480} h="auto">
            <SideBar />
            <SimpleGrid flex="1" gap="3" minChildWidth="320px">
              {children}
            </SimpleGrid>
          </Flex>
        </Flex>
      ) : (
        <>{children}</>
      )}
    </div>
  );
};

export default UserLayout;
