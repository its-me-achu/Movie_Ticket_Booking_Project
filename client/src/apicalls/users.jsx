import axios from "axios";
 

//Register a new user:
export const RegisterUser = async (payload) =>{
    try{
        const response = await axios.post("http://localhost:3000/api/users/register", payload);
        return response.data;
    }catch(error){
        return error.response;

    }
};

//Login a user:
export const LoginUser = async (payload)=>{
    try{
        const response = await axios.post("http://localhost:3000/api/users/login", payload);
        return response.data;
    }catch(error){
        return error.response;

    }
};


//Get Current User:
export const fetchCurrentUser = async () => {

    try{
  const token = localStorage.getItem("token"); 
  const response = await axios.get("http://localhost:3000/api/users/get-current-user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    return response.data;
  }
    catch (error) {
    return error.response;


    }}
  
