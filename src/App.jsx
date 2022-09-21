import styles from './App.module.css';
import { useState, useEffect, useCallback } from 'react';
import VideoList from './components/video_list/VideoList';
import SearchHeader from './components/search_header/SearchHeader';
import VideoDetail from './components/video_detail/VideoDetail';


function App({ youtube }) {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const selectVideo = (video) => {
    setSelectedVideo(video);
  };
  const search = useCallback((query) => {
    youtube
      .search(query) //
      .then((videos) => {
        setVideos(videos)
        setSelectedVideo(null);
      });
  }, [youtube])
  useEffect(() => {
    youtube
      .mostPopular() //
      .then((videos) => setVideos(videos));
  }, [youtube]);
  return (
    <div className={styles.app}>
      <SearchHeader onSearch={search} />
      <section className={styles.content}>
        {selectedVideo && (
          <div className={styles.detail}>
            <VideoDetail video={selectedVideo} />
          </div>
        )}
        <div className={styles.list}>
          <VideoList videos={videos} onVideoClick={selectVideo} display={selectedVideo? 'list' : 'grid'} />
        </div>
      </section>
    </div>
  );
}

export default App;
