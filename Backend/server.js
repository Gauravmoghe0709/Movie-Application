require("dotenv").config();

const app = require("./src/app");
const connecttodb = require("./src/database/movie.database");

connecttodb();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
