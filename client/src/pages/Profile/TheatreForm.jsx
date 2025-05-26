import { message, Modal , Form} from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HideLoading, ShowLoading } from '../../redux/loadersSlice';
import { AddTheatres, UpdateTheatre } from '../../apicalls/theatres';

function TheatreForm({
  showTheatreModal ,
  setShowTheatreModal, 
  formType ,
  setFormType, 
  selectedTheatre, 
  setSelectedTheatre,
  getData
}) {
  
const dispatch = useDispatch();
  const onFinish = async (values) =>{
    try{
       dispatch(ShowLoading());
       let response = null
       if(formType === "add"){
        response= await AddTheatres(values);
       } 
       else{
         response = await UpdateTheatre({
            ...values,
            theatreId: selectedTheatre._id
         });
       }
         if(response.success){  
           getData();         
    message.success(response.message); 
   setShowTheatreModal(false);
    //setSelectedTheatre(null);
                  }else{
                     message.success(response.message);
                  }
                  dispatch(HideLoading());
    }catch(error){
      dispatch(HideLoading());
      message.error(error.message);
    }
  }
  return (
   <Modal title={formType === 'add' ? 'ADD THEATRE' : 'EDIT THEATRE'}
   open={showTheatreModal}
   onCancel={()=>{
     setShowTheatreModal(false);
     setSelectedTheatre(null);
   }}
   footer={null}
   width={800}
   >
    <Form  layout = "vertical"
    onFinish={onFinish} 
    initialValues={selectedTheatre}>
       <Form.Item
      
        label="Name"
        name="name"
        rules = {[{required : true, message: "Please Input theatre name"}]}>
        <input type='text'/>
       </Form.Item>
       <Form.Item label="Address"
        name="address"
        rules = {[{required : true, message: "Please Input theatre address"}]}>
        <textarea type='text'/>
       </Form.Item>
      
       <Form.Item label="Phone Number"
        name="phone"
        rules = {[{required : true, message: "Please Input theatre Phone Number"}]}>
        <input type='text'/>
       </Form.Item>     
       <Form.Item label="Email"
        name="email"
        rules = {[{required : true, message: "Please Input theatre email"}]}>
        <input type='text'/>
       </Form.Item>

        <div className='flex justify-end gap-2'>
       <button type="button" onClick={() =>{
     setShowTheatreModal(false)
     setSelectedTheatre(null)
     }}>Cancel</button>
      <button type="submit">Save</button>
</div>

   </Form>

   </Modal>
  )
}

export default TheatreForm