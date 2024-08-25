import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterScreen.scss';
import useAuthRepo from '@/hooks/useAuthRepo';

export default function RegisterScreen() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const authRepo = useAuthRepo();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }
      await authRepo.signUp(email, password);

      navigate('/');
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <>
      {loading ? (
        'Creating an account...'
      ) : (
        <div className="RegisterScreen">
          <form onSubmit={handleSignUp} className="form">
            <div className="form-title">Register</div>
            <label className="form-label">Email</label>
            <input
              type="email"
              placeholder="Your email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
            />
            <label className="form-label">Password</label>
            <input
              type="password"
              placeholder="Your password"
              value={password}
              pattern={'.{6,}'}
              title="Must contain at least 6 characters"
              required
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
            />
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-input"
            />
            {errorMessage && <span className="form-error">{errorMessage}</span>}
            <button className="form-button">Register</button>
          </form>
          <div className="message">
            Already have an account ? Sign in{' '}
            <span onClick={goToLogin} className="message-button">
              HERE
            </span>
          </div>
        </div>
      )}
    </>
  );
}
