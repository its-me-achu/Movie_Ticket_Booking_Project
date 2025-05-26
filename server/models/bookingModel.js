const mongoose = require('mongoose');


const bookingSchema = new mongoose.Schema({
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
},
    show:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'shows'

    },
    seats: {
        type: Array,
        required: true
    },
    transactionId: {
        type: String,
       required: true,
    },

}, {
  timestamps: true,
});

const Booking = mongoose.model('bookings', bookingSchema);
module.exports = Booking;