import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel',  
        required: true
    },
    roomNumber: {
        type: String, 
        required: true,
        unique: true
    },
    role: {
        type: String,
        default: 'room',
        enum: ['room'],
        required: true
    },
    password: {
        type: String,
        required: true
    },
});


const RoomModel = mongoose.model('Room', roomSchema);

export default RoomModel;
