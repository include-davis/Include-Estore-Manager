'use client';
import styles from './Signup.module.scss';
import Image from 'next/image';
import includeArt from '/public/graphics/bg-abstract.svg';
import google from '/public/icons/google.svg';
import useToggle from '@hooks/useToggle';
import React, { useState } from 'react';
import { signupWithCredentials } from '@actions/Authorization';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignUpPage() {
  const router = useRouter();
  const [activeCurrent, toggleActiveCurrent] = useToggle(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const password = formData.get('enter_password');
    const confirmPassword = formData.get('confirm_password');
    const addressLine1 = formData.get('addressLine1');
    const addressLine2 = formData.get('addressLine2');
    const city = formData.get('city');
    const state = formData.get('state');
    const country = formData.get('country');
    const zip = formData.get('zip');

    // Validate that all fields are filled out
    if (
      !name ||
      !email ||
      !password ||
      !phone ||
      !confirmPassword ||
      !addressLine1 ||
      !city ||
      !country ||
      !zip
    ) {
      setErrorMessage('All fields are required.');
      return;
    }

    // Validate password match
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    const response = await signupWithCredentials({
      name: name as string,
      email: email as string,
      password: password as string,
      phone: phone as string,
      addressLine1: addressLine1 as string,
      addressLine2: (addressLine2 as string) || '', // Optional field
      city: city as string,
      state: (state as string) || '', // Optional field
      country: country as string,
      zip: parseInt(zip as string),
    });

    if (response.isError) setErrorMessage(response.message);
    else router.push('/'); // Redirect after successful sign-up
  };

  return (
    <div className={styles.page_container}>
      <div className={styles.login_container}>
        <div className={styles.header}>
          <h4>Sign Up</h4>
          <p>
            Have an account?{' '}
            <span>
              <Link href={'/login'}>Sign In</Link>
            </span>
          </p>
        </div>
        {errorMessage && <p className={styles.error_message}>{errorMessage}</p>}
        <form className={styles.form_container} onSubmit={handleSubmit}>
          <div className={styles.input_container}>
            <label>Name</label>
            <input name="name" type="text" placeholder="Full Name" />
          </div>
          <div className={styles.input_container}>
            <label>Email address</label>
            <input
              name="email"
              type="email"
              placeholder="e.g. anna@gmail.com"
            />
          </div>
          <div className={styles.input_container}>
            <label>Phone Number</label>
            <input name="phone" type="text" placeholder="(###)-###-####" />
          </div>
          <div className={styles.input_container}>
            <label>Address</label>
            <input
              name="addressLine1"
              type="text"
              placeholder="Address Line 1"
            />
            <input
              name="addressLine2"
              type="text"
              placeholder="Address Line 2 (optional)"
            />
          </div>
          <div className={styles.input_container}>
            <input name="city" type="text" placeholder="City" />
            <input name="state" type="text" placeholder="State (optional)" />
            <input name="country" type="text" placeholder="Country" />
          </div>
          <div className={styles.input_container}>
            <label>ZIP Code</label>
            <input name="zip" type="number" placeholder="ZIP Code" />
          </div>
          <div className={styles.input_container}>
            <label>Password</label>
            <div className={styles.password_container}>
              <input
                type={`${activeCurrent ? 'text' : 'password'}`}
                name="enter_password"
                placeholder="Enter your password"
              />
              <Image
                className={`${
                  activeCurrent ? styles.active_eye_icon : styles.eye_icon
                }`}
                src="/icons/eye.svg"
                alt="eye icon"
                width={24}
                height={24}
                onClick={toggleActiveCurrent}
              />
            </div>
            <div className={styles.password_container}>
              <input
                type={`${activeCurrent ? 'text' : 'password'}`}
                name="confirm_password"
                placeholder="Confirm your password"
              />
              <Image
                className={`${
                  activeCurrent ? styles.active_eye_icon : styles.eye_icon
                }`}
                src="/icons/eye.svg"
                alt="eye icon"
                width={24}
                height={24}
                onClick={toggleActiveCurrent}
              />
            </div>
          </div>
          <button type="submit" className={styles.submit}>
            Sign Up
          </button>
        </form>
        <div className={styles.google_signin}>
          <div className={styles.divider}>
            <div className={styles.line}></div>
            <p>Or sign up with</p>
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
