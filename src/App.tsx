import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthPage } from './pages/Auth';
import { NotFoundPage } from './pages/NotFound';
import { DashboardPage } from './pages/Dashboard';
import { Container } from '@chakra-ui/react';

function App() {
  return (
    <BrowserRouter>
      <Container maxW={'container.lg'} mt={'2rem'}>
        <Routes>
          {/* User dashboard */}
          <Route path='/' element={<DashboardPage />} />

          {/* Auth - User login and registration */}
          <Route path='/auth' element={<AuthPage />} />

          {/* NotFound - Fallback page */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
