import React from 'react'
import {Button, message, Modal, Row} from 'antd'
import { Form, Col, Input} from 'antd';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../redux/loadersSlice';
import { AddMovie, UpdateMovie } from '../../apicalls/movies';
import moment from 'moment';



function MoviesForm({
    showMovieModal,
    setShowMovieModal,
    selectedMovie ,
    setSelectedMovie ,
    getData,
    formType
})

{ 
  if(selectedMovie){
    selectedMovie.releasedate = moment(selectedMovie.releasedate).format("YYYY-MM-DD");
  }
const dispatch = useDispatch();

    const onFinish = async (values) => {
      console.log(values.description);
        try{
            dispatch(ShowLoading());
            let response = null;
            if(formType == "add"){
                response = await AddMovie(values);
            } else{
              response = await UpdateMovie({
                ...values,
                movieId : selectedMovie._id
              });
            }
            if(response.success){
              getData();
                message.success(response.message);
                setShowMovieModal(false);
            }else{
              message.success(response.message);
            }
            dispatch(HideLoading());
        }catch(error){
           dispatch(HideLoading());
           message.error(error.message); 
        }
    };

   
  return (
    <>
    <Modal
 title = {formType === "add" ? "ADD MOVIE" : "EDIT MOVIE"}
    open = {showMovieModal}
    onCancel={()=>{
      setShowMovieModal(false)
    setSelectedMovie(null)}
    }
     
    footer = {null}
    width={800}>
           <Form layout = "vertical" 
           onFinish={onFinish} 
           initialValues={selectedMovie}
           >
             <Row gutter={16}>
                <Col span={24}>
                  <Form.Item label = "Movie Name"  name = "title"
                   rules={[{ required: true, message: 'Please enter a title' }]}>
                   <input type='text'/>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label = "Movie Description" 
                           name = "description"
                   rules={[{ required: true, message: 'Please enter the movie description' }]}>
                   <textarea type='text'/>
                  </Form.Item>
                </Col>
                <Col span={8}>
                <Form.Item label = "Movie Duration (Min)"  name = "duration">
                   <input type='text'/>
                  </Form.Item>
                </Col>
                <Col span={8}>
                <Form.Item label = "Language"  name = "language">
                  <select name="" id="">
                    <option value="">Select Language</option>
                    <option value="Tamil">Tamil</option>
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Telugu">Telugu</option>
                    <option value="Malayalam">Malayalam</option>
                  </select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                <Form.Item label = "Movie Release Date"  name = "releasedate">
                   <input type='date'/>
                  </Form.Item>
                </Col>
                <Col span={8}>
                <Form.Item label = "Genre"  name = "genre">
                  <select name="" id="">
                  <option value="">Select Genre</option>
                  <option value="Action">Action</option>
                  <option value="Comedy">Comedy</option>
                  <option value="Drama">Drama</option>
                  <option value="Romantic">Romantic</option>
    <option value="Crime">Crime</option>
     </select>
                  </Form.Item>
                </Col>
                <Col span={16}>
                  <Form.Item label = "PosterURL"  name = "poster">
                   <input type='text'/>
                  </Form.Item>
                </Col>
             </Row>
             <div className='flex justify-end gap-2'>
       <button type="button" onClick={() =>{
     setShowMovieModal(false)
     setSelectedMovie(null)
  
     }}>Cancel</button>
      <button type="submit">Save</button>
</div>

           </Form>
    </Modal>
    </>
  );
}

export default MoviesForm;