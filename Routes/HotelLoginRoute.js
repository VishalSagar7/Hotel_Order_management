import { Router } from 'express';
import jwt from 'jsonwebtoken';
import Hotel from '../Models/HotelModel.js';
import dotenv from 'dotenv';


dotenv.config();
const secret_key = process.env.JWT_SECRET;
const router = Router();

// Secret key for JWT (you should store this in an environment variable)
const JWT_SECRET = 'abcd1234';

router.post('/hotel-login', async (req, res) => {

    
    const { email, password } = req.body;

    try {
        // Check if the hotel exists with the provided email
        const hotel = await Hotel.findOne({ email });

        // If the hotel is not found, return an error
        if (!hotel) {
            return res.status(404).json({ success: false, message: 'Hotel not found' });
        }

        // If the password is incorrect, return an error
        if (hotel.password !== password) {
            return res.status(400).json({ success: false, message: 'Wrong password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { hotelId: hotel._id, hotelName: hotel.hotelName, email: hotel.email },
            secret_key,
            { expiresIn: '1h' }
        );

        // Set the token in a cookie
        res.cookie('hotel-token', token, {
            httpOnly: true, // Allow client-side access (not as secure)
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 1000
        });


        // Send a response indicating successful login
        res.status(200).json({
            success: true,
            message: 'Login successful',
            hotel
        });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Error logging in', error: error.message });
    }
});

export default router;
