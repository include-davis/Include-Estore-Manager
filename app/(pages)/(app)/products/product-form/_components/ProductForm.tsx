'use client';
import styles from './ProductForm.module.scss';
import Image from 'next/image';
import React, { useState } from 'react';
import Textbox from '@components/Textbox/Textbox';
import { FormEvent } from 'react';

const ItemsBar = ({
  items,
  activeIndex,
  onTabChange,
}: {
  items: string[];
  activeIndex: number;
  onTabChange: (index: number) => void;
}) => {
  return (
    <nav className={styles.navbar}>
      {items.map((item, index) => (
        <div
          key={index}
          className={`${styles.navItem} ${
            activeIndex === index ? styles.active : ''
          }`}
          onClick={() => onTabChange(index)}
        >
          {item}
        </div>
      ))}
      <div
        className={styles.activeIndicator}
        style={{ transform: `translateX(${activeIndex * 100}%)` }}
      />
    </nav>
  );
};

export default function ProductForm() {
  const [activeTab, setActiveTab] = useState(0);
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
  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <div>
            <h4>About the Product</h4>
            <p> details </p>
          </div>
        );
      case 1:
        return (
          <div>
            <h4>Details</h4>
            <p> details</p>
          </div>
        );
      case 2:
        return (
          <div>
            <h4>Shipping Information</h4>
            <p> placeholder </p>
          </div>
        );
      case 3:
        return (
          <div>
            <h4>Carriers Information</h4>
            <p> placeholder </p>
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
          <h3>Listing</h3>
        </div>
        <div className={styles.button_container}>
          <button className={styles.delete_button}>Delete</button>
        </div>
      </div>
      {/* Content of Product Form */}
      <div className={styles.listing}>
        {/* Navigation Bar == Items bar*/}
        <ItemsBar
          items={['About', 'Details', 'Shipping', 'Carriers']}
          activeIndex={activeTab}
          onTabChange={setActiveTab}
        />
        {/* Dynamic Content */}
        <div className={styles.content}>{renderContent()}</div>
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
            <input
              className={styles.white_button}
              type="reset"
              value="Cancel"
            />
            <input
              className={styles.purple_button}
              type="submit"
              value="Save & Next"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
