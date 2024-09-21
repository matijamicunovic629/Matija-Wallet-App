import { Text, Box, Button, Heading } from '@chakra-ui/react';
import FailedBadge from '../StatusBadges/failedBadge.tsx';
import SuccessBadge from '../StatusBadges/successBadge.tsx';
import { MSG } from '../../constants';

const TransactionStatusStep = () => {
  const isSuccess = true;
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
              you sent to 0x323..asd
            </Heading>
            <Text
              className="flex-center"
              color="main.accentColor"
              fontSize={'2rem'}
              fontWeight="bold"
            >
              123 MTJ
            </Text>
          </Box>
        )}
      </Box>

      {/* buttons */}
      <Box gap=".5rem" mt="2rem">
        <Button w="100%" borderRadius="1rem">
          Ok
        </Button>
        <Button w="100%" borderRadius="1rem" mt=".5rem">
          View Transaction
        </Button>
      </Box>
    </div>
  );
};

export default TransactionStatusStep;
