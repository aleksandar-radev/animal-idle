import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginScreen.scss';
import useAuthRepo from '@/hooks/general/useAuthRepo';

export default function LoginScreen() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const authRepo = useAuthRepo();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await authRepo.login(email, password);
      navigate('/');
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <>
      {loading ? (
        'Logging in...'
      ) : (
        <div className="LoginScreen">
          <form onSubmit={handleLogin} className="LoginScreen-form">
            <div className="LoginScreen-form-title">Login</div>
            <label className="LoginScreen-form-label">Email</label>
            <input
              type="email"
              placeholder="Your email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="LoginScreen-form-input"
            />
            <label className="LoginScreen-form-label">Password</label>
            <input
              type="password"
              placeholder="Your password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="LoginScreen-form-input"
            />
            {errorMessage && <span className="LoginScreen-form-error">{errorMessage}</span>}
            <button className="LoginScreen-form-button" type="submit">
              Log in
            </button>
          </form>
          <div className="LoginScreen-message">
            Don&apos;t have an account ? Sign up{' '}
            <span onClick={goToRegister} className="LoginScreen-message-button">
              HERE
            </span>
          </div>
        </div>
      )}
    </>
  );
}
