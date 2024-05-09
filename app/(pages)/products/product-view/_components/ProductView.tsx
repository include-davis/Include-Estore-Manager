'use client';
import styles from './ProductView.module.scss';
import Image from 'next/image';
import { useState } from 'react';

export default function ProductView() {
  const fakeItem = {
    name: 'Mens Long Sleeve T-Shirt Cotton Base Layer Slim Muscle',
    listed: false,
    price: 20.0,
    tags: ['Clothing', 'Men'],
    description:
      'Made from ultra-soft jersey cotton, it gets softer with every wash. Durable double stitching and ribbed crewneck maintains its shape wash after wash.',
    details:
      'Made from ultra-soft jersey cotton, it gets softer with every wash. Durable double stitching and ribbed crewneck maintains its shape wash after wash.',
  };

  const [currentImage, setCurrentImage] = useState(1);

  function addCurrentImage() {
    if (currentImage === displayImages.length) {
      setCurrentImage(1);
    } else {
      setCurrentImage(currentImage + 1);
    }
  }

  function subCurrentImage() {
    if (currentImage === 1) {
      setCurrentImage(displayImages.length);
    } else {
      setCurrentImage(currentImage - 1);
    }
  }

  const displayImages = [
    '/sample-product/shirt1.png',
    '/sample-product/shirt2.png',
    '/sample-product/shirt3.png',
    '/sample-product/shirt4.png',
    '/sample-product/shirt5.png',
    '/sample-product/shirt6.png',
  ];

  return (
    <div className={styles.container}>
      <div className={styles.main_content}>
        <div className={styles.item_images}>
          <div className={styles.current_item}>
            <Image
              src={displayImages[currentImage - 1]}
              alt="image one of shirt"
              fill={true}
            />
          </div>
          <div className={styles.gallery}>
            {displayImages.map((image, index) => (
              <li
                key={index}
                className={`${
                  currentImage === index + 1
                    ? styles.highlight_gallery
                    : styles.gallery_image
                }`}
              >
                <Image src={image} alt="image gallery display" fill={true} />
              </li>
            ))}
          </div>
        </div>
        <div className={styles.item_info}>
          <div className={styles.info_group}>
            <div className={styles.item_status}>
              <Image
                src={`${
                  fakeItem.listed
                    ? '/icons/check_circle_fill.svg'
                    : '/icons/close_circle_fill.svg'
                }`}
                alt="icon if listed"
                width={24}
                height={24}
              />
              <p>{fakeItem.listed ? 'Listed' : 'Not Listed'}</p>
            </div>
            <p className={styles.item_title}>{fakeItem.name}</p>
            <h4>${fakeItem.price}</h4>
          </div>
          <div className={styles.info_group}>
            <div className={styles.row_container}>
              <p className={styles.info_label}>Tags:</p>
              <div className={styles.tags_container}>
                {fakeItem.tags.map((tag, index) => (
                  <p key={index} className={styles.tag}>
                    {tag}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.info_group}>
            <div className={styles.row_container}>
              <p className={styles.info_label}>Description:</p>
              <p>{fakeItem.description}</p>
            </div>
            <div className={styles.row_container}>
              <p className={styles.info_label}>Details:</p>
              <p>{fakeItem.details}</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.slider}>
        <button onClick={subCurrentImage}>
          <Image
            src="/icons/chevron-left.svg"
            alt="pointer left"
            width={24}
            height={24}
          />
        </button>
        {displayImages.map((image, index) => (
          <div
            className={`${
              currentImage === index + 1
                ? styles.highlight_dot
                : styles.slider_dot
            }`}
            key={index}
          ></div>
        ))}
        <button onClick={addCurrentImage}>
          <Image
            src="/icons/chevron-right.svg"
            alt="pointer left"
            width={24}
            height={24}
          />
        </button>
      </div>
    </div>
  );
}
