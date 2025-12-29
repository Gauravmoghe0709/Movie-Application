require('dotenv').config();
const app = require('./src/app');
const connecttodb = require('./src/database/movie.database');
const path = require("path");


connecttodb();
app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})

app.use(express.static(path.join(__dirname, "../Frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../Frontend/dist/index.html")
  );
});


