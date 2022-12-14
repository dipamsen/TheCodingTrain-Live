import { useEffect, useState } from "react";
import Header from "./components/Header";
import "./App.css";
import { getVideoInfo } from "./utils";
import { useParams } from "react-router-dom";

function LiveStream() {
  const [loaded, setLoaded] = useState(false);
  const [video, setVideo] = useState<any>(null);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id)
      getVideoInfo(id).then((data) => {
        setVideo(data);
        setLoaded(true);
        console.log(data.snippet);
      });
  }, [id]);

  return (
    <>
      <Header />
      {loaded && video ? (
        <div className="container">
          <h2>
            {video.snippet.channelTitle === "The Coding Train"
              ? "YT Live Stream:"
              : "Twitch VOD Uploaded on:"}{" "}
            {new Date(video.snippet.publishedAt).toLocaleDateString()}
          </h2>
          {video.snippet.channelTitle !== "The Coding Train" && (
            <div className="text">
              (The date of broadcast can be seen in the Stream on Dan's Laptop.)
            </div>
          )}
          <div className="video-container">
            <iframe
              width="800"
              height="450"
              src={`https://www.youtube.com/embed/${video.id}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <div className="video-info">
            <p
              className="video-title"
              dangerouslySetInnerHTML={{ __html: video.snippet.title }}
            ></p>
            <p className="video-date text">
              {new Date(video.snippet.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p
              className="video-description text"
              style={{ whiteSpace: "pre-wrap" }}
            >
              {video.snippet.description}
            </p>
          </div>
        </div>
      ) : (
        <div className="container">
          <h2>Loading...</h2>
        </div>
      )}
    </>
  );
}

export default LiveStream;
