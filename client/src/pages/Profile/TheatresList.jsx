import { Button , message, Table} from 'antd'
import React, { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import TheatreForm from './TheatreForm';
import {AddTheatres, DeleteTheatre, GetAllTheatres, GetAllTheatresByOwner} from '../../apicalls/theatres';
import { useDispatch, useSelector } from 'react-redux';
import { HideLoading, ShowLoading } from '../../redux/loadersSlice';
import Shows from './Shows/Shows';


function TheatresList() {
 const {user} = useSelector((state) => state.users);
  const [theatres , setTheatres] = useState([]);
    const [showTheatreModal , setShowTheatreModal] = useState(false);
    const [selectedTheatre , setSelectedTheatre] = useState(null);
    const [formType, setFormType] = useState("add");
    const[openShowsModal, setOpenShowsModal] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();


      const getData = async()=>{
          try{
          dispatch(ShowLoading());
          const response = await GetAllTheatresByOwner({
            // ownerId : user._id
          });
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
        };
  
        





 //Delete Theatres:     
const deleteTheatre = async (theatreId)=>{
 try {
    dispatch(ShowLoading());
    const response = await DeleteTheatre(theatreId);
    dispatch(HideLoading());
    if (response) {
      message.success("Theatre deleted successfully");
      getData(); 
    } else {
      message.error(response.message);
    }
  } catch (error) {
    dispatch(HideLoading());
    message.error("Something went wrong while deleting the movie");
  }

};
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
    return <div className='flex gap-1 items-center'>
      <i className="ri-delete-bin-6-line" style={{color: "red"}}
       onClick={() => deleteTheatre(record._id)}
       ></i>
      <i className="ri-pencil-line" 
           style={{color: "green"}}
           onClick={() => {
           setSelectedTheatre(record);
           setFormType("edit");
           setShowTheatreModal(true);
          }}
           ></i>
           {record.isActive && <span className='underline'
           onClick={()=>{
            setOpenShowsModal(true);
            setSelectedTheatre(record);
           }}>Shows</span>}
    </div>
  }
}
        
        ]
    
      useEffect(()=>{
          getData();
        },[]);
  return (
    <div>
        <div className='flex justify-end mb-1'>
          <Button className='p-1 '
          title='Add Theatre'
          onClick={()=>{
       setShowTheatreModal(true);
       setFormType("add");
      setSelectedTheatre(null);
          }}>Add Theatre
          </Button>
        </div>

        <Table columns={columns} dataSource={theatres}/>

        {showTheatreModal && <TheatreForm
   showTheatreModal = {showTheatreModal}
   setShowTheatreModal = {setShowTheatreModal} 
   selectedTheatre = {selectedTheatre}
   setSelectedTheatre = {setSelectedTheatre}
   formType = {formType}
   getData = {getData}
   />}
   {openShowsModal && <Shows
   openShowsModal={openShowsModal}
   setOpenShowsModal={setOpenShowsModal}
   theatre={selectedTheatre}/>}
    </div>
  )
}

export default TheatresList