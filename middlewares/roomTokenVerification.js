import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import RoomModel from '../Models/RoomModel.js'

dotenv.config();

const roomTokenVerification = async (req, res, next) => {
    
    const token = req.cookies['room-token']; // Retrieve the room token from cookies
    

    // Check if the token exists
    if (!token) {
        return res.status(401).json({ message: 'No room token provided, authorization denied.' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the room by the decoded ID
        const room = await RoomModel.findById(decoded.roomId);

        // If the room is not found
        if (!room) {
            return res.status(404).json({ success: false, message: 'Room not found' });
        }

        // Attach the room data to the request object for further use
        req.room = room;

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Room token verification failed:', error);
        return res.status(401).json({ message: 'Invalid room token, authorization denied.' });
    }
};

export default roomTokenVerification;
