import { useEffect } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Container from './ui/common/Container';
import LoginScreen from './ui/common/LoginScreen';
import RegisterScreen from './ui/common/RegisterScreen';
import './App.scss';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#E3D026',
      light: '#E9DB5D',
      dark: '#A29415',
      contrastText: '#242105',
    },
  },
});

// Get the base path from environment variables or default to '/'
const basePath = import.meta.env.VITE_BASE_PATH || '/';

function App() {
  useEffect(() => {
    function setScale() {
      // let aspectRatio = window.innerWidth / window.innerHeight;
      document.documentElement.style.setProperty('--pixelWidth', `${window.innerWidth - 50}px`);
    }
    window.addEventListener('resize', setScale);
    setScale();
  }, []);

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
