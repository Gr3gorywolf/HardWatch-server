import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import DeviceDetail from './Pages/DeviceDetail';
import Login from './Pages/Login';

export const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/device/:id" element={<DeviceDetail />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
