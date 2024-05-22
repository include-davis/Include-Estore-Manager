import styles from './page.module.scss';
import Image from 'next/image';
import includeArt from '/public/graphics/bg-abstract.svg';
import google from '/public/icons/google.svg';

export default function LoginPage() {
  return (
    <div className={styles.page_container}>
      <div className={styles.login_container}>
        <div className={styles.header}>
          <h4>Sign In</h4>
          <p>
            Don't have an account? <span>Sign Up</span>
          </p>
        </div>
        <form className={styles.form_container}>
          <div className={styles.input_container}>
            <label>Email address</label>
            <input name="email" type="text" placeholder="e.g. anna@gmail.com" />
          </div>
          <div className={styles.input_container}>
            <label>Password</label>
            <input
              name="password"
              type="text"
              placeholder="Enter your password"
            />
          </div>
          <div className={styles.toggle_container}>
            <input name="check" type="checkbox" />
            <p>Keep me signed in</p>
          </div>
          <button className={styles.submit}>Sign In</button>
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
