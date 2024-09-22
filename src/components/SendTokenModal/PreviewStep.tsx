import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  Skeleton,
} from '@chakra-ui/react';
import SendBadge from '../StatusBadges/sendBadge.tsx';
import useSendTokenModalStore from '../../store/useSendTokenModalStore.ts';
import { useAccount } from 'wagmi';
import { formatNumberByFrac, shrinkAddress } from '../../utils';
import {
  EthereumAddressType,
  PreviewDetailItemProps,
  TransactionError,
} from '../../types';
import useGasEstimation from '../../hooks/useGasEstimation.ts';
import { useEthersSigner } from '../../hooks/useEthersProvider.ts';
import { useSendTransactionMutation } from '../../hooks/useSendTransactionMutation.ts';
import { useState } from 'react';
import { MSG } from '../../constants';

const PreviewDetailItem = ({
  title,
  value,
  isLoading,
}: PreviewDetailItemProps) => {
  return (
    <SimpleGrid
      columns={2}
      spacing={4}
      p="1rem 1rem"
      mb={'2px'}
      background="main.modalSubBlock"
      borderRadius="2px"
      fontWeight="bold"
    >
      <Box color="main.secondaryColor">{title}</Box>
      <Box textAlign="right" className="flex-end">
        {isLoading ? <Skeleton w={'4rem'} h={'1rem'}></Skeleton> : <>{value}</>}
      </Box>
    </SimpleGrid>
  );
};

const PreviewStep = () => {
  const { address } = useAccount();
  const signer = useEthersSigner();

  const [isRejectedTransaction, setIsRejectedTransaction] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

  const { prevStep, nextStep, sendAddress, tokenInfo, sendAmount } =
    useSendTokenModalStore();
  const {
    isLoading: isEstimationLoading,
    data: { gasEstimate, hasSufficientNativeBalance, gasLimit, gasPrice },
  } = useGasEstimation(tokenInfo.tokenAddress, sendAddress, sendAmount);

  const { mutate: sendTransactionMutate } = useSendTransactionMutation();

  const handlePrev = () => {
    prevStep();
  };

  const handleConfirm = () => {
    // nextStep();
    setIsRejectedTransaction(false);
    setIsConfirming(true);

    sendTransactionMutate(
      {
        tokenAddress: tokenInfo.tokenAddress,
        sendAddress,
        sendAmount,
        signer,
        gasLimit,
        gasPrice,
      },
      {
        onSuccess: (receipt) => {
          setIsConfirming(false);
          nextStep(true); // succeed
          console.log('success', receipt);
        },
        onError: (error: TransactionError) => {
          setIsConfirming(false);
          if (error?.code === 'ACTION_REJECTED') {
            setIsRejectedTransaction(true);
          } else {
            nextStep(false); // succeed
          }
        },
      },
    );
  };

  return (
    <div>
      <Box>
        {/* begin of send icon */}
        <SendBadge />
        {/* end of send icon */}

        {/* sending token amount */}
        <Box mt={'1.4rem'} mb={'2rem'} className="flex-center">
          <Heading
            as="h1"
            size="xl"
            fontSize={['1.5rem', '1.5rem', '2rem', '2rem']}
          >
            {`${sendAmount.toLocaleString()} ${tokenInfo.symbol}`}
          </Heading>
        </Box>
      </Box>

      {/* estimated transaction details */}
      <PreviewDetailItem
        title="From"
        value={shrinkAddress(address as EthereumAddressType)}
      />
      <PreviewDetailItem title="To" value={shrinkAddress(sendAddress!)} />
      <PreviewDetailItem title="Network" value="Sepolia Testnet" />
      <PreviewDetailItem
        title="Network Fee"
        value={`${formatNumberByFrac(Number(gasEstimate), 7)} Sepolia ETH`}
        isLoading={isEstimationLoading}
      />

      <Box mt="1rem">
        {!hasSufficientNativeBalance && (
          <Alert status="error" mt="4px">
            <AlertIcon />
            <AlertTitle>{MSG.Error.InsufficientNativeBalance}</AlertTitle>
          </Alert>
        )}
        {isRejectedTransaction && (
          <Alert status="error" mt="4px">
            <AlertIcon />
            <AlertTitle>{MSG.Error.RejectedTransaction}</AlertTitle>
          </Alert>
        )}
      </Box>

      {/* buttons */}
      <Flex gap=".5rem" justifyContent="end" mt="2rem">
        <Button size="lg" onClick={handlePrev}>
          Prev
        </Button>
        <Button
          size="lg"
          isLoading={isConfirming}
          isDisabled={isEstimationLoading || !hasSufficientNativeBalance}
          onClick={handleConfirm}
          bg="main.accentColor"
        >
          Confirm
        </Button>
      </Flex>
    </div>
  );
};

export default PreviewStep;
