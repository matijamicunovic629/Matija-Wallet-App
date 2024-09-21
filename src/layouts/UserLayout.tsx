import { LayoutProps } from '../types';
import { Box, Flex } from '@chakra-ui/react';
import SideBar from '../components/SideBar';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const UserLayout = ({ children }: LayoutProps) => {
  const { isConnected } = useAccount();

  return (
    <div>
      {isConnected ? (
        <Flex direction="column">
          <Flex w="100%" h="auto">
            <SideBar />
            <Box w="100%" maxWidth={1480} margin="0 auto">
              <Flex float="right" p="10px 10px 0px 0px">
                <ConnectButton />
              </Flex>

              <Box w="100%" p="4rem 1rem">
                {children}
              </Box>
            </Box>
          </Flex>
        </Flex>
      ) : (
        <>{children}</>
      )}
    </div>
  );
};

export default UserLayout;
