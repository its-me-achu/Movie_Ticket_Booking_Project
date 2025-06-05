import axios from 'axios';

//Make Payment:
export const MakePayment = async (tokens, amount) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post("https://movie-arr.netlify.app/api/bookings/make-payment", {
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
        const response = await axios.post("https://movie-arr.netlify.app/api/bookings/book-show", bookingData, {
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
        const response = await axios.get("https://movie-arr.netlify.app/api/bookings/get-booking", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return error.response;
    }
};