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
    <div>
      <ConnectButton />
      {isConnected ? 'true' : 'false'}
    </div>
  );
};

export default LoginPage;
