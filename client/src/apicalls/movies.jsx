//const {axiosInstance} = require(".");
import { axiosInstance } from '../apicalls/axios'
//import axios from 'axios';


//Add a   New Movie:
export const AddMovie = async (payload) =>{
   console.log(payload);
    try{
        const token = localStorage.getItem("token"); 
        const response = await axiosInstance.post("/movies/add-movies",payload, {
            headers: {
                Authorization: `Bearer ${token}`,
              }
        });
        return response.data;
    }catch(error){
        return error.response 
    }
};

//Get All Movies:
export  const GetAllMovies = async ()=>{
 
    try{
        const token = localStorage.getItem("token");
             const response = await axiosInstance.get("/movies/get-all-movies",{
                headers: {
                    Authorization: `Bearer ${token}`,
                  }
             });
             return response.data;
            
    }catch(error){
        return error.response 
    }
};

//Update a Movie:
export const UpdateMovie = async(payload)=>{

    try{
        const token = localStorage.getItem("token");
        const response = await axiosInstance.post("/movies/update-movie",payload ,{
           headers: {
               Authorization: `Bearer ${token}`,
             }
        });
        return response.data;
    
    
}catch(error){
    return error.response 
}
};

//Delete a Movie:
export const DeleteMovie = async (payload)=>{
console.log(payload);
    try{

        const token = localStorage.getItem("token");
        const response = await axiosInstance.delete(`/movies/delete-movie/${payload}`, {
    
            headers: {
                Authorization: `Bearer ${token}`,
              }
        });
        return response.data;
    }
catch(error){
    return error.response 
}
 
};
//Get Movie By Id:
export const GetMovieById = async (id)=>{
    try{
        const token = localStorage.getItem("token");
        const response = await axiosInstance.get(`/movies/get-movie-by-id/${id}`, {
    
            headers: {
                Authorization: `Bearer ${token}`,
              }
        });
        return response.data;
    }
catch(error){
    return error.response 
}
 
};

