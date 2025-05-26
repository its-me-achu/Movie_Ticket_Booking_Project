const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const Movie = require("../models/movieModel");


//Add anew Movie:
router.post("/add-movies", authMiddleware, async (req,res)=>{
try{
  const newMovie = new Movie(req.body)
      await newMovie.save();
      res.status(201).json({message: "Movie added Successfully"});
               }catch(error){
                console.error("Error adding movie:", error);
                res.status(500).json({ error: "Internal server error"})
               }
});




//Get All Movies:
router.get("/get-all-movies", async(req, res)=>{
  try{
   const movie = await Movie.find();
   res.status(200).json({message: "Movies fetched Successfully", movie});
  }catch(error){
    res.status(500).json({ error: "Internal server error"})

  }
})
//Update a Movie:
router.post("/update-movie", async(req, res)=>{
  try{
    await Movie.findByIdAndUpdate(req.body.movieId, req.body);
    res.status(200).json({message: "Movie Updated Successfully"});
  }catch(error){
    res.status(500).json({ error: "Internal server error"})
  }
});

//Delete A Movie:
router.delete("/delete-movie/:id", async (req, res)=>{
  console.log(req.params.id);

  try{
    await Movie.findByIdAndDelete(req.params.id);
    res.status(200).json({message: "Movie Deleted Successfully"});
   }catch(error){
    res.status(500).json({ error: "Internal server error"})
  }
});

//Get Movie By Id:
router.get("/get-movie-by-id/:id", async (req, res)=>{
  try{
    const movie = await Movie.findById(req.params.id);
    res.status(200).json({message: "Movie fetched Successfully", movie});
   }catch(error){
    res.status(500).json({ error: "Internal server error"})
  }
});




module.exports = router;




