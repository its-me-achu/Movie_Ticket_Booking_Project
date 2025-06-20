//import axios from 'axios';
import{axiosInstance}  from './axios';

//Make Payment:
export const MakePayment = async (tokens, amount) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axiosInstance.post("/bookings/make-payment", {
            tokens,
            amount
        } ,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return error.response;
    }
};

//Book Shows:
export const BookShowTickets = async (bookingData) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axiosInstance.post("/bookings/book-show", bookingData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return error.response;
    }
};

//Get Bookings of user:
export const GetBookings = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await axiosInstance.get("/bookings/get-booking", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return error.response;
    }
};