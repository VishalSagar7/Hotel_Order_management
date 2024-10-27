import { Router } from "express";
import AdminModel from '../Models/AdminModel.js'; 
import jwt from 'jsonwebtoken'; 
import dotenv from 'dotenv'

dotenv.config();
const secret_key = process.env.JWT_SECRET;
const router = Router();

// Admin login route
router.post('/admin-login', async (req, res) => {

    
    const { email, password } = req.body;

    try {
        // Find the admin by email
        const admin = await AdminModel.findOne({ email });
        if (!admin) {
            return res.status(401).json({ success : false,message: 'Invalid email.' });
        }

        // Compare password (you'll implement your own hashing later)
        if (admin.password !== password) {
            return res.status(401).json({ success : false,message: 'Invalid password.' });
        }

        // If login is successful, generate a token
        const token = jwt.sign(
            { adminId: admin._id },
            secret_key,
            { expiresIn: '1h' }
        );

        // Send the token in cookies
        res.cookie('admin-token', token, {
            httpOnly: true, // Allow client-side access (not as secure)
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 1000
        });

        // Send response indicating successful login
        return res.status(200).json({
            success : true,
            message: 'Login successful',
            admin: admin,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
});

export default router;
