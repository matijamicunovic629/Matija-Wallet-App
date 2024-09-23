import { Text, Box, Button, Heading } from '@chakra-ui/react';
import FailedBadge from '../StatusBadges/failedBadge.tsx';
import SuccessBadge from '../StatusBadges/successBadge.tsx';
import {
  defaultExplorerUrl,
  DELAYED_API_CALL_TIME,
  MSG,
} from '../../constants';
import useSendTokenModalStore from '../../store/useSendTokenModalStore.ts';
import { shrinkAddress } from '../../utils';
import useWalletBalances from '../../hooks/useWalletBalances.ts';
import { useAccount } from 'wagmi';
import useWalletTransactions from '../../hooks/useWalletTransactions.ts';
import { useEffect } from 'react';

const TransactionStatusStep = () => {
  const { address } = useAccount();
  const { refetch: refetchWalletBalances } = useWalletBalances(address);
  const { refetch: refetchWalletTransactions } = useWalletTransactions(address);

  const {
    closeModal,
    transactionHash,
    isSuccess,
    tokenInfo,
    sendAddress,
    sendAmount,
  } = useSendTokenModalStore();

  useEffect(() => {
    if (isSuccess) {
      // refresh all wallet balances and transactions
      refetchWalletBalances();
      setTimeout(() => refetchWalletTransactions(), DELAYED_API_CALL_TIME);
    }
  }, []);

  const handleOk = () => {
    closeModal();
  };

  const onClickViewTransaction = () => {
    window.open(`${defaultExplorerUrl}tx/${transactionHash}`, '_blank');
  };

  const statusMessage = isSuccess
    ? MSG.TransactionStatus.success
    : MSG.TransactionStatus.failed;

  return (
    <div>
      <Box>
        {/* begin of send icon */}
        {isSuccess ? <SuccessBadge /> : <FailedBadge />}

        {/* end of send icon */}

        {/* sending token amount */}
        <Box mt={'2rem'} className="flex-center">
          <Heading
            as="h1"
            size="xl"
            fontSize={['1.5rem', '1.5rem', '2rem', '2rem']}
          >
            {statusMessage}
          </Heading>
        </Box>
        {isSuccess && (
          <Box mt={'1rem'} mb={'4rem'}>
            <Heading
              as="h1"
              size="md"
              className="flex-center"
              color="main.secondaryColor"
            >
              you sent to {shrinkAddress(sendAddress as string)}
            </Heading>
            <Text
              className="flex-center"
              color="main.accentColor"
              fontSize={'2rem'}
              fontWeight="bold"
            >
              {`${sendAmount.toLocaleString()} ${tokenInfo.symbol}`}
            </Text>
          </Box>
        )}
      </Box>

      {/* buttons */}
      <Box gap=".5rem" mt="2rem">
        <Button w="100%" borderRadius="1rem" onClick={handleOk}>
          Ok
        </Button>
        <Button
          w="100%"
          borderRadius="1rem"
          mt=".5rem"
          onClick={onClickViewTransaction}
        >
          View Transaction
        </Button>
      </Box>
    </div>
  );
};

export default TransactionStatusStep;
