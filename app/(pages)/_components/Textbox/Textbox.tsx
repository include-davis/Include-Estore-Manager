import styles from './Textbox.module.scss';
import Image from 'next/image';
import { useState } from 'react';

interface TextboxProps {
  name: string;
  placeholder: string;
}

const Textbox: React.FC<TextboxProps> = (props) => {
  const [wordStats, setStats] = useState({
    words: 0,
    capacity: false,
  });
  function onChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const temp = e.target.value;
    const tmp = temp.split(/([\S])+/) || [];
    const newStats = {
      words: (tmp.length - 1) / 2,
      capacity: (tmp.length - 1) / 2 > 300 ? true : false,
    };
    setStats(newStats);
  }
  return (
    <div className={styles.textbox_container}>
      <div className={styles.edit_header}>
        <div className={styles.icon_group}>
          <Image src="/icons/bold.svg" alt="bold icon" width={16} height={16} />
          <Image
            src="/icons/italicize.svg"
            alt="bold icon"
            width={16}
            height={16}
          />
          <Image
            src="/icons/underline.svg"
            alt="bold icon"
            width={16}
            height={16}
          />
          <Image
            src="/icons/strikethrough.svg"
            alt="bold icon"
            width={16}
            height={16}
          />
        </div>
        <div className={styles.header_border}></div>
        <div className={styles.icon_group}>
          <Image
            src="/icons/columnleft.svg"
            alt="bold icon"
            width={16}
            height={16}
          />
          <Image
            src="/icons/columnmiddle.svg"
            alt="bold icon"
            width={16}
            height={16}
          />
          <Image
            src="/icons/columnright.svg"
            alt="bold icon"
            width={16}
            height={16}
          />
        </div>
        <div className={styles.header_border}></div>
        <div className={styles.icon_group}>
          <Image
            src="/icons/numbers.svg"
            alt="bold icon"
            width={16}
            height={16}
          />
          <Image
            src="/icons/bullets.svg"
            alt="bold icon"
            width={16}
            height={16}
          />
        </div>
        <div className={styles.header_border}></div>
      </div>
      <textarea
        onChange={onChange}
        className={styles.input_text}
        name={props.name}
        placeholder={props.placeholder}
      ></textarea>
      <p
        className={
          wordStats.capacity ? styles.wordcount_over : styles.wordcount
        }
      >
        {wordStats.words}/300
      </p>
    </div>
  );
};

export default Textbox;
