import { Button,  message, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import MoviesForm from './MoviesForm';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../redux/loadersSlice';
import { DeleteMovie, GetAllMovies } from '../../apicalls/movies';


function MoviesList() {
    const [movies, setMovies] = useState([]);
    const [showMovieModal, setShowMovieModal] =useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [formType, setFormType] = useState("add");
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


// Inside MoviesList component
const deleteMovie = async (movieId) => {
  try {
    dispatch(ShowLoading());
    const response = await DeleteMovie(movieId);
    dispatch(HideLoading());
    if (response) {
      message.success("Movie deleted successfully");
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
        title: "Poster",
        dataIndex: "poster",
        key : "poster",
        render: (text, record) =>{
          return (
            <img
             src={record.poster}
             alt="poster"
             style={{width: 100, height: 100}}
             className='br-1'/>
          );
        }
      
      }  , 
{
  title: "Title",
  dataIndex: "title",
  key : "title", 
},   

{
  title: "Description",
  dataIndex: "description",
  key :"description",
},
{
  title: "Duration",
  dataIndex: "duration",
  key : "duration",
},
{
  title: "Genre",
  dataIndex: "genre",
  key : "genre",
},
{
  title: "Language",
  dataIndex: "language",
  key : "language",
},
{
  title: "Release Date",
  dataIndex: "releasedate",
  key : "releasedate",
  render: (text, record) => {
    return moment(record.releasedate).format("DD-MM-YYYY")
  }
},
{
  title: "Action",
  dataIndex: "action",
  render: (text, record) =>{
    return <div className='flex gap-1'>
      <i className="ri-delete-bin-6-line" style={{color: "red"}}
       onClick={() => deleteMovie(record._id)}
       ></i>
      <i className="ri-pencil-line" 
           style={{color: "green"}}
           onClick={() => {
           setSelectedMovie(record);
           setFormType("edit");
           setShowMovieModal(true);
          }}
           ></i>
    </div>
  }
}
];
    useEffect(()=>{
      getData();
    },[]);
  return ( 
    <div>
        <div className='flex justify-end mb-1'>
         <Button className='p-1'
         title='Add Movie'
          onClick={()=>{
            setShowMovieModal(true);
            setFormType("add");
            setSelectedMovie(null);
          }}>Add Movies
          </Button>
        </div>


        <Table columns={columns} dataSource={movies}  pagination={{ pageSize: 5 }}/>


        {showMovieModal && <MoviesForm
          showMovieModal = {showMovieModal}
          setShowMovieModal = {setShowMovieModal}
          selectedMovie ={selectedMovie}
          setSelectedMovie = {setSelectedMovie}
          formType = {formType}
          getData={getData}/>}

    </div>
  )

}
export default MoviesList