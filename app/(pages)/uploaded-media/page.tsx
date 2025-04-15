'use server';
import styles from './page.module.scss';

import MediaCard from '@componentsmedia/MediaCard/MediaCard';
import MediaHeader from '@componentsmedia/MediaHeader/MediaHeader';
import ContentSection from '@componentsmedia/ContentSection/ContentSection';
import SelectContextProvider from '@contexts/SelectContext';
import FilterContextProvider from '@contexts/FilterContext';
import { findMediaItems } from '@datalib/media/findMediaItem'; //no media folder under ./app/(api)/_datalib and no findMediaItem function yet
import MediaItem from '@app/(pages)/_types/media/MediaItem'; 

export default async function MediaPage() {
  const res = JSON.parse(JSON.stringify(await findMediaItems()));
  if (!res.ok) {
    return 'Error fetching Media data';
  }

  const data_list = res.body.map((mediaItem: MediaItem) => {
    return <MediaCard mediaItem={mediaItem} key={mediaItem._id} />;
  });

  return (
    <SelectContextProvider>
      <FilterContextProvider>
        <div className={styles.container}>
          <MediaHeader />
          <ContentSection title="">{data_list}</ContentSection>
        </div>
      </FilterContextProvider>
    </SelectContextProvider>
  );
}
