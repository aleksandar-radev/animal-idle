import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Container from './ui/common/Container';
import LoginScreen from './ui/common/LoginScreen';
import RegisterScreen from './ui/common/RegisterScreen';
import './App.scss';

// Get the base path from environment variables or default to '/'
const basePath = import.meta.env.VITE_BASE_PATH || '/';
console.log('basePath', basePath);

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Container />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="*" element={<Container />} />
      </>,
    ),
    {
      basename: basePath, // Use the environment variable here
      future: {
        v7_relativeSplatPath: true,
      },
    },
  );

  return (
    <RouterProvider
      router={router}
      future={{
        v7_startTransition: true,
      }}
    />
  );
}

export default App;
