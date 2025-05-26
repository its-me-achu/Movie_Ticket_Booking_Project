import { Button , message, Table} from 'antd'
import React, { useState, useEffect } from 'react'
import { GetAllTheatres, UpdateTheatre} from '../../apicalls/theatres';
import { useDispatch, useSelector } from 'react-redux';
import { HideLoading, ShowLoading } from '../../redux/loadersSlice';


function TheatresList() {
 
  const [theatres , setTheatres] = useState([]);
  
    const dispatch = useDispatch();


      const getData = async()=>{
          try{
          dispatch(ShowLoading());
          const response = await GetAllTheatres();
          
          dispatch(HideLoading());
         console.log("Theatres API Response =>", response); 
          if(response.theatres){
            const theatresWithKeys = response.theatres.map((theatre) => ({
              ...theatre,
              key: theatre._id,  
            }));
         
            setTheatres(theatresWithKeys);
            
          }else{
            message.error(response.message);
          }
          dispatch(HideLoading());
          }catch(error){
            dispatch(HideLoading());
            message.error("Somethimg went wrong");
          }
        }

        const handleStatusChange =  async(theatre)=>{
          try{
            dispatch(ShowLoading());
            const response = await UpdateTheatre({
              theatreId: theatre._id,
              ...theatre,
              isActive: !theatre.isActive,
            });
            if(response){
              message.success(response.message);
              getData();
            }else{
              message.error(response.message);
            }
             dispatch(HideLoading());
          }catch(error){
            dispatch(HideLoading());
            message.error("Somethimg went wrong");
          }
        }

        const columns = [
          {
            title: "Name",
            dataIndex: "name",
            key : "name",
          },  {
            title: "Address",
            dataIndex: "address",
            key : "address",
          },  {
            title: "Phone",
            dataIndex: "phone",
            key : "phone",
          },  {
            title: "Email",
            dataIndex: "email",
            key : "email",
          },
          {
            title : "Status",
            dataIndex: "isActive",
            render: (text, record)=>{
              if(text){
                return 'Approved'
              }else{
                return 'Pending/ Blocked'
              }
            }

          },
          {
  title: "Action",
  dataIndex: "action",
  render: (text, record) =>{
    return <div className='flex gap-1'>
     {record.isActive && 
     <span 
     className='underline'
    onClick={()=>handleStatusChange(record)} >Block</span>}
      {!record.isActive && 
      <span
       className='underline'
      onClick={()=>handleStatusChange(record)}>Approve</span>}
    </div>
  }
} 
 ]
      useEffect(()=>{
          getData();
        },[]);
  return (
    <div>
        <Table columns={columns} dataSource={theatres}/>
    </div>
  )
}

export default TheatresList