import { Flex, Icon, Link, Menu, MenuButton, Text } from '@chakra-ui/react';
import type { IconType } from 'react-icons';

interface NavItemProps {
  navSize?: string;
  title?: string;
  icon?: IconType;
  active?: boolean;
  disabled?: boolean;
}

const NavItem = ({ navSize, title, icon, active, disabled }: NavItemProps) => {
  return (
    <Flex
      mt={30}
      flexDir="column"
      w="100%"
      opacity={disabled ? '.3' : ''}
      alignItems={navSize == 'small' ? 'center' : 'flex-start'}
    >
      <Menu placement="right">
        <Link
          backgroundColor={active ? 'violet.accentBgColor' : ''}
          p={3}
          w={navSize == 'small' ? '' : '100%'}
          borderRadius={8}
          _hover={
            disabled
              ? {}
              : { textDecor: 'none', backgroundColor: 'violet.accentBgColor' }
          }
          // w={navSize == "large" && "100%"}
        >
          <MenuButton w="100%">
            <Flex>
              <Icon
                as={icon}
                fontSize="xl"
                color={active ? 'violet.accentColor' : 'white'}
              />
              <Text
                ml={5}
                display={navSize == 'small' ? 'none' : 'flex'}
                color={active ? 'violet.selectedTextColor' : 'white'}
              >
                {title}
              </Text>
            </Flex>
          </MenuButton>
        </Link>
      </Menu>
    </Flex>
  );
};

export default NavItem;
