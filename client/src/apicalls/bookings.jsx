import axios from 'axios';

//Make Payment:
export const MakePayment = async (tokens, amount) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post("http://localhost:3000/api/bookings/make-payment", {
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
        const response = await axios.post("http://localhost:3000/api/bookings/book-show", bookingData, {
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
        const response = await axios.get("http://localhost:3000/api/bookings/get-booking", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return error.response;
    }
};