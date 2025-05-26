const User  = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authMiddleware = require("../middlewares/authMiddleware");
const router = require("express").Router();

require("dotenv").config();

//Register a new user:
   router.post("/register", async (req, res) =>{
    try{
        //check if user already exixts:
        const userExists = await User.findOne({email: req.body.email});
        if(userExists){
            return res.status(400).json({ error: "User Already Exists"});
        }
         //Save the User:
          const newUser = new User(req.body);
          await newUser.save();
          res.status(201).json({message: "User Registered Successfully"});
        
    }catch (error){
        res.status(500).json({ error: "Internal server error"})
    }
    
});
//Login a user:
 router.post("/login", async(req,res) =>{
        try{
    //check if user exists:
     const user = await User.findOne({email: req.body.email});
     if(!user){
        return res.status(401).json({ error: "User Dosn't Exist"})
     }
     //Check if the password is correct or not:
     const vaildPassword = await bcrypt.compare(
        req.body.password,
        user.password
     );
     if(!vaildPassword){
         return res.status(401).json({error: "INVALID USER DETAILS"}); 
     }
     //Create and assign a token:
     const token= jwt.sign({userId: user._id},
                         process.env.JWT_SECRET,
                         {expiresIn: process.env.JWT_EXPIRES_IN,});
    
     res.status(200).json({message: "Login Successful", token});
    
        } catch(error){
    
            console.error("error logging in user:", error);
            res.status(500).json({ error: "Internal server error"})
        }
    });
//Get user deatails by id:
router.get('/get-current-user' , authMiddleware ,async (req, res)=>{
   
 try{
const user = req.user;
if(!user) 
    return  res.status(404).json({message: "User not found"});
 res.status(200).json(user);
 }catch(error){
    res.status(500).json({ error: error.message})

 }

})
    
    module.exports = router;