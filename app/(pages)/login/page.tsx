'use client';
import { useState } from 'react';
import styles from './page.module.scss';
import Image from 'next/image';
import includeArt from '/public/graphics/bg-abstract.svg';
import google from '/public/icons/google.svg';
import useToggle from '@hooks/useToggle';
import { loginWithCredentials } from '@actions/Authorization';

export default function LoginPage() {
  const [activeCurrent, toggleActiveCurrent] = useToggle(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [error, setError] = useState('');

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Email and password are required.');
      return;
    }
    setError('');

    try {
      await loginWithCredentials(formData.email, formData.password);
    } catch (error: any) {
      setError(`Unable to sign in: ${error.message}`);
    }
  };

  return (
    <div className={styles.page_container}>
      <div className={styles.login_container}>
        <div className={styles.header}>
          <h4>Sign In</h4>
          <p>
            Don't have an account? <span>Sign Up</span>
          </p>
        </div>
        <form className={styles.form_container} onSubmit={handleSubmit}>
          <div className={styles.input_container}>
            <label>Email address</label>
            <input
              name="email"
              type="email"
              placeholder="e.g. anna@gmail.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.input_container}>
            <label>Password</label>
            <div className={styles.password_container}>
              <input
                type={activeCurrent ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <Image
                className={
                  activeCurrent ? styles.active_eye_icon : styles.eye_icon
                }
                src="/icons/eye.svg"
                alt="eye icon"
                width={24}
                height={24}
                onClick={toggleActiveCurrent}
              />
            </div>
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.toggle_container}>
            <input
              name="rememberMe"
              type="checkbox"
              checked={formData.rememberMe}
              onChange={handleChange}
            />
            <p>Keep me signed in</p>
          </div>
          <button type="submit" className={styles.submit}>
            Sign In
          </button>
        </form>
        <div className={styles.google_signin}>
          <div className={styles.divider}>
            <div className={styles.line}></div>
            <p>Or sign in with</p>
            <div className={styles.line}></div>
          </div>
          <button className={styles.google_button}>
            <Image src={google} alt="google icon" />
            <p>Google</p>
          </button>
        </div>
      </div>
      <div className={styles.image_container}>
        <Image src={includeArt} alt="abstract art of include logo" />
      </div>
    </div>
  );
}
