import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useBreakpointValue,
} from '@chakra-ui/react';
import useSendTokenModalStore from '../../store/useSendTokenModalStore.ts';
import TransactionStatusStep from './TransactionStatusStep.tsx';
import InputAmountStep from './InputAmountStep.tsx';
import PreviewStep from './PreviewStep.tsx';

const SendTokenModal = () => {
  // const { isOpen, onClose } = useDisclosure();
  const { stepIndex, isOpen, closeModal } = useSendTokenModalStore();

  const modalSize = useBreakpointValue({ base: 'full', md: 'md' });
  const modalFullScreen = useBreakpointValue({ base: true, md: false });

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => closeModal()}
        size={modalSize}
        isCentered
      >
        <ModalOverlay />
        <ModalContent minHeight={modalFullScreen ? '100vh' : 'auto'}>
          <ModalHeader>Send Token</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {stepIndex === 0 && <InputAmountStep />}
            {stepIndex === 1 && <PreviewStep />}
            {stepIndex === 2 && <TransactionStatusStep />}
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SendTokenModal;
