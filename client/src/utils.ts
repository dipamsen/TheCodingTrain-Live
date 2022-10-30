export const VIDEOS_PER_PAGE = 20;
const API_URL =
  location.hostname === "localhost" ? "http://localhost:3000" : "API URL";

const cache: any = {};

export async function getVideos(page: number) {
  if (cache.streams) {
    const videos = cache.streams.slice(
      (page - 1) * VIDEOS_PER_PAGE,
      page * VIDEOS_PER_PAGE
    );
    return [videos, cache.streams.length];
  }

  const res = await fetch(`${API_URL}/allstreams`);
  const data = await res.json();
  cache.streams = data;
  const videos = data.slice(
    (page - 1) * VIDEOS_PER_PAGE,
    page * VIDEOS_PER_PAGE
  );
  return [videos, data.length];
}

export async function getVideoInfo(videoID: string) {
  const url = `${API_URL}/stream/${videoID}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.items[0];
}
