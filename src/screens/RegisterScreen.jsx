import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthRepo } from '../api/AuthRepo';
import { passwordRegex } from '../constants/jsVariables.js';
import './RegisterScreen.scss';

export default function RegisterScreen() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }
      await AuthRepo.signUp(email, password);

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
          <form onSubmit={handleSignUp} className="RegisterScreen-form">
            <div className="RegisterScreen-form-title">Register</div>
            <label className="RegisterScreen-form-label">Email</label>
            <input
              type="email"
              placeholder="Your email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="RegisterScreen-form-input"
            />
            <label className="RegisterScreen-form-label">Password</label>
            <input
              type="password"
              placeholder="Your password"
              value={password}
              pattern={passwordRegex}
              title="Must contain at least 6 characters"
              required
              onChange={(e) => setPassword(e.target.value)}
              className="RegisterScreen-form-input"
            />
            <label className="RegisterScreen-form-label">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="RegisterScreen-form-input"
            />
            {errorMessage && <span className="RegisterScreen-form-error">{errorMessage}</span>}
            <button className="RegisterScreen-form-button">Register</button>
          </form>
          <div className="RegisterScreen-message">
            Already have an account ? Sign in{' '}
            <span onClick={goToLogin} className="RegisterScreen-message-button">
              HERE
            </span>
          </div>
        </div>
      )}
    </>
  );
}
