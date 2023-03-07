import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthRepo } from '../api/AuthRepo';
import './LoginScreen.scss';

export default function RegisterScreen() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { error } = await AuthRepo.signUp(email, password);
      if (error) throw error;
      alert('Check your email for the login link!');
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const login = () => {
    navigate('/login');
  };

  return (
    <>
      {loading ? (
        'Creating an account...'
      ) : (
        <>
          <form onSubmit={handleSignUp}>
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
              Register
            </button>
            Already have an account ? Sign in <button onClick={login}>HERE</button>
          </form>
        </>
      )}
    </>
  );
}
