import { Box, Button, Flex, Heading, SimpleGrid } from '@chakra-ui/react';
import SendBadge from '../StatusBadges/sendBadge.tsx';
import useSendTokenModalStore from '../../store/useSendTokenModalStore.ts';

interface PreviewDetailItemProps {
  title: string;
  value: string;
}

const PreviewDetailItem = ({ title, value }: PreviewDetailItemProps) => {
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
      <Box textAlign="right">{value}</Box>
    </SimpleGrid>
  );
};

const PreviewStep = () => {
  const { prevStep, nextStep } = useSendTokenModalStore();

  const handlePrev = () => {
    prevStep();
  };

  const handleConfirm = () => {
    nextStep();
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
            333.2 MTJ
          </Heading>
        </Box>
      </Box>

      {/* estimated transaction details */}
      <PreviewDetailItem title="From" value="0xads...2323" />
      <PreviewDetailItem title="To" value="0xads...2323" />
      <PreviewDetailItem title="Network" value="Sepolia Testnet" />
      <PreviewDetailItem title="Network Fee" value="0.00013ETH" />

      {/* buttons */}
      <Flex gap=".5rem" justifyContent="end" mt="2rem">
        <Button size="lg" disabled={true} onClick={handlePrev}>
          Prev
        </Button>
        <Button size="lg" disabled={true} onClick={handleConfirm}>
          Confirm
        </Button>
      </Flex>
    </div>
  );
};

export default PreviewStep;
