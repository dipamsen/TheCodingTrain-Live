// coding train channel id
const channelID = "UCvjgXvBlbQiydffZU7m1_aw";
const API_KEY = import.meta.env.VITE_YT_API_KEY;

// cache  output
let cache: any = {
  videos: [],
  totalPages: null,
};

export const VIDEOS_PER_PAGE = 20;

export async function getLiveStreams(page: number) {
  // Doing this drains the quota very quickly.
  //
  // if (cache.videos[page]) {
  //   const data = cache.videos[page];
  //   return [data.items, data.pageInfo.totalResults];
  // } else {
  //   const pageToken = page === 1 ? "" : cache.videos[page - 1]?.nextPageToken;
  //   if (pageToken == null) throw new Error("First request earlier pages");
  //   const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelID}&eventType=completed&maxResults=${VIDEOS_PER_PAGE}&order=date&type=video&key=${API_KEY}&pageToken=${pageToken}`;
  //   const response = await fetch(url);
  //   const data = await response.json();
  //   cache.videos[page] = data;
  //   return [data.items, data.pageInfo.totalResults];
  // }

  // Using local files instead

  const data = await import(`./data_files/${page}.json`);
  return [data.items, data.pageInfo.totalResults];
}
// @ts-ignore
window.getLiveStreams = getLiveStreams;

export async function getVideoInfo(videoID: string) {
  const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoID}&key=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.items[0];
}
