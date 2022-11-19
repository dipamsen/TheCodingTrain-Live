import { useEffect, useState } from "react";
import Header from "./components/Header";
import VideoCard from "./components/VideoCard";
import "./App.css";
import { getVideos, VIDEOS_PER_PAGE } from "./utils";
import Pagination from "./components/Pagination";
import { useParams, useNavigate } from "react-router-dom";

function App() {
  const [videos, setVideos] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const { page = "1" } = useParams<{ page: string }>();
  const navigate = useNavigate();

  console.log(videos);

  useEffect(() => {
    getVideos(+page).then(([data, totalVideos]) => {
      setVideos(data);
      setTotalPages(Math.ceil(totalVideos / VIDEOS_PER_PAGE));
    });
  }, [page]);

  const prevPage = () => navigate("/" + (Number(page) - 1));
  const nextPage = () => navigate("/" + (Number(page) + 1));

  return (
    <>
      <Header />
      <div className="container">
        <h2>Past Live Streams</h2>
        <Pagination
          page={+page}
          totalPages={totalPages}
          nextPage={nextPage}
          prevPage={prevPage}
        />
        <div className="video-container">
          {videos.map((video: any) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>

        <Pagination
          page={+page}
          totalPages={totalPages}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      </div>
    </>
  );
}

export default App;
