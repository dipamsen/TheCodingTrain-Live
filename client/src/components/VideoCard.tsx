import "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./VideoCard.css";

export default function VideoCard({ video }: { video: any }) {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const copyVideoLink = async () => {
    const link = `https://youtu.be/` + video.id;
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="video-card">
      <img
        src={video.thumbnails.high.url}
        alt="thumbnail"
        className="video-thumbnail"
      />
      <div className="video-info">
        <p
          className="video-title"
          dangerouslySetInnerHTML={{ __html: video.title }}
        ></p>
        <p className="video-date text">
          {new Date(video.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <p className="video-description text">{video.description}</p>
      </div>
      <div className="card-actions">
        <Link to={"/ls/" + video.id}>
          <button type="button">Open</button>
        </Link>
        <button
          type="button"
          className={copied ? "success" : ""}
          onClick={copyVideoLink}
        >
          {copied ? "Copied Link!" : "Copy YT Link"}
        </button>
      </div>
    </div>
  );
}
