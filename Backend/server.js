require("dotenv").config();
const path = require("path");

const app = require("./src/app");
const connecttodb = require("./src/database/movie.database");

// Serve frontend build
app.use(express.static(path.join(__dirname, "../Frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../Frontend/dist/index.html")
  );
});

// DB + server
connecttodb();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
