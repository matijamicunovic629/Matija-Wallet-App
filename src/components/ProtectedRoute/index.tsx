import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    element: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <>{element}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;