import { useEffect } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Store from './api/Store';
import './App.scss';
import Container from './screens/Container';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

function App() {
  useEffect(() => {
    function setScale() {
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
      </>,
    ),
    {
      basename: '/animal-idle',
    },
  );

  return (
    <Store>
      <RouterProvider router={router} />
    </Store>
  );
}

export default App;
