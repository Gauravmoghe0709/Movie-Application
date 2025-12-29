const moviemodel = require ("../models/movies.model")
const usermodel = require ("../models/usermodel")


  /* User Api controller */
async function getallmovies(req,res){
    const id = req.user._id;

   try {
     const user  = await usermodel.findById(id)
    if(!user){
        return res.status(401).json({
            message:"user not found..."
        })
    }
    const allmovies = await moviemodel.find()
    res.status(200).json({
        message:"all movies fetched...",
        allmovies
    })
   } catch (error) {
        console.log(error)
   }
}
async function getsortedmovies(req,res){
    const id = req.user._id;
    const {by="name",order="asc"} = req.query;
    try {
        const user  = await usermodel.findById(id)
        if(!user){
            return res.status(401).json({
                message:"user not found..."
            })
        }

        const allowedsortfields = ["name", "releaseDate", "rating","duration"];
        if(!allowedsortfields.includes(by)){
            return res.status(400).json({
                message:"Invalid sort field.."
            })
        }
        const sortorder = order==="desc"? -1 : 1;

        const sortedmovies = await moviemodel.find().sort({[by]:sortorder})
        res.status(200).json({
            message:"sorted movies fetched...",
            sortedmovies
        })
    } catch (error) {
        console.log(error)
    }
}
async function searchmovie(req,res){
    const id = req.user._id;
    const { name = "", description = ""} = req.query;

    try{
        const user  = await usermodel.findById(id)
        if(!user){
            return res.status(401).json({
                message:"user not found..."
            })
        }   

        const searchmovie = await moviemodel.find({
            $or:[
                {name:{$regex:name,$options:"i"} },
                {description:{$regex:description,$options:"i"} }
            ]
        })

        if(searchmovie.length==0){
            return res.status(404).json({
                message:"movie not found..."
            })
        }

        res.status(200).json({
            message:"movie found...",
            searchmovie
        })

    }catch (error) {
        console.log(error)
    }
}

/* Admin Api controller */

async function createmovie(req,res){
    const id = req.user._id;
    const {name,description,relesedate,rating,duration,poster} = req.body;
    try{
        const user  = await usermodel.findById(id)
        if(user.role === "admin"){
            // validate and parse release date
            let parsedDate = null;
            if (relesedate) {
                parsedDate = new Date(relesedate);
                if (isNaN(parsedDate.getTime())) {
                    return res.status(400).json({ message: 'Invalid release date format' });
                }
            }

            const newmovie = await moviemodel.create({
                name,
                description,
                relesedate: parsedDate,
                rating,
                duration,
                poster

            })
            res.status(201).json({
            message:"movie added successfully...",
            newmovie
        })     
        }

        else{
            return res.status(403).json({
                message:"only admin can add movies..."
            })
        }
    }catch (error) {
        console.log(error)
    }
}
async function uploadMovieImage(req, res){
    try{
        if(!req.file){
            return res.status(400).json({ message: 'No file uploaded' })
        }
        const fileUrl = `/uploads/${req.file.filename}`
        res.status(201).json({ message: 'File uploaded', fileUrl })
    }catch(error){
        console.log(error)
        res.status(500).json({ message: 'Upload failed' })
    }
}
async function updatemovie(req,res){
    const id = req.user._id;
    const movieid = req.params.id;

    try{
        const user  = await usermodel.findById(id)
        if(user.role === "admin"){
            const updatemovie = await moviemodel.findByIdAndUpdate(movieid,{
                $set:req.body
            },{new:true})
            res.status(200).json({
                message:"movie updated successfully...",
                updatemovie
            })
        }
        
}    catch (error) {
        console.log(error)
    }   

}
async function deletemovie(req,res){
    const id = req.user._id;
    const movieid = req.params.id;

    try{
        const user  = await usermodel.findById(id)
        if(user.role === "admin"){
            await moviemodel.findByIdAndDelete(movieid)
            return res.status(200).json({
                message:"movie deleted successfully..."
            })
        }
    }catch (error) {
        console.log(error)
    }
}

async function getmoviebyid(req, res){
    const id = req.user._id;
    const movieid = req.params.id;
    try{
        const user = await usermodel.findById(id)
        if(!user) return res.status(401).json({ message: 'user not found' })
        const movie = await moviemodel.findById(movieid)
        if(!movie) return res.status(404).json({ message: 'movie not found' })
        res.status(200).json({ movie })
    }catch(error){
        console.log(error)
        res.status(500).json({ message: 'Server error' })
    }
}


module.exports = {
    getallmovies,
    getsortedmovies,
    searchmovie,
    createmovie,
    updatemovie,
    deletemovie
    ,
    uploadMovieImage
    ,
    getmoviebyid
}
