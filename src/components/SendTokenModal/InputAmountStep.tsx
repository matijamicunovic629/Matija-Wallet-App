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
  Skeleton,
  Text,
} from '@chakra-ui/react';
import useSendTokenModalStore from '../../store/useSendTokenModalStore.ts';
import useTokenBalance from '../../hooks/useTokenBalance.ts';
import { AvailableTokenRowProps, EthereumAddressType } from '../../types';
import { useMemo, useState } from 'react';
import { isValidWalletAddress } from '../../utils';

const AvailableTokenRow = ({
  tokenInfo,
  balance,
  isLoading,
}: AvailableTokenRowProps) => {
  return (
    <SimpleGrid
      columns={2}
      spacing={4}
      fontSize={['1rem', '1.2rem']}
      p="1rem 1rem"
    >
      <Box className="flex-start">
        <Avatar boxSize={['2rem', '2.5rem']} src={tokenInfo.logoUrl}></Avatar>
        <Box pl={['.8rem', '1rem']}>
          <Text color="main.secondaryColor">Available</Text>
          <Text fontSize="sm" color="main.secondaryColor">
            {tokenInfo.symbol}
          </Text>
        </Box>
      </Box>
      <Box className="flex-end" fontSize="md">
        {isLoading ? (
          <Skeleton w={'4rem'} h={'1rem'}></Skeleton>
        ) : (
          <>{balance.toLocaleString()}</>
        )}
      </Box>
    </SimpleGrid>
  );
};

const InputAmountStep = () => {
  const {
    nextStep,
    tokenInfo,
    sendAmount,
    sendAddress,
    setSendAmount,
    setSendAddress,
  } = useSendTokenModalStore();
  const {
    isLoading: isBalanceLoading,
    // refetch: refetchBalance,
    balance,
  } = useTokenBalance(tokenInfo.tokenAddress);

  const [inputAmount, setInputAmount] = useState<number>(sendAmount);
  const [inputAddress, setInputAddress] = useState<string>(
    sendAddress as string,
  );

  const handleNext = () => {
    setSendAmount(inputAmount);
    setSendAddress(inputAddress as EthereumAddressType);
    nextStep();
  };

  const handleMaxClick = () => {
    setInputAmount(balance);
  };

  const onInputAmountChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputAmount(Number(e.target.value));
  };

  const onInputAddressChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputAddress(e.target.value as EthereumAddressType);
  };

  const isInsufficientBalance = inputAmount > balance;
  const isAmountGreaterThanZero = inputAmount > 0;
  const isInvalidWalletAddress = useMemo(() => {
    return !isValidWalletAddress(inputAddress);
  }, [inputAddress]);

  return (
    <div>
      <AvailableTokenRow
        tokenInfo={tokenInfo}
        balance={balance}
        isLoading={isBalanceLoading}
      />
      <Box p="1rem">
        <InputGroup>
          <InputRightElement mr=".3rem">
            <Button
              borderRadius="1rem"
              height="2rem"
              fontSize="sm"
              onClick={handleMaxClick}
            >
              MAX
            </Button>
          </InputRightElement>
          <Input
            placeholder="Token Amount"
            type="number"
            value={inputAmount === 0 ? '' : inputAmount}
            onChange={onInputAmountChanged}
          />
        </InputGroup>
        {isInsufficientBalance && (
          <Alert status="error" mt="4px">
            <AlertIcon />
            <AlertTitle>Insufficient Balance</AlertTitle>
          </Alert>
        )}
      </Box>

      <Box p="1rem">
        <Input
          placeholder="To Address"
          value={inputAddress}
          onChange={onInputAddressChanged}
        />
        {isInvalidWalletAddress && inputAddress?.length > 0 && (
          <Alert status="error" mt="4px">
            <AlertIcon />
            <AlertTitle>Invalid Wallet Address</AlertTitle>
          </Alert>
        )}
      </Box>

      <Flex justifyContent="end" mr="1rem" mt="2rem">
        <Button
          size="lg"
          isDisabled={
            !isAmountGreaterThanZero ||
            isInsufficientBalance ||
            isInvalidWalletAddress
          }
          onClick={handleNext}
          bg="main.accentColor"
        >
          Next
        </Button>
      </Flex>
    </div>
  );
};

export default InputAmountStep;
