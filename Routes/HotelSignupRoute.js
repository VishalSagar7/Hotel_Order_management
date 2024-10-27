import { Router } from 'express';
import Hotel from '../Models/HotelModel.js';
const router = Router();


router.post('/hotel-signup', async (req, res) => {
    const { hotelName, email, password } = req.body;
    console.log(hotelName,email,password);
    
    try {
        // Check if a hotel with the same email already exists
        const existingHotel = await Hotel.findOne({ email });
        if (existingHotel) {
            return res.status(400).json({ message: 'Hotel with this email already exists.' });
        }

        // Create a new hotel document
        const newHotel = new Hotel({
            hotelName,
            email,
            password
        });

        // Save the new hotel to the database
        await newHotel.save();

        // Respond with a success message
        res.status(201).json({ message: 'Hotel registered successfully!' });
    } catch (error) {
        // If an error occurs, respond with a 500 status and the error message
        res.status(500).json({ message: 'Error registering hotel', error: error.message });
    }
});

export default router;
