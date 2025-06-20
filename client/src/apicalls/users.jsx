import axios from "axios";
import { axiosInstance } from "./axios";
 

//Register a new user:
export const RegisterUser = async (payload) =>{
    try{
        const response = await axiosInstance.post("/users/register", payload);
        return response.data;
    }catch(error){
        return error.response;

    }
};

//Login a user:
export const LoginUser = async (payload)=>{
    try{
        const response = await axiosInstance.post("/users/login", payload);
        return response.data;
    }catch(error){
        return error.response;

    }
};


//Get Current User:
export const fetchCurrentUser = async () => {

    try{
 const token = localStorage.getItem("token"); 
  const response = await axiosInstance.get("/users/get-current-user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    return response.data;
   
  }
    catch (error) {
    return error.response;


    }};
  
