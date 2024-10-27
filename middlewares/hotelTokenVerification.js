// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import Hotel from '../Models/HotelModel.js';
import dotenv from 'dotenv'

dotenv.config();

const verifyHotelToken = async (req, res, next) => {
    const token = req.cookies['hotel-token']; // Get the token from cookies

    if (!token) {
        return res.status(401).json({ success: false, message: 'No token provided' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded);
        
        // Find the hotel associated with the token
        const hotel = await Hotel.findById(decoded.hotelId); // Adjust based on your token structure

        if (!hotel) {
            return res.status(404).json({ success: false, message: 'Hotel not found' });
        }

        // Attach hotel info to the request object for access in route handler
        req.hotel = hotel;
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(403).json({ success: false, message: 'Invalid token', error: error.message });
    }


};

export default verifyHotelToken;
