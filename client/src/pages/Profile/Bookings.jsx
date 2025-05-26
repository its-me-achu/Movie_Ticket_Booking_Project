import {Row, message, Col} from 'antd'
import React, { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { HideLoading, ShowLoading } from '../../redux/loadersSlice';
import { GetBookings } from '../../apicalls/bookings';
import moment from 'moment';


function Bookings() {
  const [bookings, setBookings] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
   const getData = async()=>{
    try{
      dispatch(ShowLoading());
    const response = await GetBookings();
    if(response.bookings){
      setBookings(response.bookings);
      dispatch(HideLoading());
    }else{
      message.error(response.message)}
    }catch(error){
      dispatch(HideLoading());
      message.error("Something went wrong");
    }
   };
   
   useEffect(() => {
    getData();
   }, []);

  return (
    <div>
     <Row gutter={[16, 16]}>
      {bookings.map((booking) => 
      <Col span={12}>
    <div className='card p-3 flex justify-between uppercase'>
   <div>
  <h1 className='text-xl'>
    {booking.show?.movie?.title} <hr />
</h1>
<h1 className='text-lg'>
 {booking.show.theatre?.name  || "Theatre not Availale"} <br />
</h1>
<h1 className='text-sm'>
Date & Time: {moment(booking.show .date).format('DD/MM/YYYY')} - {moment(booking.show.time, 'HH:mm').format('hh:mm A')} <br />
</h1>
    <h1 className='text-sm text-primary'>Rs: {(
    booking.show.ticketPrice * booking.seats.length
   )}</h1>
   <h1 className='text-sm'>
  Booking Id:{booking._id} <br />
</h1>
</div> 
<div>
   <img src={booking.show.movie.poster} alt="Image not found" height={100} width={100}
   className='br-1'/>
    <h1 className='text-sm'>
  Seats :{booking.seats.join(", ")} 
    <br />
   </h1>
</div>
    </div>
    </Col>)}
     </Row>
    </div>
  )
}
export default Bookings



