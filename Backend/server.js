require('dotenv').config();
const app = require('./src/app');
const connecttodb = require('./src/database/movie.database');
const path = require("path");


connecttodb();
app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})
const path = require("path");

// serve frontend
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../frontend/dist/index.html")
  );
});


