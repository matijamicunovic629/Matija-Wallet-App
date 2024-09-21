import { Box } from '@chakra-ui/react';
import { MdError } from 'react-icons/md';

const successBadge = () => {
  return (
    <Box className="flex-center">
      <Box
        backgroundColor="main.failedBgColor"
        color="main.failedColor"
        borderRadius="100%"
        p="1.5rem"
        fontSize="2rem"
      >
        <MdError />
      </Box>
    </Box>
  );
};

export default successBadge;
