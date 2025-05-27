import axios from 'axios';

export const axiosInstance = axios.create({
    headers: {
     'Content-Type': 'application/json',
    },
    baseURL: "https://arr-movie-ticket-booking.onrender.com"

 });








