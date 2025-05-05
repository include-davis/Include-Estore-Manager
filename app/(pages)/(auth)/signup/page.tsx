'use client';
import styles from './page.module.scss';
import Image from 'next/image';
import includeArt from '/public/graphics/bg-abstract.svg';
import google from '/public/icons/google.svg';
import useToggle from '@hooks/useToggle';

export default function LoginPage() {
  const [activeCurrent, toggleActiveCurrent] = useToggle(false);
  return (
    <div className={styles.page_container}>
      <div className={styles.login_container}>
        <div className={styles.header}>
          <h4>Sign Up</h4>
          <p>
            Have an account? <span>Sign In</span>
          </p>
        </div>
        <form className={styles.form_container}>
          <div className={styles.input_container}>
            <label>Name</label>
            <input name="first" type="text" placeholder="First Name" />
            <input name="last" type="text" placeholder="Last Name" />
          </div>
          <div className={styles.input_container}>
            <label>Email address</label>
            <input name="email" type="text" placeholder="e.g. anna@gmail.com" />
          </div>
          <div className={styles.input_container}>
            <label>Phone Number</label>
            <input name="phone" type="text" placeholder="(###)-###-####" />
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
          <button className={styles.submit}>Sign In</button>
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
