import './App.scss';
import Store from './api/Store';
import { useEffect } from 'react';
import Container from './main/Container';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import LoginScreen from './main/LoginScreen';
import RegisterScreen from './main/RegisterScreen';

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
  );

  return (
    <Store>
      <RouterProvider router={router} />
    </Store>
  );
}

export default App;
