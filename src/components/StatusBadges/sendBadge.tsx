import { Box } from '@chakra-ui/react';
import { IoSend } from 'react-icons/io5';

const successBadge = () => {
  return (
    <Box className="flex-center">
      <Box
        backgroundColor="main.accentBgColor"
        color="main.accentColor"
        borderRadius="100%"
        p="1.5rem"
        fontSize="2rem"
      >
        <IoSend />
      </Box>
    </Box>
  );
};

export default successBadge;
