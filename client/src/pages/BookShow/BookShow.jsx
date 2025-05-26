import React from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../redux/loadersSlice';
import { GetShowById } from '../../apicalls/theatres';
import { useState } from 'react';
import { message } from 'antd';
import { useEffect } from 'react';
import moment from 'moment';
import { BookShowTickets } from '../../apicalls/bookings';
import { useNavigate } from 'react-router-dom';
    



function BookShow() {
    const [show, setShow] = useState(null);
  const [selectedseats, setSelectedSeats] = useState([]);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    cardholderName: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });


    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
//Get Show By Id:
    const getShows = async()=>{
        try{
        dispatch(ShowLoading());
            const response = await GetShowById(
                {
                    showId :params.id
                });
            dispatch(HideLoading());
            console.log("Shows Response =>", response); 
             if (response?.show) {
        setShow(response.show);
            }else{
              message.error(response.message);
            }
        }catch(error){
            dispatch(HideLoading());
            message.error("Something went wrong");
        }
    };
// Get Seats:
    const getSeats = () => {
  const columns = 12;
  const totalSeats = show.totalSeats;
  const rows = Math.ceil(totalSeats / columns)

  return (
    <div className="flex flex-col gap-2 mt-2  p-2 card ">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex flex-row gap-2 justify-center ">
          {Array.from({ length: columns }).map((_, colIndex) => {
            const seatNumber = rowIndex * columns + colIndex + 1;
            if (seatNumber > totalSeats) return null;

            let seatClass = "seat";
            if (selectedseats.includes(seatNumber)) {
              seatClass += " selected-seat";
            }
            if (show.bookedSeats.includes(seatNumber)) {
              seatClass += " booked-seat";
            }
            return (
              <div
                key={seatNumber}
                className={seatClass} 
                onClick={() => {
                  if (selectedseats.includes(seatNumber)) {
                    setSelectedSeats((prev) =>
                      prev.filter((seat) => seat !== seatNumber)
                    );
                  } else {
                    setSelectedSeats((prev) => [...prev, seatNumber]);
                  }
                }}
              >
                <span className="text-xs">{seatNumber}</span>              
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

//Handle Payment:
       const handlePayNow = async () => {
    if (!paymentDetails.cardholderName || !paymentDetails.cardNumber || !paymentDetails.expiry || !paymentDetails.cvv) {
      message.error("Please fill in all payment details");
      return;
    }

    dispatch(ShowLoading());
    try {
      const response = await BookShowTickets({
        show: params.id,
        seats: selectedseats,
        transactionId: `TXN-${Date.now()}`
      });

      if (response) {
        message.success("Payment Successful. Booking Confirmed.");
        navigate("/");
      } else {
        message.error("Booking failed");
      }
    } catch (error) {
      message.error("Something went wrong during booking");
    }
    dispatch(HideLoading());
  };
    useEffect(() => {
        getShows();
    }, []);

  return (
    show && (
    <div>
        <div id='show information' className='flex justify-between card p-2 items-center'>
             <div>
            <h1 className='text-2xl uppercase'>  {show.movie.title} 
                ({show.movie.language}) </h1>
           </div>
           <div>
           <h1 className='text-xl'>{show.theatre.name}</h1>
           </div>
           <div>
            <h1 className='text-sm'>
                {moment(show.date).format("MMM Do YYYY")} ({moment(show.time, "HH:mm").format("hh:mm A")})
            </h1>
           </div>
        </div>

        <div id='seats' className='flex justify-center' >{getSeats()}</div>
 
        {/* Summary and Payment */}
        {selectedseats.length > 0 && !showPaymentForm && (
          <div className="mt-4 flex flex-col items-center gap-4">
             <div className="flex uppercase card p-2 gap-3">
                <h1 className="text-sm"><b>Selected Seats</b> : {selectedseats.join(" , ")}</h1>

                <h1 className="text-sm">
                  <b>Total Price</b> : {selectedseats.length * show.ticketPrice}
                </h1>
              </div>
            <button className="btn btn-primary mt-2" onClick={() => setShowPaymentForm(true)}>
              Book Now
            </button>
          </div>
        )}

        {/* Custom Payment Form */}
        {showPaymentForm && (
          <div className="card  mt-4 ">
            <h2 className="text-lg mb-4 font-bold">Payment Details</h2>
            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Cardholder Name"
                value={paymentDetails.cardholderName}
                onChange={(e) => setPaymentDetails({ ...paymentDetails, cardholderName: e.target.value })}
                className="input"
              />
              <input
                type="text"
                placeholder="Card Number"
                value={paymentDetails.cardNumber}
                onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })}
                className="input"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Expiry MM/YY"
                  value={paymentDetails.expiry}
                  onChange={(e) => setPaymentDetails({ ...paymentDetails, expiry: e.target.value })}
                  className="input w-1/2"
                />
                <input
                  type="password"
                  placeholder="CVV"
                  value={paymentDetails.cvv}
                  onChange={(e) => setPaymentDetails({ ...paymentDetails, cvv: e.target.value })}
                  className="input w-1/2"
                />
              </div>
              <button className="btn btn-success mt-4" onClick={handlePayNow}>
                Pay Now
              </button>
            </div>
          </div>
        )}

          </div>
       
    )
  );
}


        


export default BookShow