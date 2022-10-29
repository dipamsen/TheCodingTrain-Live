import "react";
import { useNavigate } from "react-router-dom";
import "./VideoCard.css";

export default function VideoCard({ video }: { video: any }) {
  const navigate = useNavigate();
  return (
    <div
      className="video-card"
      onClick={() => {
        navigate("/ls/" + video.id.videoId);
      }}
    >
      <img
        src={video.snippet.thumbnails.high.url}
        alt="thumbnail"
        className="video-thumbnail"
      />
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
        <p className="video-description text">{video.snippet.description}</p>
      </div>
    </div>
  );
}
