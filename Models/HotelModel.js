import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
    hotelName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, 
        trim: true,
        lowercase: true, 
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true, 
});

const Hotel = mongoose.model('Hotel', hotelSchema);

export default Hotel;
