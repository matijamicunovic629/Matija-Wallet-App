import { LayoutProps } from '../types';
import { Flex, SimpleGrid } from '@chakra-ui/react';
import SideBar from '../components/SideBar';
import { useAuth } from '../context/AuthContext.tsx';

const UserLayout = ({ children }: LayoutProps) => {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      {isAuthenticated ? (
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
