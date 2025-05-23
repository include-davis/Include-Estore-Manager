'use client';
import styles from './ProductForm.module.scss';
import Image from 'next/image';
import React, { useState } from 'react';
import Textbox from '@components/Textbox/Textbox';
// import ShortInput from '@components/ShortInput/ShortInput';

export default function AboutPage() {
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
  return (
    <div className={styles.subpage_container}>
      {/* Title - Text Box, Category - Text Box
            Description - Larger Text Box
            Product Type - Dropdown selector, Tags - Dropdown selector
            Media - Image Uploading (placholder) */}
      <div className={styles.inputs_container}>
        <div className={styles.row_container}>
          <div className={styles.column_container}>
            <p>Title</p>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.column_container}>
            <p>Category</p>
            <input type="text" name="category" />
          </div>
        </div>
        <div>
          <p>Description</p>
          <Textbox />
        </div>
        <div className={styles.input_container}>
          <p>Product Type</p> {/* unlink from tags section */}
          <input
            onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
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
    </div>
  );
}
