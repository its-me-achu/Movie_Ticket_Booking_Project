import React, { useEffect, useState } from "react";
import { fetchCurrentUser } from "../apicalls/users";
import {useNavigate} from 'react-router-dom'
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/loadersSlice";


const ProtectedRoute = ({children}) => {
  const navigate = useNavigate();
 const dispatch = useDispatch();


  const [user, setUser] = useState(null);
    const getUser = async () => {
      try {
        dispatch(ShowLoading());
        const userData = await fetchCurrentUser();
        dispatch(HideLoading());
        setUser(userData);
      } catch (error) {
       dispatch(HideLoading());
        console.error("Failed to fetch user", error);
        
        localStorage.removeItem("token");
        navigate("/login");
      }
    };
    useEffect(() =>{
      if(localStorage.getItem('token')){
        getUser();
      } else {
        navigate('/login');
      }
    }, []);

  return (
    user && (
     <div className="layout p-1">
      <div className="header bg-primary flex justify-between p-2">
<div>
<h1 className="text-2xl text-white cursor-pointer"
onClick={()=>navigate("/")}>AARA MOVIES</h1>
</div>
      <div className="bg-white p-1 flex gap-1"> 
       <i className="ri-shield-user-line"></i>
        <h1 className="text-sm underline"
        onClick={()=>{
          if(user.isAdmin){
            navigate("/admin");
          }else{
            navigate("/profile");
          }
        }}>{user.name}</h1>
        <i className="ri-logout-box-r-line ml-2 cursor-pointer"
        onClick={()=>{
          localStorage.removeItem("token");
          navigate("/login");
        }}>
      </i>
  
       </div>
      </div>
      <div className="content mt-1 p-1">
     {children}
     </div>
     </div>
    )

  );
};

export default ProtectedRoute;
