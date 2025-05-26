import React , { useEffect, useState }from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Button from "../../components/Button"
import { Form, message } from "antd";
import { LoginUser } from '../../apicalls/users';
import {useDispatch} from 'react-redux'
import { HideLoading, ShowLoading } from '../../redux/loadersSlice';

function Login() {
 const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values)=>{
      try{
       dispatch(ShowLoading());
        const response = await LoginUser(values);
       dispatch(HideLoading());
       console.log(response);
          if(response){
            message.success(response.message);
            localStorage.setItem("token", response.token);
            window.location.href = "/";
         
          } else {
            message.error(response.message);
          }
        } catch(error){
          dispatch(HideLoading());
          message.error(error.message)
        }
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <div  className='flex justify-center h-screen items-center bg-primary'>
      <div  className='card p-3 w-400'>
        <h1 className='text-xl mb-2'>----AARA MOVIES - LOGIN----</h1>
        <hr />
        <Form layout="vertical"
        className='mt-2'
        onFinish={onFinish}>
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
       <Button  title='LOGIN' type="submit" />
       <Link to="/register" className='text-primary'>Don't have an account? Register</Link>
        </Form>
   </div>
    </div>
  
        
    
    </>
  )
}

export default Login