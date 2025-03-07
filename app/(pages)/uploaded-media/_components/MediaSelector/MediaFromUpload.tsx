'use client';
import { useRef, DragEvent, ChangeEvent } from 'react';
import Image from 'next/image';
import styles from './MediaFromUpload.module.scss';

import uploadIcon from '@public/content/form/upload.png';
import uploadMediaItem from '@utils/uploadMediaItem';

interface MediaFromUploadProps {
  //onInput: (files: FileList) => void;
  onInput: (mediaItems: any[]) => void;
}

export default function MediaFromUpload({ onInput }: MediaFromUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = e.dataTransfer.files;
    //onInput(droppedFiles);
    await processFiles(droppedFiles);
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const inputFiles = e.target.files;
    //onInput(inputFiles ?? new FileList());
    if (inputFiles) {
      await processFiles(inputFiles);
    }
    e.target.value = '';
  };

  //new function
  const processFiles = async (files: FileList) => {
    const uploadedMediaItems = [];

    for (const file of Array.from(files)) {
      const mediaItem = {
        type: file.type.startsWith('video') ? 'video' : 'image',
        src: URL.createObjectURL(file), // Temporary preview URL
      };

      const response = await uploadMediaItem(mediaItem); //call backend function
      if (response.ok) {
        uploadedMediaItems.push(response.body);
      }
    }

    onInput(uploadedMediaItems); // Calls the function with new media items
  };

  const handleDragOver = (e: DragEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div
      className={styles.container}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={handleUploadClick}
    >
      <Image src={uploadIcon} alt="upload icon" height={47} width={47} />
      <h4>
        <u>Upload a File</u> or Drag and Drop
      </h4>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        multiple
      />
    </div>
  );
}
