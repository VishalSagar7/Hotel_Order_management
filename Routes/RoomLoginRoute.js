import { Router } from 'express';
import RoomModel from '../Models/RoomModel.js';
import jwt from 'jsonwebtoken'; 
import dotenv from 'dotenv'


dotenv.config();
const secret_key = process.env.JWT_SECRET;
const router = Router();


router.post('/room-login', async (req, res) => {
    const { roomNumber, password } = req.body;

    try {
        // Find the room by room number
        const room = await RoomModel.findOne({ roomNumber });

        // Check if the room exists
        if (!room) {
            return res.status(404).json({ success:false ,message: 'Room not found' });
        }

        // Check if the password matches
        if (room.password !== password) {
            return res.status(401).json({ success:false ,message: 'Invalid password' });
        }

        // Generate a token for the room
        const token = jwt.sign(
            { roomId: room._id },
            secret_key,
            { expiresIn: '1h' });

        // Send the token as a cookie
        res.cookie('room-token', token, {
            httpOnly: true, // Allow client-side access (not as secure)
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 1000
        });

        return res.status(200).json({ success:true ,message: 'Login successful', room});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error });
    }
});

export default router;
