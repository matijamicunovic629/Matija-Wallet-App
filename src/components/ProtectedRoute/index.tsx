import { Navigate } from 'react-router-dom';
import { useAccount } from 'wagmi';

interface ProtectedRouteProps {
  element: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { isConnected } = useAccount();
  return isConnected ? <>{element}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;
