import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './styles/theme';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login';
import UserLayout from './layouts/UserLayout';
import HomePage from './pages/home';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext.tsx';

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <UserLayout>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/home"
                element={<ProtectedRoute element={<HomePage />} />}
              />
              <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
          </UserLayout>
        </AuthProvider>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
