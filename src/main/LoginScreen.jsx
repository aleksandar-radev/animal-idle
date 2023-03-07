import { useContext, useState } from 'react';
import { AuthRepo } from '../api/AuthRepo';
import { Context } from '../api/Store';
import './LoginScreen.scss';

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [semail, setSemail] = useState('');
  const [spassword, setSpassword] = useState('');
  const [store, setStore] = useContext(Context);

  const isRegister = store.isRegister;

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { error } = AuthRepo.signInWithPassword(email, password);
      console.log(error);
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { error } = await AuthRepo.signUp(semail, spassword);
      if (error) throw error;
      alert('Check your email for the login link!');
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        'Sending magic link...'
      ) : (
        <>
          <form onSubmit={handleLogin}>
            Login ::
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
          </form>
          <form onSubmit={handleSignUp}>
            Register ::
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Your email"
              value={semail}
              onChange={(e) => setSemail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Your password"
              value={spassword}
              onChange={(e) => setSpassword(e.target.value)}
            />
            <button className="button block" aria-live="polite">
              Log in
            </button>
          </form>
        </>
      )}
    </>
  );
}
