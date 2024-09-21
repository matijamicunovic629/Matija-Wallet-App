import { Box, Heading, Link } from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { isConnected } = useAccount();
  const navigate = useNavigate();

  useEffect(() => {
    if (isConnected) {
      navigate('/home');
    }
  }, [isConnected, navigate]);

  return (
    <div className="login-page-container">
      <Box w="100%">
        <Heading
          as="h1"
          mb={['1rem', '2rem', '2rem', '2rem']}
          color="white"
          fontSize={['2rem', '2rem', '3rem', '4rem']}
          textAlign="center"
          p="1rem 2rem"
        >
          Welcome to &nbsp;
          <Link
            href="https://github.com/matijamicunovic629"
            isExternal
            color="teal.500"
          >
            Matija Wallet
          </Link>
        </Heading>
        <div className="connect-button-wrapper">
          <ConnectButton />
        </div>
      </Box>
    </div>
  );
};

export default LoginPage;
