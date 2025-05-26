import { useDispatch } from 'react-redux';
import {  message, Table, Col , Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { HideLoading, ShowLoading } from '../../redux/loadersSlice';
import { GetAllMovies } from '../../apicalls/movies';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

function Home() {
  const [searchText, setSearchText] = useState("");
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();
  const dispatch = useDispatch();

    const getData = async()=>{
        try{
        dispatch(ShowLoading());
        const response = await GetAllMovies();
        dispatch(HideLoading());
        console.log("Movies API Response =>", response); 
        if(response.movie){
          const moviesWithKeys = response.movie.map((movie) => ({
            ...movie,
            key: movie._id,  
          }));
          setMovies(moviesWithKeys);
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
  return (
    <div >
   <input  className='search-input' 
   type="text" placeholder='Search for movies'
   value={searchText}
   onChange={(e)=> setSearchText(e.target.value)} />


   <Row
    gutter={[20]} className='mt-2'>
    { movies
    .filter((movie) => 
      movie.title.toLowerCase().includes(searchText.toLowerCase())
    )
    .map((movie) => (
      <Col span={6} key={movie._id} >
        <div className='shadow flex flex-col gap-1 card cursor-pointer'
          onClick={() => navigate(`/movies/${movie._id}?date=${moment().format("YYYY-MM-DD")}`)} 
       >
        <img src={movie.poster} alt={movie.title}  height={200}/>
        <div className='flex justify-center p-1'>
        <h1 className='uppercase text-md'>{movie.title}</h1>
        </div>
        </div>
      </Col>
    ))}


   </Row>
    </div>

  )
}

export default Home