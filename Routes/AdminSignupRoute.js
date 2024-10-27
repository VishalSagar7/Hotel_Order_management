import { Router } from 'express';
import AdminModel from '../Models/AdminModel.js';

const router = Router();

// Admin signup route
router.post('/admin-signup', async (req, res) => {
    const { name, email, password, hotelId } = req.body;

    try {
        // Check if the admin email already exists
        const existingAdmin = await AdminModel.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({success : false,message: 'Admin with this email already exists' });
        }

        // Create a new admin instance
        const newAdmin = new AdminModel({
            name,
            email,
            password, 
            hotel: hotelId, 
        });

        // Save the admin to the database
        await newAdmin.save();

        // Return success response
        res.status(201).json({ success:true, message: 'Admin registered successfully', admin: newAdmin });
    } catch (error) {
        console.error('Error registering admin:', error);
        res.status(500).json({ error: 'Server error. Could not register admin.' });
    }
});

export default router;

