//import axios from 'axios';
import { axiosInstance }  from './axios';


//Add anew Theatre:
export const AddTheatres = async (payload) =>{
    try{
        const token = localStorage.getItem("token"); 
       
        const response = await axiosInstance.post("/theatres/add-theatres",payload, {
            headers: {
                Authorization: `Bearer ${token}`,
              }
        });
        return response.data;
    }catch(error){
        return error.response 
    }
};

//Get all theateres:
export  const GetAllTheatres = async ()=>{
 
    try{
        const token = localStorage.getItem("token");
             const response = await axiosInstance.get("/theatres/get-all-theatres",{
                headers: {
                    Authorization: `Bearer ${token}`,
                  }
             });
             return response.data;   
    }catch(error){
        return error.response 
    }
};

//Get All Theatres by Owner:
export  const GetAllTheatresByOwner = async (payload)=>{
 
    try{
        const token = localStorage.getItem("token");
       const response = await axiosInstance.post(`/theatres/get-all-theatres-by-owner`,payload,{
                headers: {
                    Authorization: `Bearer ${token}`,
                  }
             });
             return response.data;   
    }catch(error){
        return error.response 
    }
};

//Update Theatres:
export const UpdateTheatre = async (payload)=>{
     try{
        const token = localStorage.getItem("token");
             const response = await axiosInstance.post("/theatres/update-theatre",payload,{
                headers: {
                    Authorization: `Bearer ${token}`,
                  }
             });
             return response.data;   
    }catch(error){
        return error.response 
    }
};

//Delete Theatre:
export const DeleteTheatre = async(payload)=>{
    console.log(payload);
       try{
        const token = localStorage.getItem("token");
             const response = await axiosInstance.delete(`/theatres/delete-theatre/${payload}`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                  }
             });
             return response.data;   
    }catch(error){
        return error.response 
    }
};

//Add a New Show:
export const AddShow = async (payload) =>{
    try{
        const token = localStorage.getItem("token"); 
       
        const response = await axiosInstance.post("/theatres/add-show",payload, {
            headers: {
                Authorization: `Bearer ${token}`,
              }
        });
        return response.data;
    }catch(error){
        return error.response 
    }
};
//Get All Shows By Theatre:
export const GetAllShowsByTheatre = async ({ theatreId }) => {
  try {
     const token = localStorage.getItem("token");
    const response = await axiosInstance.get(`/theatres/${theatreId}/shows`,{
     headers: {
                    Authorization: `Bearer ${token}`,
                 }
             });
    return response.data;
  } catch (error) {
    return { message: error.response?.data?.message || "Error fetching shows" };
  }
};
//Delete Show:
export const DeleteShow = async(payload)=>{
    console.log(payload);
       try{
        const token = localStorage.getItem("token");
             const response = await axiosInstance.delete(`/theatres/delete-show/${payload}`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                  }
             });
             return response.data;

    }catch(error){
        return error.response 
    }
};
//Get All shows theatres for a movie:
export const GetAllTheatresByMovie = async (payload) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axiosInstance.get(`/theatres/get-all-theatres-by-movie`,  {
      headers: {
        Authorization: `Bearer ${token}`,
      },
          params: {
          movie: payload.movie,
          date: payload.date,
        }
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
};

//Get Show By Id:
export const GetShowById = async (payload) => {
    console.log("Payload in GetShowById:", payload);
  try {
    const token = localStorage.getItem("token");
    const response = await axiosInstance.post("/theatres/get-show-by-id", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
};