const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const Show = require('../models/showModel');
const Booking = require('../models/bookingModel');


//Make Payment:
router.post('/make-payment', authMiddleware, async (req, res) => {
    try {
        const { tokens, amount } = req.body;
        const paymentIntent = await stripe.charges.create({
          amount: amount * 100,
            currency: 'usd',
            source: tokens.id,
            description: 'Movie Ticket Payment',
        },{
            idempotencyKey: Math.random().toString(36).substring(7),
        });
        res.status(200).json({  message: 'Payment successful', paymentIntent });
    } catch (error) {
        res.status(500).json({   error: "Payment Failed" });
    }
});

//Book Shows:
router.post('/book-show', authMiddleware, async (req, res) => {
    try{

        //Save Booking:
        const newBooking = new Booking(req.body);
        const savedBooking = await newBooking.save(); 
        const show = await Show.findById(req.body.show);
        //Update Seats:
await Show.findByIdAndUpdate(req.body.show, {
           // $push: { bookedSeats: req.body.seats },
           bookedSeats: [...show.bookedSeats, ...req.body.seats]
        });
         
        res.status(200).json({ message: "Booking Successful", savedBooking });
    }catch(error){
        res.status(500).json({ error: "Booking Failed" });
    }
});

// Get All Booking By User:
router.get("/get-booking", authMiddleware, async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.body.userId}).populate("show").populate({
            path: "show",
            populate: {
                path: "movie",
                model: "movies",
        }}).populate("user").populate({
            path: "show",
            populate: {
                path: "theatre",
                model: "theatres",
            }
        });
        res.status(200).json({ message: "Bookings fetched successfully", bookings });
    }catch (error) {
        res.status(500).json({ error: "Failed to fetch bookings" });
    }
});
       





module.exports = router;


