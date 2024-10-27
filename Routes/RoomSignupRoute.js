import { Router } from 'express';
import RoomModel from '../Models/RoomModel.js';
import Hotel from '../Models/HotelModel.js';


const router = Router();

router.post('/room-signup', async (req, res) => {
    
    const { hotelId, roomNumber, password } = req.body;
    
    try {
        // Validate the hotel ID
        const hotel = await Hotel.findById(hotelId);
        if (!hotel) {
            return res.status(404).json({ success:false ,message: 'Hotel not found' });
        }

        // Create a new room
        const newRoom = new RoomModel({
            hotel: hotelId, // Reference to the hotel
            roomNumber,
            password, // Store password (consider encrypting it later)
        });

        // Save the room to the database
        await newRoom.save();
        return res.status(201).json({ success:true, message: 'Room created successfully', room: newRoom });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error });
    }
});

export default router;
