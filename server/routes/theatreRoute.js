const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const Theatre = require("../models/theatreModel");
const Show = require("../models/showModel");
const Movie = require("../models/movieModel");
const mongoose = require("mongoose");
const { create } = require("../models/userModel");

//Add Theatre:
router.post("/add-theatres",authMiddleware, async(req, res)=>{
    try{
      console.log("Backend payload:", req.body); 
  const newTheatre = new Theatre(req.body);
   await newTheatre.save();
  res.status(201).json({message: "Theatre  Added Successfully"});
    }catch(error){
        res.status(500).json({ error: "Internal server error"})
    }
});
//Get-All-Theatre:
router.get("/get-all-theatres", authMiddleware,async(req, res)=>{
  try{
    const theatres = await Theatre.find();
    res.status(200).json({message: "Theatres fetched Successfully", theatres});
  }catch(error){
        res.status(500).json({ error: "Internal server error"})
    }
});



//Get All Theatres By Owner:
router.post("/get-all-theatres-by-owner",authMiddleware, async (req, res)=>{
  try{
    const ownerId = req.body.owner;
    console.log("Owner ID:", ownerId);
   const theatres = await Theatre.find({owner: ownerId}).populate('owner');
     //const theatres = await Theatre.find({ owner: ownerId }).populate('theatre').populate('owner');
    res.status(200).json({message: "Theatres fetched Successfully", theatres});
  }catch(error){
       console.error("Error in get-all-theatres-by-owner:", error);
        res.status(500).json({ error: "Internal server error"})
    }
});
//Update Theatres:
router.post("/update-theatre", authMiddleware,async(req, res)=>{
    try{
      await Theatre.findByIdAndUpdate(req.body.theatreId, req.body);
      res.status(200).json({ message: "Theatre Updated Successfully"});
    }catch(error){
      res.status(500).json({error: "Internal server error"})
    }
})
//Delete Theatres:
router.delete("/delete-theatre/:id",authMiddleware, async (req, res)=>{
  console.log(req.params.id);

  try{
    await Theatre.findByIdAndDelete(req.params.id);
    res.status(200).json({message: "Theatre Deleted Successfully"});
   }catch(error){
    res.status(500).json({ error: "Internal server error"})
  }
});

//Add a new Show:
router.post("/add-show", authMiddleware,async(req,res)=>{
     try{
  console.log("Backend payload:", req.body);
  const newShow = new Show(req.body);
  await newShow.save();
  res.status(201).json({message: "Show  Added Successfully"});
    }catch(error){
        res.status(500).json({ error: "Internal server error"})
    }
});

//Get All Shows By Theatre:
router.get("/:theatreId/shows",authMiddleware, async (req, res)=>{
  try{
   const theatreId = req.params.theatreId;
      const shows = await Show.find({theatre: theatreId}).populate("movie").populate("theatre");
      console.log("Shows:", shows);
    res.status(200).json({message: "Shows fetched Successfully", shows});
  }catch(error){
        res.status(500).json({ error: "Internal server error"})
    }
});
//Delete Show:
router.delete("/delete-show/:id",authMiddleware, async (req, res)=>{
  console.log(req.params.id);

  try{
    await Show.findByIdAndDelete(req.params.id);
    res.status(200).json({message: "Show Deleted Successfully"});
   }catch(error){
    res.status(500).json({ error: "Internal server error"})
  }
});

//Get All Unique theatres which have the shows of the movie:
router.get("/get-all-theatres-by-movie",authMiddleware, async (req, res)=>{
  try{
  const { movie, date } = req.query;
  //Find All shows of a movie:
  const shows = await Show.find({movie, date}).populate("theatre").sort({createdAt: -1});
  //Get All unique theatres:
 const theatreMap = new Map();
  shows.forEach((show) => {
    const theatreId = show.theatre._id.toString();
    if (!theatreMap.has(theatreId)) {
      theatreMap.set(theatreId, {
        _id: show.theatre._id,
         name: show.theatre.name,
          location: show.theatre.location,
        shows: [],
      });
    }
    theatreMap.get(theatreId).shows.push(show);
  }
  );
     const uniqueTheatres = Array.from(theatreMap.values());
    res.status(200).json({message: "Theatres fetched Successfully", uniqueTheatres});
  }catch(error){
        res.status(500).json({ error: "Internal server error"})
    }
});

//Get Show By Id:
router.post("/get-show-by-id",authMiddleware, async (req, res)=>{
  try{
    const showId = req.body.showId;
    const show = await Show.findById(showId).populate("movie").populate("theatre");
    console.log("Show ID:", showId);
    console.log("Show:", show);
    res.status(200).json({message: "Show fetched Successfully", show});
  }catch(error){
        res.status(500).json({ error: "Internal server error"})
    }
});



module.exports = router;