import {axiosInstance} from '../apicalls/axios'
 

//Register a new user:
export const RegisterUser = async (payload) =>{
    try{
        const response = await axiosInstance.post("/api/users/register", payload);
        return response.data;
    }catch(error){
        return error.response;

    }
};

//Login a user:
export const LoginUser = async (payload)=>{
    try{
        const response = await axiosInstance.post("/api/users/login", payload);
        return response.data;
    }catch(error){
        return error.response;

    }
};


//Get Current User:
export const fetchCurrentUser = async () => {
    const token = localStorage.getItem("token"); 
    if (!token) {
     throw new Error("No token found");
   }
  
    const response = await axiosInstance.get("/api/users/get-current-user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    return response.data;
  };
  
