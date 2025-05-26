import { Modal, Button, Table, Form, Row , message, Col, Select} from 'antd'
import React, { useEffect, useState } from 'react'
import { GetAllMovies } from '../../../apicalls/movies';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../../redux/loadersSlice';
import { GetAllShowsByTheatre , AddShow, DeleteShow} from '../../../apicalls/theatres';
import moment from 'moment';


function Shows({
  openShowsModal,
   setOpenShowsModal,
    theatre}) {
    const [view, setView] = useState("table");
const [shows, setShows] = useState([]);
const [movies, setMovies] = useState([]);
const dispatch = useDispatch();
//Fetch Movies:
const loadMovies = async()=>{
  try{
    dispatch(ShowLoading());
    const moviesResponse = await GetAllMovies();
      if(moviesResponse.movie){
            const moviesWithKeys = moviesResponse.movie.map((movie) => ({
              ...movie,
              key: movie._id,  
            }));
            setMovies(moviesWithKeys);
          }else{
            message.error(moviesResponse.message);
          }
          dispatch(HideLoading());
  }catch(error){
    message.error(error.message);
    dispatch(HideLoading());
  }
};
useEffect(() => {
  loadMovies();   
}, [openShowsModal]);
//Fetch Shows:

  const loadShows = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllShowsByTheatre({
        theatreId: theatre._id,
      });
       if (response.shows) 
        {
        const showsWithKeys = response.shows.map((show) => ({
          ...show,
          key: show._id,
        }));
        setShows(showsWithKeys);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
  };
  useEffect(() => {
     if (theatre?._id && openShowsModal) {
      loadShows();
  }
}, [theatre._id, openShowsModal]);
//Add Show:
 const handleAddShow = async (values) =>{
  console.log("Event Triggered");
  console.log(values);
  try{
     dispatch(ShowLoading());
     const response = await AddShow({...values,theatre : theatre._id});
     console.log(response);
     if(response){
      message.success(response.message || "Show added successfully!");
      setOpenShowsModal(false);
     await loadShows();
   setView("table"); 
     }
     else{
        message.error(response?.message || "Failed to add show.");
     }
     dispatch(HideLoading());
  }catch(error){
      message.error(error.message);
    dispatch(HideLoading());
  }
 };
//Delete Show:
 const deleteShow = async (showId) =>{
  try {
    dispatch(ShowLoading());
    const response = await DeleteShow(showId);
    dispatch(HideLoading());
    if (response) {
      message.success("Show deleted successfully");
    loadMovies();
    setView("table");
    } else {
      message.error(response.message);
    }
  } catch (error) {
    dispatch(HideLoading());
    message.error("Something went wrong while deleting the show");
  }
};
    const columns = [
      {
        title : "Show Name",
        dataIndex  : "name",
        key : "name",
      },
       {
        title : "Date",
        dataIndex  : "date",
        render: (text, record) =>
          {
           return moment(text).format("MMM Do YYYY");
          } 
      },
       {
        title : "Time",
        dataIndex  : "time",
        key : "time",
      },
       {
        title : "Movie",
        dataIndex  : "movie",
        render: (movie) => movie?.title || "N/A",
      },
     {
        title : "Ticket Price",
        dataIndex  : "ticketPrice",
        key : "ticketprice",
      },
       {
        title : "Total Seats",
        dataIndex  : "totalSeats",
        key : "totalseats",
      },
       {
        title : "Available Seats",
        dataIndex  : "availableSeats",
        render: (text, record) =>{
          return record.totalSeats - record.bookedSeats.length;
        }
      },
       {
        title : "Action",
        dataIndex  : "action",
          render: (text, record) =>{
    return <div className='flex gap-1 items-center'>
      {record.bookedSeats.length === 0 && (
      <i className="ri-delete-bin-6-line" style={{color: "red"}}
       onClick={() => deleteShow(record._id)}
       ></i>)}
    </div>
  }
}
     ]
  return (
    <Modal
    title= ""
    open={openShowsModal}
    onCancel={()=>setOpenShowsModal(false)}
    width={1500}
    footer={null}>
        <h1 className='text-primary text-md uppercase mb-1'>
           Theatre:  {theatre.name}
        </h1>
        <hr />
          <div className='flex justify-between items-center mb-1'>
            <h1 className='text-md uppercase'>
                 {view === "table" ? "Shows" : "Add Show"}
            </h1>
            {view === "table" &&
                <Button
             className='mt-1'
              variant='outlined'
              onClick={()=>{
                setView("form")
              }} >Add Show
             </Button> }
         
             
          </div>
       
          {view === "table" &&(  
            <Table columns={columns} dataSource={shows} />
          )}

          {view === "form" && 
          <Form layout='vertical'
          onFinish={handleAddShow}>
            <Row gutter={[16, 16]}>
              <Col span={8}>
              <Form.Item label= "Show Name"
               name = "name"
             rules = {[{required : true, message: "Please Input show name!"}]}
              >
                 <input/>
              </Form.Item>
              </Col>
              <Col span={8}>
              <Form.Item label= "Date" 
              name = "date"
              rules = {[{required : true, message: "Please Input show date!"}]}
              >
                 <input type='date'
                 min={new Date().toISOString().split("T")[0]}/>
              </Form.Item>
              </Col>
              <Col span={8}>
              <Form.Item label= "Time"
               name = "time"
             rules = {[{required : true, message: "Please Input show time!"}]}
              >
                 <input type='time'/>
              </Form.Item>
              </Col>
              <Col span={8}>
              <Form.Item label= "Movie" 
              name = "movie"
             rules = {[{required : true, message: "Please select movie!"}]}
              >
                 <select >  
                  <option value="">Select Movie</option>
                  {movies.map((movie)=>(
                    <option  value={movie._id}>{movie.title}</option>
                  ))}
                 </select>
              </Form.Item>
              </Col>
              <Col span={8}>
              <Form.Item label="Ticket Price" 
              name="ticketPrice"
              rules = {[{required : true, message: "Please Input ticket price!"}]}
              >
               <input type='number'/>
                </Form.Item>
                </Col>
                <Col span={8}>
              <Form.Item label="Total Seats"
               name="totalSeats"
              rules = {[{required : true, message: "Please Input total seats!"}]}
              >
                <input type='number'/>
                </Form.Item>
                </Col>

            </Row>  
            <div className='flex justify-end gap-2'>
              <button
              type="button"
              variant='outlined'
              onClick={()=>{
                setView("table")
              }}>Cancel
              </button>
              <button
              type="submit"
            >Save
              </button>
              </div>        
            </Form>}
    </Modal>
  )
}

export default Shows