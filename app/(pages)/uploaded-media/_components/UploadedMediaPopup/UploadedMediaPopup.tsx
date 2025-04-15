'use client';
import styles from './UploadedMediaPopup.module.scss';
import useSelectContext from '@app/(pages)/_hooks/useSelectContext';
import FilterContextProvider from '@app/(pages)/_contexts/FilterContext';
//import MediaCard from '../MediaCard/MediaCard';
import useMedia from '@app/(pages)/_hooks/useMedia';
//import MediaItem from '@app/_types/media/MediaItem';

interface UploadedMediaPopupProps {
  fieldName: string;
}

export default function UploadedMediaPopup({
  fieldName,
}: UploadedMediaPopupProps) {
  const position = {
    top: `${top}px`,
    left: `${left}px`,
    bottom: `${window.innerHeight - bottom}px`,
    right: `${window.innerWidth - right}px`,
  };

  const { selectMode, toggleSelectMode, selectedIds } = useSelectContext();
  const { loading, data: mediaData, error } = useMedia();

  if (loading) {
    return 'loading...';
  }

  if (error) {
    return error;
  }

  /*const data_list = mediaData.map((mediaItem: MediaItem) => {
    return <MediaCard mediaItem={mediaItem} key={mediaItem._id} />;
  });*/

  const attachMedia = () => {
    const selectedMedia = Object.values(selectedIds).filter(Boolean);
    const updatedFieldValue = [...data[fieldName], ...selectedMedia];
    updateField(fieldName, updatedFieldValue);
    toggleSelectMode();
  };

  return (
    <div
      className={`${styles.container} ${selectMode ? styles.visible : ''}`}
      style={position}
    >
      <FilterContextProvider>
        <div className={styles.data_container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Uploaded Media</h1>
          </div>
        </div>
      </FilterContextProvider>
      <div className={styles.button_container}>
        <button className={styles.attach} onClick={attachMedia}>
          Attach media
        </button>
        <button className={styles.exit_button} onClick={toggleSelectMode}>
          Cancel
        </button>
      </div>
    </div>
  );
}
