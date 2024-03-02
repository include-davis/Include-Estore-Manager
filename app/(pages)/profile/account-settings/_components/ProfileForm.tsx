'use client';
import styles from './ProfileForm.module.scss';
import Image from 'next/image';
import useToggle from '@hooks/useToggle';
import { FormEvent } from 'react';

export default function ProfileForm() {
  const [activeCurrent, toggleActiveCurrent] = useToggle(false);
  const [activeNew, toggleActiveNew] = useToggle(false);
  const [activeConfirm, toggleActiveConfirm] = useToggle(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    console.log(formData);

    if (formData.get('new_password') != formData.get('confirm_password')) {
      console.log('the passwords are not the same');
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.center_wrapper}>
        <div className={styles.img_container}>
          <div className={styles.img}>
            <Image
              src="/profile/example_profile_picture.png"
              alt="example profile picture"
              fill
            />
            <p className={styles.text_overlay}>
              <Image
                src="/icons/upload_simple.svg"
                alt="upload icon"
                width={16}
                height={16}
              />
              Upload Photo
            </p>
          </div>
          <p>Image size should be under 1MB</p>
        </div>
      </div>
      <form onSubmit={onSubmit}>
        <div className={styles.inputs_container}>
          <div className={styles.input_container}>
            <p>Full Name</p>
            <div className={styles.name}>
              <input type="text" name="first_name" placeholder="First name" />
              <input type="text" name="last_name" placeholder="Last name" />
            </div>
          </div>
          <div className={styles.input_container}>
            <p>Email</p>
            <input type="email" name="email" placeholder="Email" />
          </div>
          <h4>Change Password</h4>
          <div className={styles.input_container}>
            <p>Current Password</p>
            <div className={styles.pswd_input}>
              <input
                type={`${activeCurrent ? 'text' : 'password'}`}
                name="current_password"
                placeholder="Password"
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
          <div className={styles.input_container}>
            <p>New Password</p>
            <div className={styles.pswd_input}>
              <input
                type={`${activeNew ? 'text' : 'password'}`}
                name="new_password"
                placeholder="Password"
              />
              <Image
                className={`${
                  activeNew ? styles.active_eye_icon : styles.eye_icon
                }`}
                src="/icons/eye.svg"
                alt="eye icon"
                width={24}
                height={24}
                onClick={toggleActiveNew}
              />
            </div>
          </div>
          <div className={styles.input_container}>
            <p>Confirm Password</p>
            <div className={styles.pswd_input}>
              <input
                type={`${activeConfirm ? 'text' : 'password'}`}
                name="confirm_password"
                placeholder="Password"
              />
              <Image
                className={`${
                  activeConfirm ? styles.active_eye_icon : styles.eye_icon
                }`}
                src="/icons/eye.svg"
                alt="eye icon"
                width={24}
                height={24}
                onClick={toggleActiveConfirm}
              />
            </div>
          </div>
        </div>
        <div className={styles.button_container}>
          <input className={styles.cancel} type="reset" value="Cancel" />
          <input className={styles.save} type="submit" value="Save" />
        </div>
      </form>
    </div>
  );
}
