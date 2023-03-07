import { useState } from 'react';
import { AuthRepo } from '../api/AuthRepo';
import './LoginScreen.scss';
import { useNavigate } from 'react-router-dom';

export default function LoginScreen() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { error } = await AuthRepo.signInWithPassword(email, password);
      if (error) throw new Error(error);
      navigate('/');
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const register = () => {
    navigate('/register');
  };

  return (
    <>
      {loading ? (
        'Logging in...'
      ) : (
        <>
          <form onSubmit={handleLogin}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="button block" aria-live="polite">
              Log in
            </button>
            Don&apos;t have an account ? Sign up <button onClick={register}>HERE</button>
          </form>
        </>
      )}
    </>
  );
}
