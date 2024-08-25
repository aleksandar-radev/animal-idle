import { useEffect } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Container from './ui/common/Container';
import LoginScreen from './ui/common/LoginScreen';
import RegisterScreen from './ui/common/RegisterScreen';

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
      basename: '/animal-idle',
    },
  );

  return <RouterProvider router={router} />;
}

export default App;
