'use client';
import styles from './ProductForm.module.scss';
import Image from 'next/image';
import React, { useState } from 'react';

export default function DetailsPage() {
  const [formData] = useState({
    title: '',
    description: '',
  });
  return (
    <div className={styles.subpage_container}>
      <div className={styles.inputs_container}>
        {/* Title - Shows input from About
                Description - Shows input from About
                Pricing - Text box, Processing Time - Text box
                Item Weight (Prepared for Packing) - 2 Text boxes (one for lbs, one for oz)
                Length - Text box, Width - Text box, Height - Text box */}
        <div className={styles.input_container}>
          <p>
            <strong>{formData.title}</strong>
          </p>
          <p>{formData.description}</p>
        </div>
        <div className={styles.img_container}>
          <Image
            src="/icons/cloud_upload.svg"
            alt="upload icon"
            width={34}
            height={34}
          />
        </div>
        <div className={styles.inputs_container}>
          <div className={styles.row_container}>
            <div className={styles.column_container}>
              <p>Pricing</p>
              <input type="text" name="pricing" />
            </div>
            <div className={styles.column_container}>
              <p>Processing Time</p>
              <input type="text" name="processing_time" />
            </div>
          </div>
        </div>
        <div className={styles.inputs_container}>
          <div className={styles.row_container}>
            <div className={styles.column_container}>
              <p>Item Weight (Prepared for Packing)</p>
              <input type="text" name="pounds" />
            </div>
            <div className={styles.column_container}>
              <p></p>
              <p></p>
              <p></p>
              <input type="text" name="ounces" />
            </div>
          </div>
        </div>
        <div className={styles.inputs_container}>
          <div className={styles.special_row_container}>
            <div className={styles.column_container}>
              <p>Length</p>
              <input type="text" name="processing_time" />
            </div>
            <div className={styles.column_container}>
              <p>Width</p>
              <input type="text" name="processing_time" />
            </div>
            <div className={styles.column_container}>
              <p>Height</p>
              <input type="text" name="processing_time" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
