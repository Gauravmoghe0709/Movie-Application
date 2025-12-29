const express = require ('express');
const authmiddleware = require("../middleware/auth.middleware")
const moviecontroller = require("../controller/movie.controller")
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// ensure uploads directory exists
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
	destination: function (req, file, cb) { cb(null, uploadDir) },
	filename: function (req, file, cb) { cb(null, Date.now() + path.extname(file.originalname)) }
});
const upload = multer({ storage });


/* user Api*/ 
router.get("/allmovies",authmiddleware,moviecontroller.getallmovies)
router.get("/sortedmovie",authmiddleware,moviecontroller.getsortedmovies)
router.get("/searchmovie/search",authmiddleware,moviecontroller.searchmovie)

/* Admin Api*/

router.post("/addmovies",authmiddleware,moviecontroller.createmovie)
router.put("/updatemovie/:id",authmiddleware,moviecontroller.updatemovie)
router.delete("/deletemovie/:id",authmiddleware,moviecontroller.deletemovie)

// upload movie image (field name: 'image')
router.post('/upload', authmiddleware, upload.single('image'), moviecontroller.uploadMovieImage)

// get single movie by id
router.get('/:id', authmiddleware, moviecontroller.getmoviebyid)


module.exports = router;