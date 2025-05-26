import React from 'react'
import { Form, message } from "antd";
import { Link } from "react-router-dom";
import Button from "../../components/Button"
import {RegisterUser} from '../../apicalls/users'
import toast, { Toaster } from 'react-hot-toast';
import {useDispatch} from 'react-redux'
import { HideLoading, ShowLoading } from '../../redux/loadersSlice';
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) =>{
    try{
      dispatch(ShowLoading());
      const response = await RegisterUser(values);
      dispatch(HideLoading());
      if(response){
         message.success(response.message);
                    localStorage.setItem("token", response.token);
                    window.location.href = "/login";
      }else{
        toast.success(response.message)
      }
    } catch(error){
     dispatch(HideLoading());
      toast.error(error.message)
    }
  } 
 
 
      
  return (
    <>
    <Toaster/>
    <div  className='flex justify-center h-screen items-center bg-primary'>
      <div  className='card p-3 w-400'>
        <h1 className='text-xl mb-2'>----AARA MOVIES - REGISTER----</h1>
        <hr />
        <Form layout="vertical"
        className='mt-2'
        onFinish={onFinish}
        >
       <Form.Item
        label= "Name"
        name = "name"
        rules={[{ required: true, message: "Please input your name"}]}
       >
        <input type='text'></input>
       </Form.Item>
       <Form.Item
        label= "Email"
        name = "email"
        rules={[{ required: true, message: "Please input your email"}]}
       >
        <input type='email'></input>
       </Form.Item>
       <Form.Item
        label= "Password"
        name = "password"
        rules={[{ required: true, message: "Please input your password"}]}
       >
        <input type='password'></input>
       </Form.Item>
       <Button  title='REGISTER' type="submit"  />
       <Link to="/login" className='text-primary'> {" "} Already have an account? Login</Link>
        </Form>
   </div>
    </div>
    </>
  )
}


export default Register