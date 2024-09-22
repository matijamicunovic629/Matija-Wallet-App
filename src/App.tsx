import { ChakraProvider, DarkMode } from '@chakra-ui/react';
import { chakraTheme } from './styles/chakraTheme.ts';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login';
import UserLayout from './layouts/UserLayout';
import HomePage from './pages/home';
import ProtectedRoute from './components/ProtectedRoute';
import WalletProvider from './providers/WalletProvider.tsx';
import './styles/global.scss';

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider theme={chakraTheme}>
        <DarkMode>
          <WalletProvider>
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
          </WalletProvider>
        </DarkMode>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
