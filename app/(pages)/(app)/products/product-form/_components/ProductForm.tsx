'use client';
import styles from './ProductForm.module.scss';
import Image from 'next/image';
import { useState } from 'react';
import Textbox from '@components/Textbox/Textbox';
import { FormEvent } from 'react';

export default function ProductForm() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form submitted');
  };
  const [tags, setTags] = useState<string[]>([]);
  const addTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const input = event.target as HTMLInputElement;
    const newTag = input.value;
    if (newTag !== '') {
      setTags((prevTags) => [...prevTags, newTag]);
    }
    input.value = '';
  };
  const deleteTag = (index: number) => {
    setTags((prevTags) => [
      ...prevTags.slice(0, index),
      ...prevTags.slice(index + 1),
    ]);
  };
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.img_container}>
          <Image
            src="/icons/cloud_upload.svg"
            alt="upload icon"
            width={34}
            height={34}
          />
          <p>Drag and Drop here</p>
          <p>or</p>
          <button className={styles.purple_button}>Select File</button>
        </div>
        <div className={styles.inputs_container}>
          <div className={styles.input_container}>
            <p>Product Name</p>
            <input type="text" name="product_name" placeholder="iWatch" />
          </div>
          <div className={styles.input_container}>
            <p>Price</p>
            <div className={styles.column_container}>
              <input type="text" name="product_price" placeholder="$$" />
              <div className={styles.toggle_container}>
                <p>List Product</p>
                <input
                  className={styles.toggle}
                  type="checkbox"
                  name="list_toggle"
                />
              </div>
            </div>
          </div>
          <h4>Details</h4>
          <div className={styles.input_container}>
            <p>Tags</p>
            <input
              onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                if (event.key === 'Enter') {
                  addTag(event);
                }
              }}
              id="tags_search"
              type="text"
              placeholder="Watch.."
            />
            <div className={styles.selected_tags}>
              {tags.map((tag, index) => (
                <p key={index} className={styles.tag_display}>
                  {tag} <span onClick={() => deleteTag(index)}>x</span>
                </p>
              ))}
            </div>
          </div>
          <div className={styles.input_container}>
            <p>Product Description</p>
            <Textbox />
          </div>
          <div className={styles.input_container}>
            <p>Product Details</p>
            <Textbox />
          </div>
        </div>
        <div className={styles.button_container}>
          <input className={styles.white_button} type="reset" value="Cancel" />
          <input className={styles.purple_button} type="submit" value="Save" />
        </div>
      </form>
    </div>
  );
}
