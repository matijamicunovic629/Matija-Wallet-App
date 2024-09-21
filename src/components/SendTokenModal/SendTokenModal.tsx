import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';

const SendTokenModal = () => {
  const { isOpen, onClose } = useDisclosure();
  const modalSize = useBreakpointValue({ base: 'full', md: 'md' });
  const modalFullScreen = useBreakpointValue({ base: true, md: false });

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={modalSize} isCentered>
        <ModalOverlay />
        <ModalContent minHeight={modalFullScreen ? '100vh' : 'auto'}>
          <ModalHeader>Send Token</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{/* Your form or content goes here */}</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Send</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SendTokenModal;
