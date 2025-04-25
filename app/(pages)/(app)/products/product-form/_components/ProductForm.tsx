'use client';
import styles from './ProductForm.module.scss';
import Image from 'next/image';
import React, { useState } from 'react';
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
  const [types, setTypes] = useState<string[]>([]);
  const addType = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const input = event.target as HTMLInputElement;
    const newType = input.value;
    if (newType !== '') {
      setTypes((prevTypes) => [...prevTypes, newType]);
    }
    input.value = '';
  };
  const deleteType = (index: number) => {
    setTypes((prevTypes) => [
      ...prevTypes.slice(0, index),
      ...prevTypes.slice(index + 1),
    ]);
  };
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <div className={styles.subpage_container}>
            {/* Title - Text Box, Category - Text Box
                Description - Larger Text Box
                Product Type - Dropdown selector, Tags - Dropdown selector
                Media - Image Uploading (placholder) */}
            <form onSubmit={handleSubmit}>
              <div className={styles.inputs_container}>
                <div className={styles.input_container}>
                  <p>Title</p>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                  />
                  <p>Category</p>
                  <div className={styles.column_container}>
                    <input type="text" name="category" />
                    {/* <div className={styles.toggle_container}>
                      <p>List Product</p>
                      <input
                        className={styles.toggle}
                        type="checkbox"
                        name="list_toggle"
                      />
                    </div> */}
                  </div>
                </div>
                <div className={styles.input_container}>
                  <p>Description</p>
                  <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={styles.input_container}>
                  <p>Product Type</p> {/* unlink from tags section */}
                  <input
                    onKeyDown={(
                      event: React.KeyboardEvent<HTMLInputElement>
                    ) => {
                      if (event.key === 'Enter') {
                        addType(event);
                      }
                    }}
                    id="type_search"
                    type="text"
                    placeholder="Watch.."
                  />
                  <div className={styles.selected_tags}>
                    {types.map((type, index) => (
                      <p key={index} className={styles.tag_display}>
                        {type} <span onClick={() => deleteType(index)}>x</span>
                      </p>
                    ))}
                  </div>
                </div>
                <div className={styles.input_container}>
                  <p>Tags</p>
                  <input
                    onKeyDown={(
                      event: React.KeyboardEvent<HTMLInputElement>
                    ) => {
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
                  <p>Media</p>
                </div>
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
              </div>
            </form>
          </div>
        );
      case 1:
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
              <div className={styles.input_container}>
                <p>Pricing</p>
                <div className={styles.column_container}>
                  <input type="text" name="pricing" />
                </div>
                <p>Processing Time</p>
                <div className={styles.column_container}>
                  <input type="text" name="processing_time" />
                </div>
              </div>
              <div className={styles.input_container}>
                <p>Item Weight (Prepared for Packing)</p>
                <div className={styles.column_container}>
                  <input type="text" name="pounds" />
                  <input type="text" name="ounces" />
                </div>
              </div>
              <div className={styles.input_container}>
                <p>Length</p>
                <div className={styles.column_container}>
                  <input type="text" name="processing_time" />
                </div>
                <p>Width</p>
                <div className={styles.column_container}>
                  <input type="text" name="processing_time" />
                </div>
                <p>Height</p>
                <div className={styles.column_container}>
                  <input type="text" name="processing_time" />
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className={styles.subpage_container}>
            <h4>Shipping Information</h4>
            <p> Placeholder </p>
          </div>
        );
      case 3:
        return (
          <div className={styles.subpage_container}>
            <h4>Carriers Information</h4>
            <p> Placeholder </p>
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
        <form onSubmit={handleSubmit}>
          <div className={styles.content}>{renderContent()}</div>
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
