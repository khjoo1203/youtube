import styles from './App.module.css';
import { useState, useEffect } from 'react';
import VideoList from './components/video_list/VideoList';
import SearchHeader from './components/search_header/SearchHeader';

function App({ youtube }) {
  const [videos, setVideos] = useState([]);
  const search = (query) => {
    youtube
      .search(query) //
      .then(videos => setVideos(videos));
  };
  useEffect(() => {
    youtube
      .mostPopular() //
      .then(videos => setVideos(videos));
  }, []);
  return (
    <div className={styles.app}>
      <SearchHeader onSearch={search} />
      <VideoList videos={videos} />
    </div>
  );
}

export default App;
