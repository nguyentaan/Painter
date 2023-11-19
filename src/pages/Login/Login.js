import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Login.module.scss';
import classNames from 'classnames/bind';
import { useUser } from '../../hook/UserContext';
import { loginUser } from '../../actionCreators/LoginAction';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hasEmailError, setHasEmailError] = useState(false);
  const [hasPasswordError, setHasPasswordError] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login , userInfo } = useUser();
  const navigate = useNavigate();

  const handleMailChange = (e) => {
    setEmail(e.target.value);
    setHasEmailError(false);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setHasPasswordError(false);
  };

  const validateForm = () => {
    let isValid = true;
    if (!email) {
      setHasEmailError(true);
      isValid = false;
    }
    if (!password) {
      setHasPasswordError(true);
      isValid = false;
    }
    return isValid;
  };

  const dataInputLogin = {
    email: email,
    password: password,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        login(dataInputLogin);
        console.log(userInfo);
        await loginUser( dataInputLogin , navigate); // Pass navigate here
      } catch (error) {
        console.error('Error during login:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className={cx('Desktop3')}>
      <div className={cx('Login')}>
        <div className={cx('text')}>
          <h2>LOGIN</h2>
        </div>
        <form onSubmit={handleSubmit} className={cx('form')}>
          <label htmlFor="uname">
            <b>User Name</b>
          </label>
          <input
            placeholder="Enter email"
            type="text"
            id="email"
            value={email}
            onChange={handleMailChange}
            className={cx({ error: hasEmailError })}
            required
          />
          {hasEmailError && <p className="error-message">Please enter a valid email</p>}
          <label htmlFor="psw">
            <b>Password</b>
          </label>
          <input
            placeholder="Enter password"
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className={cx({ error: hasPasswordError })}
            required
          />
          <div className={cx('regis')}>
            <p className={cx('regis')}>
              <i>
                <Link to="/register">Do not have an account?</Link>
              </i>
            </p>
          </div>
          <label className={cx('check')}>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              name="remember"
            />
            Remember me
          </label>
          <button className={cx('button')} type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
    loginUser: (data) => dispatch(loginUser(data)),
  });

export default connect(null, mapDispatchToProps)(Login);
