import axios from "axios";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

const API_KEY = process.env.API_KEY;

async function getYTLiveStreams() {
  // The Coding Train YT Channel
  const channelID = "UCvjgXvBlbQiydffZU7m1_aw";
  const allStreams = [];

  // paginate
  let nextPageToken = "";
  let page = 1;
  const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelID}&eventType=completed&maxResults=60&order=date&type=video&key=${API_KEY}`;
  while (nextPageToken != null) {
    const response = await axios.get(url + `&pageToken=${nextPageToken}`);
    const { data } = response;
    const { items } = data;
    allStreams.push(...items);
    nextPageToken = data.nextPageToken;
    console.log(`Page ${page} fetched. (${items.length} streams)`);
    page++;
  }

  console.log(`Total streams: ${allStreams.length}`);

  return allStreams;
}

async function getTwitchLiveStreams() {
  // The Coding Train Twitch Archive
  const channelID = "UCcNasmuTD4kb_HC1Z5lcuxg";
  let allStreams = [];

  // paginate
  let nextPageToken = "";
  let page = 1;
  const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelID}&maxResults=60&order=date&type=video&key=${API_KEY}`;
  while (nextPageToken != null) {
    const response = await axios.get(url + `&pageToken=${nextPageToken}`);
    const { data } = response;
    const { items } = data;
    allStreams.push(...items);
    nextPageToken = data.nextPageToken;
    console.log(`Page ${page} fetched. (${items.length} streams)`);
    page++;
  }

  allStreams = allStreams.filter((vid) => vid.id.videoId !== "iDHcNneetWw");

  console.log(`Total streams: ${allStreams.length}`);

  return allStreams;
}

async function main() {
  const ytlive = await getYTLiveStreams();
  const twitchlive = await getTwitchLiveStreams();
  const streams = [...ytlive, ...twitchlive].map((vid) => {
    const { id, snippet } = vid;
    const { title, publishedAt, description, thumbnails } = snippet;
    return {
      id: id.videoId,
      title,
      description,
      thumbnails,
      publishedAt: new Date(publishedAt).toISOString(),
      type: ytlive.includes(vid) ? "youtube" : "twitch",
    };
  });

  fs.writeFileSync("data/allstreams.json", JSON.stringify(streams, null, 2));
}

main();
