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
  const { isOpen, closeModal } = useSendTokenModalStore();

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
            <InputAmountStep />
            <PreviewStep />
            <TransactionStatusStep />
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SendTokenModal;
