require("dotenv").config();
const path = require("path");
const express = require("express");

const app = require("./src/app");
const connecttodb = require("./src/database/movie.database");

app.use(express.static(path.join(__dirname, "../Frontend/dist")));

app.use((req, res) => {
  res.sendFile(
    path.join(__dirname, "../Frontend/dist/index.html")
  );
});

connecttodb();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
