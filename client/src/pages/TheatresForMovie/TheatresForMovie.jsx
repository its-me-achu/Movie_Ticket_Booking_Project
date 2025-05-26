import { useDispatch } from 'react-redux';
import {  message, Table, Col , Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { HideLoading, ShowLoading } from '../../redux/loadersSlice'; 
import { useNavigate } from 'react-router-dom';
import { GetMovieById } from '../../apicalls/movies';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { GetAllTheatresByMovie } from '../../apicalls/theatres';


function TheatresForMovie() {
    //Get Date from  Query String:
    const tempDate = new URLSearchParams(window.location.search).get("date");
    const [date, setDate] = useState(tempDate || moment().format("YYYY-MM-DD"));
    const [movie, setMovie] = useState(null);
    const [theatres, setTheatres] = useState([]);
      const navigate = useNavigate();
      const dispatch = useDispatch();
    const params = useParams();

        const getData = async()=>{
            try{
            dispatch(ShowLoading());
            const response = await GetMovieById(params.id);
            dispatch(HideLoading());
            console.log("Movies API Response =>", response); 
            if(response.movie){
                // Add a unique key to the movie object
             setMovie({...response.movie, key: response.movie._id});
            }else{
              message.error(response.message);
            }
            dispatch(HideLoading());
            }catch(error){
              dispatch(HideLoading());
              message.error("Somethimg went wrong");
            }
          };

          //Get Theatres:
          const getTheatres = async()=>{
            try{
              dispatch(ShowLoading());
              const response = await GetAllTheatresByMovie({
                movie: params.id,
                date: date,
                });
              dispatch(HideLoading());
              console.log("Theatres API Response =>", response); 
              if(response.uniqueTheatres  ){
                // Add a unique key to each theatre object:
                 setTheatres(response.uniqueTheatres);
              }else{
                message.error(response.message);
              }
              dispatch(HideLoading());
            }catch(error){
              dispatch(HideLoading());
              message.error("Somethimg went wrong");
            }
          };
    
       useEffect(()=>{
            getData();
          },[]);

          useEffect(() => {
            getTheatres();
          }, [date]);

  return( movie && (
    <div>
        <div id='movie-details' className='flex justify-between items-center mb-2'>
          <div>
            <h1 className='text-2xl uppercase'>{movie.title} ({movie.language})</h1>
            <h1 className='text-md'>Duration : {movie.duration} mins</h1>
            <h1 className='text-md'>Release Date: {moment(movie.releaseDate).format('MMM Do YYYY')}</h1>
            <h1 className='text-md'>Genre: {movie.genre}</h1>
          </div>
          <div>
            <h1 className='text-md'>Select Date:</h1>
            <input type="date" min={moment().format("YYYY-MM-DD")}
            value={date}
            onChange={(e) => {
                setDate(e.target.value);
                navigate(`/movies/${params.id}?date=${e.target.value}`);
            }} />
          </div>
        </div>

        <hr />

        <div id ='movie-theatres' className='mt-1'>
             <h1 className='text-xl uppercase'>Theatres</h1>
             </div>

             <div className='mt-2 flex flex-col gap-2'> 
              {
                theatres.map((theatre)=>(
                  <div className='card p-2'>
                  <h1  className='text-md uppercase'>{theatre.name}</h1>
                  <h1 className='text-md uppercase'>{theatre.address }</h1>

<div className='divider'></div>

                   <div className='flex gap-2'>
                {theatre.shows.sort((a,b)=>moment(a.time,"HH:mm" ) - moment(b.time, "HH:mm")).map((show) => (
                  <div className='card p-1 cursor-pointer' 
                  onClick={() => {
                    navigate(
                      `/book-show/${show._id}`
                    )}}>
                    <h1 className='text-sm'>{
                      moment(show.time, "HH:mm").format('hh:mm A')
                    }</h1>
                  </div>
                ))}
                </div> 
                  </div>
                ))
              }
              </div>    

             
              
             

    </div>
    )
  )
}

export default TheatresForMovie