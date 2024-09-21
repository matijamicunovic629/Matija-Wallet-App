import { Box } from '@chakra-ui/react';
import { FaCheck } from 'react-icons/fa';

const successBadge = () => {
  return (
    <Box className="flex-center">
      <Box
        backgroundColor="main.successBgColor"
        color="main.successColor"
        borderRadius="100%"
        p="1.5rem"
        fontSize="2rem"
      >
        <FaCheck />
      </Box>
    </Box>
  );
};

export default successBadge;
