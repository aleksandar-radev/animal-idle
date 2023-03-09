import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthRepo } from '../api/AuthRepo';
import './RegisterScreen.scss';

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
      navigate('/');
    } catch (error) {
      alert(error.error_description || error.message);
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
            <label htmlFor="email" className="RegisterScreen-form-label">
              Email
            </label>
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="RegisterScreen-form-input"
            />
            <label htmlFor="email" className="RegisterScreen-form-label">
              Password
            </label>
            <input
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="RegisterScreen-form-input"
            />
            <label htmlFor="email" className="RegisterScreen-form-label">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="RegisterScreen-form-input"
            />
            <button className="RegisterScreen-form-button">Register</button>
            <div className="RegisterScreen-form-message">
              Already have an account ? Sign in{' '}
              <span onClick={goToLogin} className="RegisterScreen-form-message-button">
                HERE
              </span>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
