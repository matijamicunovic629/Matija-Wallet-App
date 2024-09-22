import {
  Alert,
  AlertIcon,
  AlertTitle,
  Avatar,
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import useSendTokenModalStore from '../../store/useSendTokenModalStore.ts';

const AvailableTokenRow = () => {
  return (
    <SimpleGrid
      columns={2}
      spacing={4}
      fontSize={['1rem', '1.2rem']}
      p="1rem 1rem"
    >
      <Box className="flex-start">
        <Avatar
          boxSize={['2rem', '2.5rem']}
          src="/public/ethereum_logo.png"
        ></Avatar>
        <Box pl={['.8rem', '1rem']}>
          <Text color="main.secondaryColor">Available</Text>
          <Text fontSize="sm" color="main.secondaryColor">
            Sepolia Eth
          </Text>
        </Box>
      </Box>
      <Box className="flex-end" fontSize="md">
        432.23
      </Box>
    </SimpleGrid>
  );
};

const InputAmountStep = () => {
  const { nextStep } = useSendTokenModalStore();

  const handleNext = () => {
    nextStep();
  };

  return (
    <div>
      <AvailableTokenRow />
      <Box p="1rem">
        <InputGroup>
          <InputRightElement mr=".3rem">
            <Button borderRadius="1rem" height="2rem" fontSize="sm">
              MAX
            </Button>
          </InputRightElement>
          <Input placeholder="Token Amount" type="number" />
        </InputGroup>
        <Alert status="error" mt="4px">
          <AlertIcon />
          <AlertTitle>Insufficient Balance</AlertTitle>
        </Alert>
      </Box>

      <Box p="1rem">
        <Input placeholder="To Address" />
        <Alert status="error" mt="4px">
          <AlertIcon />
          <AlertTitle>Invalid Wallet Address</AlertTitle>
        </Alert>
      </Box>

      <Flex justifyContent="end" mr="1rem" mt="2rem">
        <Button size="lg" disabled={true} onClick={handleNext}>
          Next
        </Button>
      </Flex>
    </div>
  );
};

export default InputAmountStep;
