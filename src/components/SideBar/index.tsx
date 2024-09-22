import { Divider, Flex, Heading, IconButton } from '@chakra-ui/react';
import { useState } from 'react';
import { FiArrowUp, FiHome, FiMenu } from 'react-icons/fi';
import NavItem from '../NavItem';
import { MdOutlineSwapVerticalCircle } from 'react-icons/md';
import { FaArrowsTurnToDots } from 'react-icons/fa6';
import { AiOutlineCodeSandbox } from 'react-icons/ai';
import useSendTokenModalStore from '../../store/useSendTokenModalStore.ts';

const SideBar = () => {
  const [navSize, changeNavSize] = useState('large');
  const { openModal: openSendTokenModal } = useSendTokenModalStore();

  const onClickSendTokenMenu = () => {
    openSendTokenModal();
  };

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
      display={{ base: 'none', md: 'flex' }}
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
          color="main.hamburger"
          background="none"
          mt={5}
          _hover={{ background: 'none' }}
          icon={<FiMenu />}
          onClick={() => {
            if (navSize == 'small') changeNavSize('large');
            else changeNavSize('small');
          }}
        />
        <NavItem navSize={navSize} icon={FiHome} title="Home" active={true} />
        <Divider
          borderColor={'main.divider'}
          mt={'1rem'}
          display={navSize == 'small' ? 'none' : 'flex'}
        />
        <NavItem
          navSize={navSize}
          icon={FiArrowUp}
          title="Send"
          onClick={onClickSendTokenMenu}
        />
        <NavItem
          navSize={navSize}
          icon={MdOutlineSwapVerticalCircle}
          title="Swap"
          disabled={true}
        />
        <NavItem
          navSize={navSize}
          icon={FaArrowsTurnToDots}
          title="Bridge"
          disabled={true}
        />
        <NavItem
          navSize={navSize}
          icon={AiOutlineCodeSandbox}
          title="Stake"
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
        <Divider
          borderColor={'main.divider'}
          display={navSize == 'small' ? 'none' : 'flex'}
        />
        <Flex mt={4} align="center">
          <Flex
            flexDir="column"
            ml={4}
            display={navSize == 'small' ? 'none' : 'flex'}
          >
            <Heading as="h3" size="sm">
              ❤️ by Matija Micunovic
            </Heading>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SideBar;
