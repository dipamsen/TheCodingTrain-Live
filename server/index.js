import express from "express";
import allStreams from "./data/allstreams.json" assert { type: "json" };
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const API_KEY = process.env.API_KEY;

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send({
    message: "Choo Choo! 🚂",
  });
});

app.get("/allstreams", async (req, res) => {
  res.send(
    allStreams.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
  );
});

app.get("/stream/:id", async (req, res) => {
  const { id } = req.params;
  const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=${API_KEY}`;
  const { data } = await axios.get(url);
  res.send(data);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000");
});
