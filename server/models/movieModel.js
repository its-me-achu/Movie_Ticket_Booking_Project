const mongoose = require("mongoose");

const movieSchema  = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    duration:{ 
        type: Number,
        required: true,
    },
    genre:{
        type: String,
        required: true,
    },
    language:{
        type: String,
        required: true,
    },
    releasedate:{
        type: Date,
        required: true,
    },
    poster:{
        type: String,
        required: true,
    },
}, {timestamps: true});

 const movies = mongoose.model("movies", movieSchema);

 module.exports = movies;
