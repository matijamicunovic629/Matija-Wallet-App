import { Divider, Flex, Heading, IconButton } from '@chakra-ui/react';
import { useState } from 'react';
import { FiHash, FiLayout, FiMenu, FiSettings, FiUser } from 'react-icons/fi';
import NavItem from '../NavItem';

const SideBar = () => {
  const [navSize, changeNavSize] = useState('large');

  return (
    <Flex
      position="sticky"
      h="100vh"
      bg="gray.900"
      borderRadius={navSize == 'small' ? '0  20px 20px 0' : '0 10px 10px 0'}
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.5)"
      w={navSize == 'small' ? '6rem' : '15rem'}
      flexDir="column"
      justifyContent="space-between"
      color="white"
    >
      <Flex
        p="5%"
        flexDir="column"
        alignItems={navSize == 'small' ? 'center' : 'flex-start'}
        as="nav"
      >
        <IconButton
          aria-label=" Menu database"
          color="yellow.400"
          background="none"
          mt={5}
          _hover={{ background: 'none' }}
          icon={<FiMenu />}
          onClick={() => {
            if (navSize == 'small') changeNavSize('large');
            else changeNavSize('small');
          }}
        />
        <NavItem navSize={navSize} icon={FiHash} title="Assets" />
        <NavItem navSize={navSize} icon={FiSettings} title="Send" />
        <NavItem navSize={navSize} icon={FiUser} title="Swap" disabled={true} />
        <NavItem
          navSize={navSize}
          icon={FiLayout}
          title="Bridge"
          disabled={true}
        />
      </Flex>

      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize == 'small' ? 'center' : 'flex-start'}
        mb={4}
      >
        <Divider display={navSize == 'small' ? 'none' : 'flex'} />
        <Flex mt={4} align="center">
          <Flex
            flexDir="column"
            ml={4}
            display={navSize == 'small' ? 'none' : 'flex'}
          >
            <Heading as="h3" size="sm">
              Matija Micunovic
            </Heading>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SideBar;
