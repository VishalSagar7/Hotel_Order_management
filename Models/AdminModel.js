import mongoose from 'mongoose'

// Define the Admin schema
const AdminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true, // Admin email must be unique
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        default: 'admin',
        enum: ['admin'],
        required: true
    },
    hotel: {
        type: mongoose.Schema.Types.ObjectId, // referring to the hotel schema.
        ref: 'Hotel',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create the Admin model
const AdminModel = mongoose.model('Admin', AdminSchema);

export default AdminModel;
