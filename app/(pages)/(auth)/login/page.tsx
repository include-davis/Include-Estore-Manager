'use client';

import styles from './page.module.scss';
import Image from 'next/image';
import includeArt from '/public/graphics/bg-abstract.svg';
import google from '/public/icons/google.svg';
import useToggle from '@hooks/useToggle';

import { useState } from 'react';
import { loginWithCredentials } from '@actions/Authorization';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();

  const [activeCurrent, toggleActiveCurrent] = useToggle(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('current_password');

    if (!email || !password) {
      setErrorMessage('Both fields are required.');
      return;
    }

    const response = await loginWithCredentials(
      email as string,
      password as string
    );

    if (response.isError) setErrorMessage(response.message);
    else router.push('/');
  };

  return (
    <div className={styles.page_container}>
      <div className={styles.login_container}>
        <div className={styles.header}>
          <h4>Sign In</h4>
          <p>
            Don't have an account?{' '}
            <span>
              <Link href={'/signup'}>Sign Up</Link>
            </span>
          </p>
        </div>
        {errorMessage && <p className={styles.error_message}>{errorMessage}</p>}
        <form className={styles.form_container} onSubmit={handleSubmit}>
          <div className={styles.input_container}>
            <label>Email address</label>
            <input name="email" type="text" placeholder="e.g. anna@gmail.com" />
          </div>
          <div className={styles.input_container}>
            <label>Password</label>
            <div className={styles.password_container}>
              <input
                type={activeCurrent ? 'text' : 'password'}
                name="current_password"
                placeholder="Password"
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
          <div className={styles.toggle_container}>
            <input name="check" type="checkbox" />
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
