import styles from './ProductMedia.module.scss';
import upload from '/public/icons/upload_complex.svg';
import Image from 'next/image';
import xdelete from '/public/icons/delete.svg';

export default function ProductMedia() {
  const pastImages = [
    '/sample-product/bear.png',
    '/sample-product/cap.png',
    '/sample-product/hydro.png',
    '/sample-product/plant.png',
    '/sample-product/puffer.png',
    '/sample-product/sneaker.png',
  ];

  return (
    <div className={styles.container}>
      <div className={styles.add_images}>
        <h4>Add Images</h4>
        <div className={styles.upload_container}>
          <div className={styles.upload_image}>
            <Image src={upload} alt="upload icon" />
          </div>
          <p>
            <span>Click here</span> to upload or drop media here
          </p>
        </div>
      </div>
      <div className={styles.past_media}>
        <h4>Past Media</h4>
        <div className={styles.past_media_container}>
          {pastImages.map((src, index) => (
            <div key={index} className={styles.single_media}>
              <Image
                src={src}
                alt="image from past media"
                fill
                unoptimized
                objectFit="cover"
              />
              <div className={styles.delete}>
                <Image src={xdelete} alt="delete icon" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.buttons}>
        <button className={styles.cancel}>Cancel</button>
        <button className={styles.save}>Save</button>
      </div>
    </div>
  );
}
